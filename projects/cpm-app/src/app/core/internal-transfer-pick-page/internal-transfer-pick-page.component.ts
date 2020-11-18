import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Guid } from 'guid-typescript';
import { forkJoin, Observable, of, Subscription } from 'rxjs';
import { map, shareReplay, switchMap, take } from 'rxjs/operators';
import { IItemLocationDetail } from '../../api-core/data-contracts/i-item-location-detail';
import { IItemReplenishmentNeed } from '../../api-core/data-contracts/i-item-replenishment-need';
import { IOrderItemPendingQuantity } from '../../api-core/data-contracts/i-order-item-pending-quantity';
import { IPicklistLine } from '../../api-core/data-contracts/i-picklist-line';
import { DeviceReplenishmentNeedsService } from '../../api-core/services/device-replenishment-needs.service';
import { ItemLocaitonDetailsService } from '../../api-core/services/item-locaiton-details.service';
import { OrderItemPendingQuantitiesService } from '../../api-core/services/order-item-pending-quantities.service';
import { PicklistLineIdsService } from '../../api-core/services/picklist-line-ids.service';
import { PicklistLinesService } from '../../api-core/services/picklist-lines.service';
import { dateTimeToday } from '../../shared/functions/dateTimeToday';
import { sumValues } from '../../shared/functions/sumValues';
import { IItemHeaderInfo } from '../../shared/model/i-item-header-info';
import { OcapHttpConfigurationService } from '../../shared/services/ocap-http-configuration.service';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { InternalTransferPick } from '../model/internal-transfer-pick';
import { IInternalTransferPackSizePick } from '../model/i-internal-transfer-pack-size-pick';
import { SystemConfigurationService } from '../../shared/services/system-configuration.service';
import { ConfigValues } from '../../shared/constants/config-values';
import { BarcodeParsingService } from '../../shared/services/barcode-parsing.service';
import { IConfigurationValue } from '../../shared/interfaces/i-configuration-value';
import { ItemHeaderInfo } from '../../shared/model/item-header-info';
import { BarcodeOverrideService } from '../../shared/services/barcode-override.service';
import { BarcodeSafetyStockService } from '../../shared/services/barcode-safety-stock.service';
import { BarcodeOverrideDataPicking } from '../../shared/model/barcode-override-data-picking';
import { IBarcodeData } from '../../api-core/data-contracts/i-barcode-data';
import { PicklistLineFillData } from '../../api-core/data-contracts/picking/picklist-line-fill-data';

@Component({
  selector: 'app-internal-transfer-pick-page',
  templateUrl: './internal-transfer-pick-page.component.html',
  styleUrls: ['./internal-transfer-pick-page.component.scss'],
  providers: [ 
    BarcodeParsingService,
    BarcodeOverrideService,
    BarcodeSafetyStockService,
  ]
})
export class InternalTransferPickPageComponent implements OnDestroy {
  private _subscriptions: Subscription[] = [];

  orderId: string;
  picklistLineIds$: Observable<Guid[]>;
  totalLines$: Observable<number>;
  picklistLineIndex = 0;
  currentLine$: Observable<IPicklistLine>;
  currentNeedsDetails$: Observable<IItemReplenishmentNeed[]>;
  isLastLine$: Observable<boolean>;
  itemHeaderInfo$: Observable<IItemHeaderInfo>;
  userLocale: string;
  itemLocationDetails$: Observable<IItemLocationDetail[]>;
  pickLocation$: Observable<IItemLocationDetail>;
  pharmacyQoh$: Observable<number>;
  pickTotal: number;
  itemNeedPicks$: Observable<InternalTransferPick[]>;
  pickTotalIcon: string;
  expDateIcon: string;
  expDateInPast$: Observable<boolean>;
  orderItemPendingQtys$: Observable<IOrderItemPendingQuantity>;

  pickItemTotals: IInternalTransferPackSizePick[] = new Array();

  safetyStockScanInfo: IBarcodeData;
  secondaryScanInfo: IBarcodeData;
  safetyStockScanConfig$: Observable<IConfigurationValue>;
  safetyStockQuickAdvanceConfig$: Observable<IConfigurationValue>;
  productScanRequired$: Observable<boolean>;

  get awaitingProductScan(): boolean {
    return this.barcodeSafetyStockService.awaitingProductScan;
  }

  constructor(
    activatedRoute: ActivatedRoute,
    picklistLineIdsService: PicklistLineIdsService,
    ocapConfigService: OcapHttpConfigurationService,
    systemConfiguraitonsService: SystemConfigurationService,
    private picklistLinesService: PicklistLinesService,
    private deviceReplenishmentNeedsService: DeviceReplenishmentNeedsService,
    private wpfActionControllerService: WpfActionControllerService,
    private itemLocationDetailsService: ItemLocaitonDetailsService,
    private orderItemPendingQuantitiesService: OrderItemPendingQuantitiesService,
    private barcodeParsingService: BarcodeParsingService,
    private barcodeOverrideService: BarcodeOverrideService,
    private barcodeSafetyStockService: BarcodeSafetyStockService,
  ) {
    this.orderId = activatedRoute.snapshot.queryParamMap.get('orderId');
    const allDevices = activatedRoute.snapshot.queryParamMap.get('allDevices');
    if (allDevices) {
      this.picklistLineIds$ = picklistLineIdsService.getLineIds(this.orderId).pipe(shareReplay(1));
    } else {
      this.picklistLineIds$ = picklistLineIdsService.getLineIdsForWorkstation(this.orderId, ocapConfigService.get().clientId).pipe(shareReplay(1));
    }

    this.totalLines$ = this.picklistLineIds$.pipe(map(x => x.length));
    this.userLocale = ocapConfigService.get().userLocale;
    this.safetyStockScanConfig$ = systemConfiguraitonsService.getPickingSafetyStockConfig();
    this.safetyStockQuickAdvanceConfig$ = systemConfiguraitonsService.getSafetyStockQuickAdvanceConfig();

    this.updateCurrentLineDetails();
  }

  ngOnDestroy() {
    this.barcodeOverrideService.dispose();
  }

  pickTotalChanged(pickTotals: IInternalTransferPackSizePick[]) {
    this.pickItemTotals = pickTotals;
    this.pickTotal = sumValues(this.pickItemTotals, x => x.QuantityToPick);
  }

  navigateContinue() {
    this.wpfActionControllerService.ExecuteActionName('Continue');
  }

  navigateBack() {
    this.wpfActionControllerService.ExecuteActionName('Back');
  }

  hold(isLast: boolean) {
    if (isLast) {
      this.navigateContinue();
    } else {
      this.next();
    }
  }

  completePick() {
    forkJoin(this.currentLine$, this.isLastLine$, this.productScanRequired$).pipe(take(1)).subscribe(results => {
      const line = results[0];
      const isLast = results[1];
      const productScanRequired = results[2];
      this.pickItem(line, this.pickTotal, isLast, productScanRequired);
    });
  }

  safetyStockProductScanCompleted(barcodeData: IBarcodeData) {
    this.safetyStockScanInfo = barcodeData;
    forkJoin(this.safetyStockQuickAdvanceConfig$, this.pickLocation$).pipe(take(1)).subscribe(results => {
      let quickAdvanceConfig = results[0];
      let qoh = results[1].QuantityOnHand;
      if (quickAdvanceConfig.Value == ConfigValues.Yes && this.pickTotal <= qoh) {
        this.completePick();
      } else {
        this.tryCompletePickOnScan(qoh);
      }
    });
  }

  private pickItem(line: IPicklistLine, pickTotal: number, isLast: boolean, productScanRequired: boolean) {
    let scanInfo = this.safetyStockScanInfo;
    if (!scanInfo && this.secondaryScanInfo && this.secondaryScanInfo.ItemId == line.ItemId) {
      scanInfo = this.secondaryScanInfo;
    }

    let packPicks = new PicklistLineFillData(line, this.pickItemTotals, pickTotal, scanInfo, productScanRequired);

    this.picklistLinesService.completePick(packPicks).subscribe(x => {
      if (isLast) {
        this.navigateContinue();
      } else {
        this.next();
      }
    });
  }

  private next() {
    this.picklistLineIndex = this.picklistLineIndex + 1;
    this.updateCurrentLineDetails();
  }

  private completeZeroPick() {
    forkJoin(this.currentLine$, this.isLastLine$, this.productScanRequired$).pipe(take(1)).subscribe(results => {
      const line = results[0];
      const pickTotal = 0;
      const isLast = results[1];
      const productScanRequired = results[2];
      this.pickItem(line, pickTotal, isLast, productScanRequired);
    });
  }

  private updateCurrentLineDetails() {
    this.safetyStockScanInfo = null;
    this.secondaryScanInfo = null;
    this.clearSubscriptions();
    this.currentLine$ = this.picklistLineIds$.pipe(map(x =>
       x[this.picklistLineIndex]), switchMap(x => this.picklistLinesService.get(x)), shareReplay(1));
    this.isLastLine$ = this.totalLines$.pipe(map(x => x === this.picklistLineIndex + 1));
    this.currentNeedsDetails$ = this.currentLine$.pipe(switchMap(x =>
       this.deviceReplenishmentNeedsService.getDeviceNeedsForItem(x.DestinationDeviceId, x.ItemId, x.OrderId)), shareReplay(1));
    this.currentNeedsDetails$.pipe(take(1)).subscribe(x => {
      if (!x || !x.length) {
        this.completeZeroPick();
      } else {
        this.continueLoadCurrentLineDetails();
      }
    });
  }

  private continueLoadCurrentLineDetails() {
    this.itemLocationDetails$ = this.currentLine$.pipe(switchMap(x => this.itemLocationDetailsService.get(x.ItemId)), shareReplay(1));
    this.orderItemPendingQtys$ = this.currentLine$.pipe(switchMap(x => this.orderItemPendingQuantitiesService.get(x.OrderId, x.ItemId)), shareReplay(1));
    this.itemNeedPicks$ = forkJoin(this.currentNeedsDetails$, this.currentLine$).pipe(map(results => {
      const itemNeeds = results[0];
      const line = results[1];
      return itemNeeds.map(n => new InternalTransferPick(n, line.PickQuantity));
    }));

    this.pharmacyQoh$ = this.itemLocationDetails$.pipe(map(x => sumValues(x, il => il.QuantityOnHand)));

    this.pickLocation$ = forkJoin(this.currentLine$, this.itemLocationDetails$).pipe(map(results => {
      const currentLine: IPicklistLine = results[0];
      const itemLocationDetails: IItemLocationDetail[] = results[1];
      return itemLocationDetails.find(x => x.DeviceLocationId == currentLine.SourceDeviceLocationId);
    }));

    this.productScanRequired$ = forkJoin(this.safetyStockScanConfig$, this.pickLocation$).pipe(map(results => {
      let safetyStockScanConfig = results[0];
      let pickLocation = results[1];
      return safetyStockScanConfig.Value === ConfigValues.Yes && pickLocation.SafetyStockIssueScan;
    }), shareReplay(1));

    this.itemHeaderInfo$ = forkJoin(this.currentLine$, this.pickLocation$, this.productScanRequired$).pipe(map(results => {
      const currentLine: IPicklistLine = results[0];
      const pickLocation: IItemLocationDetail = results[1];
      const productScanRequired = results[2];
      return new ItemHeaderInfo(pickLocation, currentLine, productScanRequired, false, false);
    }));

    this.expDateInPast$ = this.pickLocation$.pipe(map(pickLocation => {
      const today = dateTimeToday();
      const expDate = new Date(pickLocation.ExpirationDate);
      return pickLocation.ExpirationDateGranularity != 'None' && pickLocation.QuantityOnHand > 0 && expDate < today;
    }));

    forkJoin(this.pickLocation$, this.productScanRequired$).pipe(take(1)).subscribe(x => {
      let pickLocation = x[0];
      let productScanRequired = x[1];
      if (!productScanRequired) {
        this.tryCompletePickOnScan(pickLocation.QuantityOnHand);
      } else {
        this.barcodeOverrideService.initialize(new BarcodeOverrideDataPicking(pickLocation.ItemId, []));
        let scanSubscription = this.barcodeSafetyStockService.productScannedSuccessfully.pipe(take(1)).subscribe(x => this.safetyStockProductScanCompleted(x));
        this._subscriptions.push(scanSubscription);
      }
    });
  }

  private tryCompletePickOnScan(qoh: number) {
    let scanSubscription = this.barcodeParsingService.productBarcodeParsed$.subscribe(x => {
      this.secondaryScanInfo = x;
      if (this.pickTotal <= qoh) {
        this.completePick();
      }
    });
    this._subscriptions.push(scanSubscription);
  }

  private clearSubscriptions(){
    if(!this._subscriptions.length){
      return;
    }

    this._subscriptions.forEach(x => x.unsubscribe());
    this._subscriptions = [];
  }
}
