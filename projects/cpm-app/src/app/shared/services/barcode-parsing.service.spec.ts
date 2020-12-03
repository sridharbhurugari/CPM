import { TestBed } from '@angular/core/testing';
import { BarcodeScanService } from 'oal-core';
import { Subject } from 'rxjs';
import { BarcodeDataService } from '../../api-core/services/barcode-data.service';

import { BarcodeParsingService } from './barcode-parsing.service';

describe('BarcodeParsingService', () => {
  let barocdeScannedSubject = new Subject<string>();
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: BarcodeScanService, useValue: { BarcodeScannedSubject: barocdeScannedSubject } },
      { provide: BarcodeDataService, useValue: { } },
      BarcodeParsingService,
    ],
  }));

  it('should be created', () => {
    const service: BarcodeParsingService = TestBed.get(BarcodeParsingService);
    expect(service).toBeTruthy();
  });
});
