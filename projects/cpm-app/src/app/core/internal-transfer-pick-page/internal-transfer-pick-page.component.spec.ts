import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { of, Subject} from 'rxjs';
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
import { CarouselLocationAccessService } from '../../shared/services/devices/carousel-location-access.service';
import { OcapHttpConfigurationService } from '../../shared/services/ocap-http-configuration.service';
import { SystemConfigurationService } from '../../shared/services/system-configuration.service';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { WpfInteropService } from '../../shared/services/wpf-interop.service';
import { IInternalTransferPackSizePick } from '../model/i-internal-transfer-pack-size-pick';
import { MockGuidedPickComponent } from '../testing/mock-guided-pick.spec';
import { MockInternalTransferPickNeedsListComponent } from '../testing/mock-internal-transfer-pick-needs-list.spec';

import { InternalTransferPickPageComponent } from './internal-transfer-pick-page.component';
import { WpfActionPaths } from "../constants/wpf-action-paths";
import { CoreEventConnectionService } from '../../api-core/services/core-event-connection.service';

describe('InternalTransferPickPageComponent', () => {
  let component: InternalTransferPickPageComponent;
  let fixture: ComponentFixture<InternalTransferPickPageComponent>;
  let picklistLinesService: Partial<PicklistLinesService>;
  let wpfActionController: Partial<WpfActionControllerService>;
  let coreEventConnectionService: Partial<CoreEventConnectionService>;
  let needsBased: boolean;

  let onDemandOrderId = 'od-3928';
  let needsBasedOrderId = 'nb-3928';

  let picktotals: IInternalTransferPackSizePick[] = [
    { PackSize: 1, PacksToPick: 800, QuantityToPick: 800, DeviceQuantityNeeded: 800, },
    { PackSize: 5, PacksToPick: 15, QuantityToPick: 75, DeviceQuantityNeeded: 75, },
    { PackSize: 10, PacksToPick: 10, QuantityToPick: 100, DeviceQuantityNeeded: 100, },
  ];

  beforeEach(async(() => {
    let deviceLocationId = 3290;
    let deviceLocation: Partial<IDeviceLocation> = { };
    let itemLocationDetail: Partial<IItemLocationDetail> = { 
      DeviceLocationId: deviceLocationId,
      DeviceLocation: deviceLocation as any,
      QuantityOnHand: 35
    };
    let itemNeed: Partial<IItemReplenishmentNeed> = { DeviceQuantityNeeded: 5 };
    let picklistLine: Partial<IPicklistLine> = { 
      ItemId: '', 
      SourceDeviceLocationId: deviceLocationId,
      PicklistLineId: Guid.create().toString(),
    };
    let onDemandPicklistLine: Partial<IPicklistLine> = {
      ItemId: '8392', 
      SourceDeviceLocationId: deviceLocationId,
      PicklistLineId: Guid.create().toString(),
      PackSizes: [
        { PackSize: 1, RequestedQuantityInPacks: 5, IsOnDemand: true },
      ],
    };
    let picklistLines = [ picklistLine, { ItemId: '', SourceDeviceLocationId: 3298, PicklistLineId: Guid.create().toString(), } ];
    let onDemandLines = [ onDemandPicklistLine, { ItemId: '', SourceDeviceLocationId: 3298, PicklistLineId: Guid.create().toString(), } ];
    let picklistLineIds = picklistLines.map(x => x.PicklistLineId);
    let onDemandPicklistLineIds = onDemandLines.map(x => x.PicklistLineId);
    let allLines = picklistLines.concat(onDemandLines);
  
    picklistLinesService = { 
      get: (plid: Guid) => { return of(allLines.find(x => x.PicklistLineId == plid.toString()) as IPicklistLine) },
      completePick: jasmine.createSpy('completePick').and.returnValue(of(true)),
    };

    wpfActionController = { 
      ExecuteBackAction: jasmine.createSpy('ExecuteBackAction'), 
      ExecuteActionName: jasmine.createSpy('ExecuteActionName'), 
      ExecuteActionNameWithData: jasmine.createSpy('ExecuteActionNameWithData'), 
    };
    let safetyStockConfig: Partial<IConfigurationValue> = {
      Value: ConfigValues.No,
    }
    let quickAdvanceConfig: Partial<IConfigurationValue> = {
      Value: ConfigValues.No,
    }
    coreEventConnectionService = {
      highPriorityInterruptSubject: new Subject(),
    };

    let picklistLineIdsService = { 
      getGuidedPickingLineIdsForWorkstation : (orderId: string) => { 
        if (orderId == needsBasedOrderId) {
          return of(picklistLineIds);
        }else{
          return of(onDemandPicklistLineIds);
        }
      } 
    };

    let activatedRoute = {
      snapshot: { 
        queryParamMap : { 
          get: () => {
            if(needsBased){
              return needsBasedOrderId;
            }else{
              return onDemandOrderId;
            }
          } 
        } 
      }
    };

    TestBed.configureTestingModule({
      declarations: [ 
        InternalTransferPickPageComponent,
        MockGuidedPickComponent,
        MockInternalTransferPickNeedsListComponent,
      ],
      imports: [
      ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: PicklistLineIdsService, useValue: picklistLineIdsService },
        { provide: OcapHttpConfigurationService, useValue: { get: () => { return { clientId: '' } } } },
        { provide: SystemConfigurationService, useValue: { getPickingSafetyStockConfig: () => of(safetyStockConfig), getSafetyStockQuickAdvanceConfig: () => of(quickAdvanceConfig) } },
        { provide: PicklistLinesService, useValue: picklistLinesService }, 
        { provide: DeviceReplenishmentNeedsService, useValue: { getDeviceNeedsForItem: () => { return of([ itemNeed ]) } } },
        { provide: WpfActionControllerService, useValue: wpfActionController },
        { provide: ItemLocaitonDetailsService, useValue: { get: () => { return of([ itemLocationDetail ]) } } },
        { provide: OrderItemPendingQuantitiesService, useValue: { get: () => { return of(null) } } },
        { provide: CarouselLocationAccessService, useValue: { clearLightbar: jasmine.createSpy('clearLightbar') } },
        { provide: CoreEventConnectionService, useValue: coreEventConnectionService },
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
        { provide: WpfInteropService, useValue: { wpfViewModelActivated: new Subject() } },
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

  describe('needs based pick', () => {
    beforeEach(() => {
      needsBased = true;
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
        component.completePick({
          isLast: false,
          line: {} as IPicklistLine,
          pickTotal: 50,
          productScanRequired: false,
          safetyStockScanInfo: null,
          secondaryScanInfo: null,
        });
        expect(picklistLinesService.completePick).toHaveBeenCalled();
      });

      describe('for last item', () => {
        it('should call ExecuteActionName continue', () => {
          component.pickTotalChanged(picktotals);
          component.completePick({
            isLast: true,
            line: {} as IPicklistLine,
            pickTotal: 50,
            productScanRequired: false,
            safetyStockScanInfo: null,
            secondaryScanInfo: null,
          });
          expect(wpfActionController.ExecuteActionName).toHaveBeenCalledWith('Continue');
        });
      });
    });

    describe('adjustQoh', () => {
      it('should call ExecuteActionNameWithData', () => {
        component.adjustQoh({
          ItemId: 'test',
          DeviceLocationId: 12345,
        });
        expect(wpfActionController.ExecuteActionNameWithData).toHaveBeenCalled();
      });
    });

    describe('pickNow', () => {
      it('should call wpf with High Priority', () => {
        component.pickNow();
        expect(wpfActionController.ExecuteActionName).toHaveBeenCalledWith(WpfActionPaths.HighPriorityPickNow);
      });
    });

    describe('High priority event', () => {
      it('should set bool', () => {
        coreEventConnectionService.highPriorityInterruptSubject.next();
        expect(component.isHighPriorityAvailable).toBeTruthy();
      });
    });
  });

  describe('on demand pick', () => {
    beforeEach(() => {
      needsBased = false;
    });

    describe('completePick', () => {
      it('should call PicklistLinesService completePick', () => {
        component.pickTotalChanged(picktotals);
        component.completePick({
          isLast: false,
          line: {} as IPicklistLine,
          pickTotal: 50,
          productScanRequired: false,
          safetyStockScanInfo: null,
          secondaryScanInfo: null,
        });
        expect(picklistLinesService.completePick).toHaveBeenCalled();
      });
    });
  });
});
