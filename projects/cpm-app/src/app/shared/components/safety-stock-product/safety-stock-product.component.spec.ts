import { EventEmitter } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReplaySubject, Subscription } from 'rxjs';
import { IBarcodeData } from '../../../api-core/data-contracts/i-barcode-data';
import { ISafetyStockProductData } from '../../model/i-safety-stock-product-data';
import { BarcodeOverrideService } from '../../services/barcode-override.service';
import { BarcodeParsingService } from '../../services/barcode-parsing.service';
import { BarcodeSafetyStockService } from '../../services/barcode-safety-stock.service';
import { QuantityTrackingService } from '../../services/quantity-tracking.service';
import { MockValidationIconComponent } from '../../testing/mock-validation-icon.spec';

import { SafetyStockProductComponent } from './safety-stock-product.component';

describe('SafetyStockProductComponent', () => {
  let component: SafetyStockProductComponent;
  let fixture: ComponentFixture<SafetyStockProductComponent>;
  let productBarcodeParsed$: EventEmitter<IBarcodeData>;
  let overrideParsed$: EventEmitter<IBarcodeData>;
  let safetyStockProductData: ISafetyStockProductData;
  let quantityService: Partial<QuantityTrackingService>;

  beforeEach(async(() => {
    safetyStockProductData = {
      dispenseIds: [],
      itemId: 'sdlkfja',
      requireBinScan: false,
      requireDispenseScan: false,
      requireProductScan: false,
    };
    productBarcodeParsed$ = new EventEmitter<IBarcodeData>();
    overrideParsed$ = new EventEmitter<IBarcodeData>();
    let quantitySubject = new ReplaySubject<number>();
    quantityService = { quantitySubject: quantitySubject, quantity: 5 };
    TestBed.configureTestingModule({
      declarations: [ 
        SafetyStockProductComponent,
        MockValidationIconComponent,
      ],
      providers: [
        { provide: BarcodeParsingService, useValue: { productBarcodeParsed$: productBarcodeParsed$ } },
        { provide: BarcodeOverrideService, useValue: { overrideBarcodeParsed$: overrideParsed$ } },
        { provide: BarcodeSafetyStockService, useValue: { awaitingProductScan: false, productScanAccepted: () => { } } },
        { provide: QuantityTrackingService, useValue: quantityService },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SafetyStockProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('requireProductScan true', () => {
    beforeEach(() => {
      safetyStockProductData.requireProductScan = true;
      component.safetyStockProductData = safetyStockProductData;
    });

    it('should set scanNeeded true', () => {
      expect(component.scanNeeded).toBeTruthy();
    });

    describe('ngOnDestroy', () => {
      it('should clear subscriptions', () => {
        let subscriptions: Subscription[] = component['_subscriptions'];
        subscriptions.forEach(s => spyOn(s, 'unsubscribe'));
        component.ngOnDestroy();
        subscriptions.forEach(s => expect(s.unsubscribe).toHaveBeenCalled());
      });
    });

    describe('quantity changed to zero', () => {
      beforeEach(() => {
        quantityService.quantitySubject.next(0);
      });

      it('should set scanNeeded false', () => {
        expect(component.scanNeeded).toBeFalsy();
      });

      describe('and quantity changed to non-zero', () => {
        beforeEach(() => {
          quantityService.quantitySubject.next(8);
        });
  
        it('should set scanNeeded back to true', () => {
          expect(component.scanNeeded).toBeTruthy();
        });
      });
    });

    describe('product barcode parsed', () => {
      describe('and item id matches', () => {
        beforeEach(() => {
          productBarcodeParsed$.next({ IsProductBarcode: true, ItemId: safetyStockProductData.itemId } as IBarcodeData);
        });

        it('should set scanNeeded false', () => {
          expect(component.scanNeeded).toBeFalsy();
        });
      });

      describe('but item id does not match', () => {
        beforeEach(() => {
          productBarcodeParsed$.next({ IsProductBarcode: true, ItemId: 'noMatch' } as IBarcodeData);
        });

        it('should not set scanNeeded false', () => {
          expect(component.scanNeeded).toBeTruthy();
        });
      });
    });
    describe('override parsed', () => {
      beforeEach(() => {
        overrideParsed$.next({ IsBarcodeOverride: true } as IBarcodeData)
      });

      it('should set scanNeeded false', () => {
        expect(component.scanNeeded).toBeFalsy();
      });
    });
  });

  describe('requireProductScan false', () => {
    beforeEach(() => {
      safetyStockProductData.requireProductScan = false;
      component.safetyStockProductData = safetyStockProductData;
    });

    it('should set scanNeeded false', () => {
      expect(component.scanNeeded).toBeFalsy();
    });
  });
});
