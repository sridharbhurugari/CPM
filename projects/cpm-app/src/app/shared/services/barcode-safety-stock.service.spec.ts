import { TestBed } from '@angular/core/testing';

import { BarcodeSafetyStockService } from './barcode-safety-stock.service';

describe('BarcodeSafetyStockService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      BarcodeSafetyStockService,
    ],
  }));

  it('should be created', () => {
    const service: BarcodeSafetyStockService = TestBed.get(BarcodeSafetyStockService);
    expect(service).toBeTruthy();
  });
});
