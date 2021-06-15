import { TestBed } from '@angular/core/testing';
import { LoggerService } from 'oal-core';

import { CpBarcodeScanService } from './cp-barcode-scan.service';

const mockLoggerService = {
  logInfo: (verbosity: any, category: any, message: any) => {},
  logWarning: (verbosity: any, category: any, message: any) => {},
  logError: (verbosity: any, category: any, message: any) => {}
};


describe('CpBarcodeScanService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: LoggerService, useValue: mockLoggerService },
    ],
  }));

  it('should be created', () => {
    const service: CpBarcodeScanService = TestBed.get(CpBarcodeScanService);
    expect(service).toBeTruthy();
  });
});
