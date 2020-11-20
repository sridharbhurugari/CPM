import { EventEmitter, Injectable } from '@angular/core';
import { IBarcodeData } from '../../api-core/data-contracts/i-barcode-data';

@Injectable()
export class BarcodeSafetyStockService {
  private _awaitingProductScan: boolean = false;
  private _awaitingDispenseScan: boolean = false;
  private _awaitingBinScan: boolean = false;

  productScannedSuccessfully: EventEmitter<IBarcodeData> = new EventEmitter<IBarcodeData>();
  dispenseScannedSuccessfully: EventEmitter<IBarcodeData> = new EventEmitter<IBarcodeData>();
  binScannedSuccessfully: EventEmitter<IBarcodeData> = new EventEmitter<IBarcodeData>();

  awaitingProductScanChanged: EventEmitter<boolean> = new EventEmitter<boolean>(true);
  awaitingDispenseScanChanged: EventEmitter<boolean> = new EventEmitter<boolean>(true);
  awaitingBinScanChanged: EventEmitter<boolean> = new EventEmitter<boolean>(true);

  get awaitingProductScan(): boolean {
    return this._awaitingProductScan;
  }

  set awaitingProductScan(value: boolean) {
    this._awaitingProductScan = value;
    this.awaitingProductScanChanged.emit(this._awaitingProductScan);
  }

  get awaitingDispenseScan(): boolean {
    return this._awaitingDispenseScan;
  }

  set awaitingDispenseScan(value: boolean) {
    this._awaitingDispenseScan = value;
    this.awaitingDispenseScanChanged.emit(this._awaitingProductScan);
  }

  get awaitingBinScan(): boolean {
    return this._awaitingBinScan;
  }

  set awaitingBinScan(value: boolean) {
    this._awaitingBinScan = value;
    this.awaitingBinScanChanged.emit(this._awaitingProductScan);
  }

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
