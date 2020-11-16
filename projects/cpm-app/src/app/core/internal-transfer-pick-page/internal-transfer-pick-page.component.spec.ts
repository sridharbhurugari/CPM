import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ButtonActionModule, FooterModule, LayoutModule } from '@omnicell/webcorecomponents';
import { Guid } from 'guid-typescript';
import { of } from 'rxjs';
import { IDeviceLocation } from '../../api-core/data-contracts/i-device-location';
import { IItemLocationDetail } from '../../api-core/data-contracts/i-item-location-detail';
import { IItemReplenishmentNeed } from '../../api-core/data-contracts/i-item-replenishment-need';
import { IPicklistLine } from '../../api-core/data-contracts/i-picklist-line';
import { DeviceReplenishmentNeedsService } from '../../api-core/services/device-replenishment-needs.service';
import { ItemLocaitonDetailsService } from '../../api-core/services/item-locaiton-details.service';
import { OrderItemPendingQuantitiesService } from '../../api-core/services/order-item-pending-quantities.service';
import { PicklistLineIdsService } from '../../api-core/services/picklist-line-ids.service';
import { PicklistLinesService } from '../../api-core/services/picklist-lines.service';
import { OcapHttpConfigurationService } from '../../shared/services/ocap-http-configuration.service';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { MockGuidedItemHeaderComponent } from '../../shared/testing/mock-guided-item-header.spec';
import { MockHeaderedContentControlComponent } from '../../shared/testing/mock-headered-content-control.spec';
import { MockHorizontalTabsComponent } from '../../shared/testing/mock-hornizontal-tabs.spec';
import { MockSplitFixedComponent } from '../../shared/testing/mock-spit-fixed.spec';
import { MockTabContentsComponent } from '../../shared/testing/mock-tab-contents.spec';
import { MockValidationIconComponent } from '../../shared/testing/mock-validation-icon.spec';
import { MockInternalTransferPickNeedsListComponent } from '../testing/mock-internal-transfer-pick-needs-list.spec';
import { MockTranslatePipe } from '../testing/mock-translate-pipe.spec';

import { InternalTransferPickPageComponent } from './internal-transfer-pick-page.component';

describe('InternalTransferPickPageComponent', () => {
  let component: InternalTransferPickPageComponent;
  let fixture: ComponentFixture<InternalTransferPickPageComponent>;
  let picklistLinesService: Partial<PicklistLinesService>;
  let wpfActionController: Partial<WpfActionControllerService>;

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
        { provide: PicklistLinesService, useValue: picklistLinesService }, 
        { provide: DeviceReplenishmentNeedsService, useValue: { getDeviceNeedsForItem: () => { return of([ itemNeed ]) } } },
        { provide: WpfActionControllerService, useValue: wpfActionController },
        { provide: ItemLocaitonDetailsService, useValue: { get: () => { return of([ itemLocationDetail ]) } } },
        { provide: OrderItemPendingQuantitiesService, useValue: { get: () => { return of(null) } } },
      ]
    })
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
      component.pickTotalChanged(5);
      component.completePick();
      expect(picklistLinesService.completePick).toHaveBeenCalled();
    });

    describe('for last item', () => {
      it('should call ExecuteActionName continue', () => {
        component.pickTotalChanged(5);
        component.completePick();
        expect(wpfActionController.ExecuteActionName).toHaveBeenCalledWith('Continue');
      });
    });
  });
});