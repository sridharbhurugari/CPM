import { Component, Input } from '@angular/core';
import { merge, Subscription } from 'rxjs';
import { IBarcodeData } from '../../../api-core/data-contracts/i-barcode-data';
import { ISafetyStockProductData } from '../../model/i-safety-stock-product-data';
import { BarcodeOverrideService } from '../../services/barcode-override.service';
import { BarcodeParsingService } from '../../services/barcode-parsing.service';
import { BarcodeSafetyStockService } from '../../services/barcode-safety-stock.service';
import { QuantityTrackingService } from '../../services/quantity-tracking.service';

@Component({
  selector: 'app-safety-stock-product',
  templateUrl: './safety-stock-product.component.html',
  styleUrls: ['./safety-stock-product.component.scss']
})
export class SafetyStockProductComponent {
  private _safetyStockProductData: ISafetyStockProductData;
  private _subscriptions: Subscription[] = [];
  private _scanNeeded: boolean;
  private _productScannedSuccessfully: boolean;

  @Input()
  set safetyStockProductData(value: ISafetyStockProductData) {
    this._safetyStockProductData = value;
    this._productScannedSuccessfully = false;

    this.clearSubscriptions();

    if (this._safetyStockProductData && this._safetyStockProductData.requireProductScan && this.quantityTrackingService.quantity > 0) {
      this.scanNeeded = true;
      let eligibleScans = merge(this.barcodeParsingService.productBarcodeParsed$, this.barcodeOverrideService.overrideBarcodeParsed$);
      let scanSubscription = eligibleScans.subscribe(x => {
        this.handleBarcodeData(x);
      });
      let qtySubscription = this.quantityTrackingService.quantitySubject.subscribe(qty => {
        if (!this._safetyStockProductData || !this._safetyStockProductData.requireProductScan) {
          return;
        }
  
        if (qty === 0) {
          this.scanNeeded = false;
        } else {
          this.scanNeeded = !this._productScannedSuccessfully;
        }
      });

      this._subscriptions.push(scanSubscription, qtySubscription);
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
    private quantityTrackingService: QuantityTrackingService,
  ) {
  }

  private handleBarcodeData(barcodeData: IBarcodeData) {
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
    this.clearSubscriptions();
    this._productScannedSuccessfully = true
    this.scanNeeded = false;
  }

  private clearSubscriptions() {
    if (!this._subscriptions || !this._subscriptions.length) {
      return;
    }

    this._subscriptions.forEach(s => s.unsubscribe());
    this._subscriptions = [];
  }
}
