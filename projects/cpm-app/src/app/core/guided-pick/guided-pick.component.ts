import { EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Component, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
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
  set guidedPickData(value: IGuidedPickData) {
    this._guidedPickData = value;
    this.clearScanSubscriptions();
    this.clearScanInfo();
    this.setupScanHandler();
    this.setExpDateInPastValue();
    this.setupQtySubscription();
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

  userLocale: string;
  pickTotal: number;
  expDateInPast: boolean;
  awaitingProductScan: boolean;
  safetyStockScanInfo: IBarcodeData;
  secondaryScanInfo: IBarcodeData;

  constructor(
    ocapConfigService: OcapHttpConfigurationService,
    private barcodeParsingService: BarcodeParsingService,
    private barcodeOverrideService: BarcodeOverrideService,
    private barcodeSafetyStockService: BarcodeSafetyStockService,
    private qytTrackingService: QuantityTrackingService,
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
