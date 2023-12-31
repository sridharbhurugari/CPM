import { EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Component, Input, Output } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { IBarcodeData } from '../../api-core/data-contracts/i-barcode-data';
import { dateTimeToday } from '../../shared/functions/dateTimeToday';
import { BarcodeOverrideDataPicking } from '../../shared/model/barcode-override-data-picking';
import { BarcodeOverrideService } from '../../shared/services/barcode-override.service';
import { BarcodeParsingService } from '../../shared/services/barcode-parsing.service';
import { BarcodeSafetyStockService } from '../../shared/services/barcode-safety-stock.service';
import { OcapHttpConfigurationService } from '../../shared/services/ocap-http-configuration.service';
import { QuantityTrackingService } from '../../shared/services/quantity-tracking.service';
import { ICompletePickData } from '../model/i-completed-pick-data';
import { IGuidedPickData } from '../model/i-guided-pick-data';
import { IAdjustQoh } from "../../api-core/data-contracts/i-adjust-qoh";
import { TranslateService } from '@ngx-translate/core';
import { InventoryManagementService } from '../../api-core/services/inventory-management.service';

@Component({
  selector: 'app-guided-pick',
  templateUrl: './guided-pick.component.html',
  styleUrls: ['./guided-pick.component.scss'],
  providers: [ 
    BarcodeParsingService,
    BarcodeOverrideService,
    BarcodeSafetyStockService,
  ]
})
export class GuidedPickComponent implements OnDestroy {
  private _scanSubscriptions: Subscription[] = [];
  private _guidedPickData: IGuidedPickData;
  private _qtySubscription: Subscription;
  private _awaitingScanSubscription: Subscription;

  @Input()
  requestStatus: string;

  @Input()
  set guidedPickData(value: IGuidedPickData) {
    this._guidedPickData = value;
    this.clearScanSubscriptions();
    this.clearScanInfo();
    this.setupScanHandler();
    this.setExpDateInPastValue();
    this.setupQtySubscription();
    this.isHighPriorityAvailable = false;

    if(this._guidedPickData) {
      if(this._guidedPickData.highPriorityAvailable) {
        this.inventoryManagementService.getHighPriorityPickRequestCount().subscribe(count => {
          if (count === 0) {
            this.isHighPriorityAvailable = false;
            return;
          }

          this.translateService.get("HIGHPRIORITY", {
            count: count
          }).subscribe(result => {
            this.highPriorityButtonText = result;
            this.isHighPriorityAvailable = true;
          });
        });      
      }
    }

  }

  get guidedPickData(): IGuidedPickData {
    return this._guidedPickData;
  }

  @Output()
  pickCompleted: EventEmitter<ICompletePickData> = new EventEmitter<ICompletePickData>();

  @Output()
  pauseClicked: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  holdClicked: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  adjustClicked: EventEmitter<IAdjustQoh> = new EventEmitter<IAdjustQoh>();

  @Output()
  pickNowClicked: EventEmitter<void> = new EventEmitter<void>();

  userLocale: string;
  pickTotal: number;
  expDateInPast: boolean;
  awaitingProductScan: boolean;
  safetyStockScanInfo: IBarcodeData;
  secondaryScanInfo: IBarcodeData;
  isHighPriorityAvailable: boolean;
  highPriorityButtonText: string;

  constructor(
    ocapConfigService: OcapHttpConfigurationService,
    private barcodeParsingService: BarcodeParsingService,
    private barcodeOverrideService: BarcodeOverrideService,
    private barcodeSafetyStockService: BarcodeSafetyStockService,
    private qytTrackingService: QuantityTrackingService,
    private translateService: TranslateService,
    private inventoryManagementService: InventoryManagementService,
  ) {
    this.userLocale = ocapConfigService.get().userLocale;
    this._awaitingScanSubscription = this.barcodeSafetyStockService.awaitingProductScanChanged.subscribe(x => this.awaitingProductScan = x);
  }

  /* istanbul ignore next */
  ngOnDestroy() {
    this.clearScanSubscriptions();
    this._qtySubscription.unsubscribe();
    this._awaitingScanSubscription.unsubscribe();
    this.barcodeOverrideService.dispose();
  }

  getCompletePickData(): ICompletePickData {
    return {
      isLast: this.guidedPickData.isLastLine,
      line: this.guidedPickData.picklistLine,
      pickTotal: this.pickTotal,
      productScanRequired: this.guidedPickData.isProductScanRequired,
      safetyStockScanInfo: this.safetyStockScanInfo,
      secondaryScanInfo: this.secondaryScanInfo,
    };
  }

  getAdjustQohData(): IAdjustQoh {
    return {
      ItemId : this.guidedPickData.pickLocation.ItemId,
      DeviceLocationId : this.guidedPickData.pickLocation.DeviceLocationId,
    };
  }

  private safetyStockProductScanCompleted(barcodeData: IBarcodeData) {
    this.safetyStockScanInfo = barcodeData;
    if (this.guidedPickData.quickAdvanceOnScan && this.pickTotal <= this.guidedPickData.pickLocation.QuantityOnHand) {
      this.pickCompleted.emit(this.getCompletePickData());
    } else {
      this.tryCompletePickOnScan();
    }
  }

  private safetyStockOverrideScanCompleted(barcodeData: IBarcodeData) {
    this.safetyStockScanInfo = barcodeData;
    this.tryCompletePickOnScan();
  }

  private setExpDateInPastValue() {
    if (!this._guidedPickData || !this._guidedPickData.pickLocation || !this.pickTotal) {
      return;
    }

    const today = dateTimeToday();
    const expDate = new Date(this._guidedPickData.pickLocation.ExpirationDate);
    const granularity = this._guidedPickData.pickLocation.ExpirationDateGranularity;
    this.expDateInPast = granularity != 'None' && expDate < today;
  }

  private tryCompletePickOnScan() {
    let scanSubscription = this.barcodeParsingService.productBarcodeParsed$.subscribe(x => {
      this.secondaryScanInfo = x;
      if (this.pickTotal <= this.guidedPickData.pickLocation.QuantityOnHand) {
        this.pickCompleted.emit(this.getCompletePickData());
      }
    });
    this._scanSubscriptions.push(scanSubscription);
  }

  private clearScanSubscriptions(){
    if(!this._scanSubscriptions.length){
      return;
    }

    this._scanSubscriptions.forEach(x => x.unsubscribe());
    this._scanSubscriptions = [];
  }

  private clearScanInfo() {
    this.safetyStockScanInfo = null;
    this.secondaryScanInfo = null;
  }

  private setupScanHandler() {
    if (!this.guidedPickData) {
      return;
    }

    if (!this.guidedPickData.isProductScanRequired) {
      this.tryCompletePickOnScan();
    } else {
      const itemId = this.guidedPickData.pickLocation.ItemId;
      this.barcodeOverrideService.initialize(new BarcodeOverrideDataPicking(itemId, []));
      let productScanSubscription = this.barcodeSafetyStockService.productScannedSuccessfully.subscribe(x => this.safetyStockProductScanCompleted(x));
      this._scanSubscriptions.push(productScanSubscription);
      let overrideScanSubscription = this.barcodeOverrideService.overrideBarcodeParsed$.subscribe(x => this.safetyStockOverrideScanCompleted(x));
      this._scanSubscriptions.push(overrideScanSubscription);
    }
  }

  private setupQtySubscription() {
    this._qtySubscription = this.qytTrackingService.quantitySubject.subscribe(x => this.pickTotal = x);
  }
}
