import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Guid } from 'guid-typescript';
import { forkJoin, Observable  } from 'rxjs';
import { map, shareReplay, switchMap, take, tap } from 'rxjs/operators';
import { IItemReplenishmentNeed } from '../../api-core/data-contracts/i-item-replenishment-need';
import { IPicklistLine } from '../../api-core/data-contracts/i-picklist-line';
import { DeviceReplenishmentNeedsService } from '../../api-core/services/device-replenishment-needs.service';
import { ItemLocaitonDetailsService } from '../../api-core/services/item-locaiton-details.service';
import { OrderItemPendingQuantitiesService } from '../../api-core/services/order-item-pending-quantities.service';
import { PicklistLineIdsService } from '../../api-core/services/picklist-line-ids.service';
import { PicklistLinesService } from '../../api-core/services/picklist-lines.service';
import { sumValues } from '../../shared/functions/sumValues';
import { OcapHttpConfigurationService } from '../../shared/services/ocap-http-configuration.service';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { InternalTransferPick } from '../model/internal-transfer-pick';
import { IInternalTransferPackSizePick } from '../model/i-internal-transfer-pack-size-pick';
import { SystemConfigurationService } from '../../shared/services/system-configuration.service';
import { ConfigValues } from '../../shared/constants/config-values';
import { IConfigurationValue } from '../../shared/interfaces/i-configuration-value';
import { ItemHeaderInfo } from '../../shared/model/item-header-info';
import { PicklistLineFillData } from '../../api-core/data-contracts/picking/picklist-line-fill-data';
import { IGuidedPickData } from '../model/i-guided-pick-data';
import { ICompletePickData } from '../model/i-completed-pick-data';
import { QuantityTrackingService } from '../../shared/services/quantity-tracking.service';
import { CarouselLocationAccessService } from '../../shared/services/devices/carousel-location-access.service';
import { DeviceTypeId } from '../../shared/constants/device-type-id';
import { parseBool } from '../../shared/functions/parseBool';
import { WpfActionPaths } from "../constants/wpf-action-paths";
import { IAdjustQoh } from "../../api-core/data-contracts/i-adjust-qoh";

@Component({
  selector: 'app-internal-transfer-pick-page',
  templateUrl: './internal-transfer-pick-page.component.html',
  styleUrls: ['./internal-transfer-pick-page.component.scss'],
  providers: [
    QuantityTrackingService
  ],
})
export class InternalTransferPickPageComponent {
  private _pickTotal: number;
  orderId: string;

  picklistLineIds$: Observable<Guid[]>;
  totalLines$: Observable<number>;
  picklistLineIndex = 0;

  currentLine$: Observable<IPicklistLine>;
  isLastLine$: Observable<boolean>;

  itemNeedPicks$: Observable<InternalTransferPick[]>;
  currentNeedsDetails$: Observable<IItemReplenishmentNeed[]>;
  guidedPickData$: Observable<IGuidedPickData>;

  pickItemTotals: IInternalTransferPackSizePick[] = new Array();

  safetyStockScanConfig$: Observable<IConfigurationValue>;
  safetyStockQuickAdvanceConfig$: Observable<IConfigurationValue>;
  guidedPickData: IGuidedPickData;


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
    private quantityTrackingService: QuantityTrackingService,
    private carouselLocationAccessService: CarouselLocationAccessService,
  ) {
    this.orderId = activatedRoute.snapshot.queryParamMap.get('orderId');
    const allDevices = parseBool(activatedRoute.snapshot.queryParamMap.get('allDevices'));
    if (allDevices) {
      this.picklistLineIds$ = picklistLineIdsService.getLineIds(this.orderId).pipe(shareReplay(1));
    } else {
      this.picklistLineIds$ = picklistLineIdsService.getLineIdsForWorkstation(this.orderId, ocapConfigService.get().clientId).pipe(shareReplay(1));
    }

    this.totalLines$ = this.picklistLineIds$.pipe(map(x => x.length));
    this.safetyStockScanConfig$ = systemConfiguraitonsService.getPickingSafetyStockConfig();
    this.safetyStockQuickAdvanceConfig$ = systemConfiguraitonsService.getSafetyStockQuickAdvanceConfig();

    this.updateCurrentLineDetails();
  }

  pickTotalChanged(pickTotals: IInternalTransferPackSizePick[]) {
    this.pickItemTotals = pickTotals;
    this._pickTotal = this.quantityTrackingService.quantity;
  }

  navigateContinue() {
    this.clearLightbar();
    this.wpfActionControllerService.ExecuteActionName('Continue');
  }

  pause() {
    this.clearLightbar();
    this.wpfActionControllerService.ExecuteActionName('Pause');
  }

  hold(isLast: boolean) {
    if (isLast) {
      this.navigateContinue();
    } else {
      this.next();
    }
  }

  completePick(completePickData: ICompletePickData) {
    this.pickItem(completePickData);
  }

  adjustQoh(item: IAdjustQoh) {
    this.clearLightbar();
    this.wpfActionControllerService.ExecuteActionNameWithData(WpfActionPaths.AdjustQohPath, item);
  }

  private pickItem(completePickData: ICompletePickData) {
    let scanInfo = completePickData.safetyStockScanInfo;
    if (!scanInfo && completePickData.secondaryScanInfo && completePickData.secondaryScanInfo.ItemId == completePickData.line.ItemId) {
      scanInfo = completePickData.secondaryScanInfo;
    }

    let packPicks = new PicklistLineFillData(completePickData.line, this.pickItemTotals, this._pickTotal, scanInfo, completePickData.productScanRequired);

    this.picklistLinesService.completePick(packPicks).pipe(take(1)).subscribe(x => {
      if (completePickData.isLast) {
        this.navigateContinue();
      } else {
        this.next();
      }
    });
  }

  private next() {
    this.picklistLineIndex = this.picklistLineIndex + 1;
    this.clearLightbar();
    this.updateCurrentLineDetails();
  }

  private completeZeroPick() {
    forkJoin(this.currentLine$, this.isLastLine$).pipe(take(1)).subscribe(results => {
      this._pickTotal = 0;
      const line = results[0];
      const isLast = results[1];
      this.pickItem({
        isLast: isLast,
        line: line,
        pickTotal: this._pickTotal,
        productScanRequired: false,
        safetyStockScanInfo: null,
        secondaryScanInfo: null,
      });
    });
  }

  private updateCurrentLineDetails() {
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
    let itemLocationDetails$ = this.currentLine$.pipe(switchMap(x => this.itemLocationDetailsService.get(x.ItemId)), shareReplay(1));
    let orderItemPendingQtys$ = this.currentLine$.pipe(switchMap(x => this.orderItemPendingQuantitiesService.get(x.OrderId, x.ItemId)), shareReplay(1));

    this.itemNeedPicks$ = forkJoin(this.currentNeedsDetails$, this.currentLine$).pipe(map(results => {
      const itemNeeds = results[0];
      const line = results[1];
      return itemNeeds.map(n => new InternalTransferPick(n, line.PickQuantity));
    }));

    this.guidedPickData$ = forkJoin(this.currentLine$, itemLocationDetails$, orderItemPendingQtys$, this.totalLines$, this.safetyStockScanConfig$, this.safetyStockQuickAdvanceConfig$).pipe(map(results => {
      let currentLine = results[0];
      let itemLocationDetails = results[1];
      let orderItemPendingQtys = results[2];
      let totalLines = results[3];
      let safetyStockScanConfig = results[4];
      let safetyStockQuickAdvanceConfig = results[5];
      let pickLocation = itemLocationDetails.find(x => x.DeviceLocationId == currentLine.SourceDeviceLocationId);
      let isProductScanRequired = safetyStockScanConfig.Value == ConfigValues.Yes && pickLocation.SafetyStockIssueScan;

      let guidedPickData: IGuidedPickData = {
        isProductScanRequired: isProductScanRequired,
        itemHeaderInfo: new ItemHeaderInfo(pickLocation, currentLine, isProductScanRequired, false, false),
        orderItemPendingQtys: orderItemPendingQtys,
        pharmacyQoh: sumValues(itemLocationDetails, il => il.QuantityOnHand),
        pickLocation: pickLocation,
        picklistLineIndex: this.picklistLineIndex,
        totalLines: totalLines,
        quickAdvanceOnScan: safetyStockQuickAdvanceConfig.Value == ConfigValues.Yes,
        isLastLine: this.picklistLineIndex == (totalLines - 1),
        picklistLine: currentLine,
      };

      return guidedPickData;
    })).pipe(tap(x => this.guidedPickData = x));
  }

  private clearLightbar() {
    if (!this.guidedPickData) {
      return;
    }

    if (this.guidedPickData.pickLocation.DeviceType == DeviceTypeId.CarouselDeviceTypeId) {
      this.carouselLocationAccessService.clearLightbar(this.guidedPickData.pickLocation.DeviceId).pipe(take(1)).subscribe();
    }
  }
}
