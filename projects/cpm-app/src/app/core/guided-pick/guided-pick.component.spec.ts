import { EventEmitter } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonActionModule, FooterModule, LayoutModule } from '@omnicell/webcorecomponents';
import { of, Subject } from 'rxjs';
import { IBarcodeData } from '../../api-core/data-contracts/i-barcode-data';
import { IItemLocationDetail } from '../../api-core/data-contracts/i-item-location-detail';
import { BarcodeOverrideService } from '../../shared/services/barcode-override.service';
import { BarcodeParsingService } from '../../shared/services/barcode-parsing.service';
import { BarcodeSafetyStockService } from '../../shared/services/barcode-safety-stock.service';
import { OcapHttpConfigurationService } from '../../shared/services/ocap-http-configuration.service';
import { QuantityTrackingService } from '../../shared/services/quantity-tracking.service';
import { MockGuidedItemHeaderComponent } from '../../shared/testing/mock-guided-item-header.spec';
import { MockHeaderedContentControlComponent } from '../../shared/testing/mock-headered-content-control.spec';
import { MockHorizontalTabsComponent } from '../../shared/testing/mock-hornizontal-tabs.spec';
import { MockSplitFixedComponent } from '../../shared/testing/mock-spit-fixed.spec';
import { MockTabContentsComponent } from '../../shared/testing/mock-tab-contents.spec';
import { MockValidationIconComponent } from '../../shared/testing/mock-validation-icon.spec';
import { IGuidedPickData } from '../model/i-guided-pick-data';
import { MockTranslatePipe } from '../testing/mock-translate-pipe.spec';

import { GuidedPickComponent } from './guided-pick.component';

describe('GuidedPickComponent', () => {
  let component: GuidedPickComponent;
  let fixture: ComponentFixture<GuidedPickComponent>;
  let productBarcodeParsed$: EventEmitter<IBarcodeData>;
  let productScannedSuccessfully$: EventEmitter<IBarcodeData>;
  let awaitingProductScanChanged$: EventEmitter<boolean>;
  let guidedPickData: IGuidedPickData;

  beforeEach(async(() => {
    productScannedSuccessfully$ = new EventEmitter<IBarcodeData>();
    awaitingProductScanChanged$ = new EventEmitter<boolean>();
    productBarcodeParsed$ = new EventEmitter<IBarcodeData>();
    spyOn(productScannedSuccessfully$, 'subscribe').and.callThrough();
    spyOn(productBarcodeParsed$, 'subscribe').and.callThrough();
    TestBed.configureTestingModule({
      declarations: [ 
        GuidedPickComponent,
        MockGuidedItemHeaderComponent,
        MockHorizontalTabsComponent,
        MockTabContentsComponent,
        MockHeaderedContentControlComponent,
        MockValidationIconComponent,
        MockSplitFixedComponent,
        MockTranslatePipe,
      ],
      imports: [
        LayoutModule,
        FooterModule,
        ButtonActionModule,
      ],
      providers: [
        { provide: OcapHttpConfigurationService, useValue: { get: () => { return { userLocale: '' } } } },
        { provide: QuantityTrackingService, useValue: { quantitySubject: of(5) } },
      ],
    })
    .overrideComponent(
      GuidedPickComponent,
      { set: { providers: [
        { provide: BarcodeParsingService, useValue: { productBarcodeParsed$: productBarcodeParsed$ } },
        { provide: BarcodeOverrideService, useValue: { initialize: () => { }, overrideBarcodeParsed$: new Subject<IBarcodeData>(), } },
        { provide: BarcodeSafetyStockService, useValue: { productScannedSuccessfully: productScannedSuccessfully$, awaitingProductScanChanged: awaitingProductScanChanged$ } },
      ]}},
    )
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuidedPickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    guidedPickData = {
      isLastLine: false,
      isProductScanRequired: false,
      itemHeaderInfo: null,
      orderItemPendingQtys: null,
      pharmacyQoh: 389,
      pickLocation: { ItemId: 'lsdfkj', QuantityOnHand: 250, } as IItemLocationDetail,
      picklistLine: null,
      picklistLineIndex: 1,
      quickAdvanceOnScan: false,
      totalLines: 5,
    };
    spyOn(component.pickCompleted, 'emit').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('given product scan is required', () => {
    beforeEach(() => {
        guidedPickData.isProductScanRequired = true;
    });

    it('should subscribe to safety stock service scan', () => {
      component.guidedPickData = guidedPickData;
      expect(productScannedSuccessfully$.subscribe).toHaveBeenCalled();
    });

    describe('and quick advance is enabled', () => {
      beforeEach(() => {
        guidedPickData.quickAdvanceOnScan = true;
        component.guidedPickData = guidedPickData;
      });

      describe('when safety stock scan is completed successfuly', () => {
        beforeEach(() => {
          productScannedSuccessfully$.emit({} as IBarcodeData);
        });

        it('should complete the pick', () => {
          expect(component.pickCompleted.emit).toHaveBeenCalled();
        });
      });
    });

    describe('and quick advance is disabled', () => {
      beforeEach(() => {
        guidedPickData.quickAdvanceOnScan = false;
        component.guidedPickData = guidedPickData;
      });

      describe('when safety stock scan is completed successfuly', () => {
        beforeEach(() => {
          productScannedSuccessfully$.emit({} as IBarcodeData);
        });

        it('should not complete the pick', () => {
          expect(component.pickCompleted.emit).not.toHaveBeenCalled();
        });

        it('should subscribe to product scans', () => {
          expect(productBarcodeParsed$.subscribe).toHaveBeenCalled();
        });

        describe('and product barcode is scanned again', () => {
          beforeEach(() => {
            productBarcodeParsed$.emit({} as IBarcodeData);
          });

          it('should complete the pick', () => {
            expect(component.pickCompleted.emit).toHaveBeenCalled();
          });
        });
      });
    });
  });

  describe('given product scan is not required', () => {
    beforeEach(() => {
      guidedPickData.isProductScanRequired = false;
      component.guidedPickData = guidedPickData;
    });

    it('should subscribe to product scans', () => {
      expect(productBarcodeParsed$.subscribe).toHaveBeenCalled();
    });

    it('should not subscribe to safety stock service scan', () => {
      expect(productScannedSuccessfully$.subscribe).not.toHaveBeenCalled();
    });

    describe('when product barcode is scanned', () => {
      beforeEach(() => {
        productBarcodeParsed$.emit({} as IBarcodeData);
      });

      it('should complete the pick', () => {
        expect(component.pickCompleted.emit).toHaveBeenCalled();
      });
    });
  });
});
