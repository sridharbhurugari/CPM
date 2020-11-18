import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ButtonActionModule, FooterModule, LayoutModule } from '@omnicell/webcorecomponents';
import { Guid } from 'guid-typescript';
import { Observable, of, Subject } from 'rxjs';
import { IBarcodeData } from '../../api-core/data-contracts/i-barcode-data';
import { IDeviceLocation } from '../../api-core/data-contracts/i-device-location';
import { IItemLocationDetail } from '../../api-core/data-contracts/i-item-location-detail';
import { IItemReplenishmentNeed } from '../../api-core/data-contracts/i-item-replenishment-need';
import { IPicklistLine } from '../../api-core/data-contracts/i-picklist-line';
import { DeviceReplenishmentNeedsService } from '../../api-core/services/device-replenishment-needs.service';
import { ItemLocaitonDetailsService } from '../../api-core/services/item-locaiton-details.service';
import { OrderItemPendingQuantitiesService } from '../../api-core/services/order-item-pending-quantities.service';
import { PicklistLineIdsService } from '../../api-core/services/picklist-line-ids.service';
import { PicklistLinesService } from '../../api-core/services/picklist-lines.service';
import { ConfigValues } from '../../shared/constants/config-values';
import { IConfigurationValue } from '../../shared/interfaces/i-configuration-value';
import { BarcodeOverrideService } from '../../shared/services/barcode-override.service';
import { BarcodeParsingService } from '../../shared/services/barcode-parsing.service';
import { BarcodeSafetyStockService } from '../../shared/services/barcode-safety-stock.service';
import { OcapHttpConfigurationService } from '../../shared/services/ocap-http-configuration.service';
import { SystemConfigurationService } from '../../shared/services/system-configuration.service';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { MockGuidedItemHeaderComponent } from '../../shared/testing/mock-guided-item-header.spec';
import { MockHeaderedContentControlComponent } from '../../shared/testing/mock-headered-content-control.spec';
import { MockHorizontalTabsComponent } from '../../shared/testing/mock-hornizontal-tabs.spec';
import { MockSplitFixedComponent } from '../../shared/testing/mock-spit-fixed.spec';
import { MockTabContentsComponent } from '../../shared/testing/mock-tab-contents.spec';
import { MockValidationIconComponent } from '../../shared/testing/mock-validation-icon.spec';
import { IInternalTransferPackSizePick } from '../model/i-internal-transfer-pack-size-pick';
import { MockInternalTransferPickNeedsListComponent } from '../testing/mock-internal-transfer-pick-needs-list.spec';
import { MockTranslatePipe } from '../testing/mock-translate-pipe.spec';

import { InternalTransferPickPageComponent } from './internal-transfer-pick-page.component';

describe('InternalTransferPickPageComponent', () => {
  let component: InternalTransferPickPageComponent;
  let fixture: ComponentFixture<InternalTransferPickPageComponent>;
  let picklistLinesService: Partial<PicklistLinesService>;
  let wpfActionController: Partial<WpfActionControllerService>;
  let productBarcodeParsed$: Observable<IBarcodeData> = new Subject<IBarcodeData>();
  let productScannedSuccessfully$: Observable<IBarcodeData> = new Subject<IBarcodeData>();

  let picktotals: IInternalTransferPackSizePick[] = [
    { PackSize: 1, PacksToPick: 800, QuantityToPick: 800 },
    { PackSize: 5, PacksToPick: 15, QuantityToPick: 75 },
    { PackSize: 10, PacksToPick: 10, QuantityToPick: 100 },
  ];

  beforeEach(async(() => {
    let deviceLocationId = 3290;
    let deviceLocation: Partial<IDeviceLocation> = { };
    let itemLocationDetail: Partial<IItemLocationDetail> = { 
      DeviceLocationId: deviceLocationId,
      DeviceLocation: deviceLocation as any,
      QuantityOnHand: 35
    };
    let itemNeed: Partial<IItemReplenishmentNeed> = { };
    let picklistLine: Partial<IPicklistLine> = { 
      ItemId: '', 
      SourceDeviceLocationId: deviceLocationId,
      PicklistLineId: Guid.create().toString(),
    };
    let picklistLines = [ picklistLine ];
    let picklistLineIds = picklistLines.map(x => x.PicklistLineId);
  
    picklistLinesService = { 
      get: (plid: Guid) => { return of(picklistLines.find(x => x.PicklistLineId == plid.toString()) as IPicklistLine) },
      completePick: jasmine.createSpy('completePick').and.returnValue(of(true)),
    };
    wpfActionController = { 
      ExecuteBackAction: jasmine.createSpy('ExecuteBackAction'), 
      ExecuteActionName: jasmine.createSpy('ExecuteActionName'), 
    };
    let safetyStockConfig: Partial<IConfigurationValue> = {
      Value: ConfigValues.No,
    }
    let quickAdvanceConfig: Partial<IConfigurationValue> = {
      Value: ConfigValues.No,
    }
    TestBed.configureTestingModule({
      declarations: [ 
        InternalTransferPickPageComponent,
        MockGuidedItemHeaderComponent,
        MockHorizontalTabsComponent,
        MockTabContentsComponent,
        MockHeaderedContentControlComponent,
        MockValidationIconComponent,
        MockInternalTransferPickNeedsListComponent,
        MockSplitFixedComponent,
        MockTranslatePipe,
      ],
      imports: [
        LayoutModule,
        FooterModule,
        ButtonActionModule,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { queryParamMap : { get: () => '' } } } },
        { provide: PicklistLineIdsService, useValue: { getLineIdsForWorkstation: () => { return of(picklistLineIds); } } },
        { provide: OcapHttpConfigurationService, useValue: { get: () => { return { clientId: '' } } } },
        { provide: SystemConfigurationService, useValue: { getPickingSafetyStockConfig: () => of(safetyStockConfig), getSafetyStockQuickAdvanceConfig: () => of(quickAdvanceConfig) } },
        { provide: PicklistLinesService, useValue: picklistLinesService }, 
        { provide: DeviceReplenishmentNeedsService, useValue: { getDeviceNeedsForItem: () => { return of([ itemNeed ]) } } },
        { provide: WpfActionControllerService, useValue: wpfActionController },
        { provide: ItemLocaitonDetailsService, useValue: { get: () => { return of([ itemLocationDetail ]) } } },
        { provide: OrderItemPendingQuantitiesService, useValue: { get: () => { return of(null) } } },
      ]
    })
    .overrideComponent(
      InternalTransferPickPageComponent,
      { set: { providers: [
        { provide: BarcodeParsingService, useValue: { productBarcodeParsed$: productBarcodeParsed$ } },
        { provide: BarcodeOverrideService, useValue: { initialize: () => { } } },
        { provide: BarcodeSafetyStockService, useValue: { productScannedSuccessfully: productScannedSuccessfully$ } },
      ]}},
    )
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalTransferPickPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('hold', () => {
    describe('isLast true', () => {
      it('should call ExecuteActionName continue', () => {
        component.hold(true);
        expect(wpfActionController.ExecuteActionName).toHaveBeenCalledWith('Continue');
      });
    });
  });

  describe('completePick', () => {
    it('should call PicklistLinesService completePick', () => {
      component.pickTotalChanged(picktotals);
      component.completePick();
      expect(picklistLinesService.completePick).toHaveBeenCalled();
    });

    describe('for last item', () => {
      it('should call ExecuteActionName continue', () => {
        component.pickTotalChanged(picktotals);
        component.completePick();
        expect(wpfActionController.ExecuteActionName).toHaveBeenCalledWith('Continue');
      });
    });
  });
});
