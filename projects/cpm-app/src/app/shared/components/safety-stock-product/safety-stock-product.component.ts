import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { merge, Subscription } from 'rxjs';
import { IBarcodeData } from '../../../api-core/data-contracts/i-barcode-data';
import { ISafetyStockProductData } from '../../model/i-safety-stock-product-data';
import { IScannedBarcodeData } from '../../model/i-scanned-barcode-data';
import { BarcodeOverrideService } from '../../services/barcode-override.service';
import { BarcodeParsingService } from '../../services/barcode-parsing.service';
import { BarcodeSafetyStockService } from '../../services/barcode-safety-stock.service';

@Component({
  selector: 'app-safety-stock-product',
  templateUrl: './safety-stock-product.component.html',
  styleUrls: ['./safety-stock-product.component.scss']
})
export class SafetyStockProductComponent implements OnInit {
  private _safetyStockProductData: ISafetyStockProductData;
  private _subscription: Subscription;
  private _scanNeeded: boolean;

  @Input()
  set safetyStockProductData(value: ISafetyStockProductData) {
    this._safetyStockProductData = value;

    if(this._subscription){
      this.clearSubscription();
    }

    if (this._safetyStockProductData && this._safetyStockProductData.requireProductScan) {
      this.scanNeeded = true;
      let eligibleScans = merge(this.barcodeParsingService.productBarcodeParsed$, this.barcodeOverrideService.overrideBarcodeParsed$);
      this._subscription = eligibleScans.subscribe(x => {
        this.handleBarcodeData(x);
      });
    }else{
      this.scanNeeded = false;
    }
  }

  get safetyStockProductData() {
    return this._safetyStockProductData;
  }

  set scanNeeded(value: boolean) {
    this._scanNeeded = value;
    this.barcodeSafetyStockService.awaitingProductScan = value;
  }

  get scanNeeded(): boolean {
    return this._scanNeeded;
  }

  constructor(
    private barcodeParsingService: BarcodeParsingService,
    private barcodeOverrideService: BarcodeOverrideService,
    private barcodeSafetyStockService: BarcodeSafetyStockService,
  ) {
  }

  ngOnInit() {
  }

  handleBarcodeData(barcodeData: IBarcodeData) {
    if (barcodeData.IsProductBarcode && barcodeData.ItemId == this.safetyStockProductData.itemId) {
      this.onSuccessfulScan();
      this.barcodeSafetyStockService.productScanAccepted(barcodeData);
      return;
    }

    if(barcodeData.IsBarcodeOverride){
      this.onSuccessfulScan();
    }
  }

  private onSuccessfulScan() {
    this.clearSubscription();
    this.scanNeeded = false;
  }

  private clearSubscription() {
    if (!this._subscription) {
      return;
    }

    this._subscription.unsubscribe();
    this._subscription = null;
  }
}
