import { EventEmitter, Injectable, Output } from '@angular/core';
import { IBarcodeData } from '../../api-core/data-contracts/i-barcode-data';

@Injectable()
export class BarcodeSafetyStockService {

  @Output()
  productScannedSuccessfully: EventEmitter<IBarcodeData> = new EventEmitter<IBarcodeData>();
  
  @Output()
  dispenseScannedSuccessfully: EventEmitter<IBarcodeData> = new EventEmitter<IBarcodeData>();
  
  @Output()
  binScannedSuccessfully: EventEmitter<IBarcodeData> = new EventEmitter<IBarcodeData>();

  awaitingProductScan: boolean = false;
  awaitingDispenseScan: boolean = false;
  awaitingBinScan: boolean = false;

  constructor() { }

  productScanAccepted(barcodeData: IBarcodeData) {
    this.awaitingProductScan = false;
    this.productScannedSuccessfully.emit(barcodeData);
  }

  dispenseScanAccepted(barcodeData: IBarcodeData) {
    this.awaitingDispenseScan = false;
    this.dispenseScannedSuccessfully.emit(barcodeData);
  }

  binScanAccepted(barcodeData: IBarcodeData) {
    this.awaitingBinScan = false;
    this.binScannedSuccessfully.emit(barcodeData);
  }
}
