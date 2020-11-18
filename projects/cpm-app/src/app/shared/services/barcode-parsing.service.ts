import { Injectable } from '@angular/core';
import { BarcodeScanService } from 'oal-core';
import { Observable } from 'rxjs';
import { filter, shareReplay, switchMap } from 'rxjs/operators';
import { IBarcodeData } from '../../api-core/data-contracts/i-barcode-data';
import { BarcodeDataService } from '../../api-core/services/barcode-data.service';

@Injectable()
export class BarcodeParsingService {
  barcodeParsed$: Observable<IBarcodeData>;
  productBarcodeParsed$: Observable<IBarcodeData>;
  binBarcodeParsed$: Observable<IBarcodeData>;
  dispenseBarcodeParsed$: Observable<IBarcodeData>;
  unrecognizedBarcodeParsed$: Observable<IBarcodeData>;

  constructor(
    barcodeScanService: BarcodeScanService,
    barcodeDataService: BarcodeDataService,
  ) {
    this.barcodeParsed$ = barcodeScanService.BarcodeScannedSubject.pipe(switchMap(x => barcodeDataService.getData(x).pipe(shareReplay(1))));
    this.productBarcodeParsed$ = this.barcodeParsed$.pipe(filter(x => x.IsProductBarcode && x.ItemId != null));
    this.binBarcodeParsed$ = this.barcodeParsed$.pipe(filter(x => x.IsBinBarcode));
    this.dispenseBarcodeParsed$ = this.barcodeParsed$.pipe(filter(x => x.IsDispenseBarcode));
    this.binBarcodeParsed$ = this.barcodeParsed$.pipe(filter(x => x.IsTrayBarcode));
    this.unrecognizedBarcodeParsed$ = this.barcodeParsed$.pipe(filter(x => x.IsUnrecognizedBarcode));
  }
}
