import { TestBed } from '@angular/core/testing';

import { CpBarcodeScanService } from './cp-barcode-scan.service';

describe('CpBarcodeScanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CpBarcodeScanService = TestBed.get(CpBarcodeScanService);
    expect(service).toBeTruthy();
  });
});
