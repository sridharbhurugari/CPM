import { TestBed } from '@angular/core/testing';

import { BarcodeSafetyStockService } from './barcode-safety-stock.service';

describe('BarcodeSafetyStockService', () => {
  let service: BarcodeSafetyStockService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BarcodeSafetyStockService,
      ],
    })
    service = TestBed.get(BarcodeSafetyStockService);
    spyOn(service.productScannedSuccessfully, 'emit');
    spyOn(service.dispenseScannedSuccessfully, 'emit');
    spyOn(service.binScannedSuccessfully, 'emit');
    spyOn(service.awaitingProductScanChanged, 'emit');
    spyOn(service.awaitingDispenseScanChanged, 'emit');
    spyOn(service.awaitingBinScanChanged, 'emit');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('given awaiting product scan is set to true', () => {
    beforeEach(() => {
      service.awaitingProductScan = true;
    });

    it('should emit change event', () => {
      expect(service.awaitingProductScanChanged.emit).toHaveBeenCalled();
    });

    describe('when productScanAccepted', () => {
      beforeEach(() => {
        service.productScanAccepted(null);
      });

      it('should set awaitingProductScan false', () => {
        expect(service.awaitingProductScan).toBeFalsy();
      })
    });
  });

  describe('given awaiting dispense scan is set to true', () => {
    beforeEach(() => {
      service.awaitingDispenseScan = true;
    });

    it('should emit change event', () => {
      expect(service.awaitingDispenseScanChanged.emit).toHaveBeenCalled();
    });

    describe('when dispenseScanAccepted', () => {
      beforeEach(() => {
        service.dispenseScanAccepted(null);
      });

      it('should set awaitingDispenseScan false', () => {
        expect(service.awaitingDispenseScan).toBeFalsy();
      })
    });
  });

  describe('given awaiting bin scan is set to true', () => {
    beforeEach(() => {
      service.awaitingBinScan = true;
    });

    it('should emit change event', () => {
      expect(service.awaitingBinScanChanged.emit).toHaveBeenCalled();
    });

    describe('when binScanAccepted', () => {
      beforeEach(() => {
        service.binScanAccepted(null);
      });

      it('should set awaitingBinScan false', () => {
        expect(service.awaitingBinScan).toBeFalsy();
      })
    });
  });
});
