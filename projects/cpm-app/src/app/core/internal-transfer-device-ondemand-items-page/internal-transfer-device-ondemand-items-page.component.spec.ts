import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { ButtonActionModule, FooterModule, LayoutModule, PopupWindowService } from '@omnicell/webcorecomponents';
import { Subject, of } from 'rxjs';
import { IItemReplenishmentOnDemand } from '../../api-core/data-contracts/i-item-replenishment-ondemand';
import { CoreEventConnectionService } from '../../api-core/services/core-event-connection.service';
import { ItemLocaitonDetailsService } from '../../api-core/services/item-locaiton-details.service';
import { SimpleDialogService } from '../../shared/services/dialogs/simple-dialog.service';
import { MockAppHeaderContainer } from '../testing/mock-app-header.spec';
import { MockTranslatePipe } from '../testing/mock-translate-pipe.spec';
import { InternalTransferDeviceOndemandItemsPageComponent } from './internal-transfer-device-ondemand-items-page.component';
import { Location } from '@angular/common';
import { DeviceReplenishmentOnDemandService } from '../../api-core/services/device-replenishment-ondemand.service';
import { Component, Input } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-internal-transfer-device-ondemand-items-list',
  template: ''
})
class MockInternalTransferDeviceOndemandItemsListComponent {
  @Input()assignedItems: IItemReplenishmentOnDemand[]
}

describe('InternalTransferDeviceOndemandItemsPageComponent', () => {
  let component: InternalTransferDeviceOndemandItemsPageComponent;
  let fixture: ComponentFixture<InternalTransferDeviceOndemandItemsPageComponent>;

  let locationService: Partial<Location>;
  let popupWindowService: Partial<PopupWindowService>;
  let simpleDialogService: Partial<SimpleDialogService>;
  let getDeviceAssignedItems: jasmine.Spy;
  let get: jasmine.Spy;
  let coreEventConnectionService: Partial<CoreEventConnectionService>;
  let deviceReplenishmentOnDemandService: Partial<DeviceReplenishmentOnDemandService>;
  let itemLocaitonDetailsService: Partial<ItemLocaitonDetailsService>;

  let assignedItemsData: IItemReplenishmentOnDemand[] = [{
    ItemId: "39301", ItemFormattedGenericName: "abacavir-lamivudine 600-300 mg TABLET", ItemBrandName: 'EPZICOM',
    DeviceQuantityOnHand: 10, DeviceParLevel: 10, DeviceRestockLevel: 200, PendingDevicePickQuantity: 5,
    DisplayPackageSize: '10', DisplayNumberOfPackages: '4', DisplayDeviceQuantityOnHand: "10", DisplayQohNumberOfPackages: '10', PackSize: 5, Xr2Item: true, UnitOfIssue: 'EA',
    AvailablePharmacyLocationCount: 3, AvailablePharmacyQty: 20
  },
  {
    ItemId: "8939", ItemFormattedGenericName: "abacavir-lamivudine 600-300 mg TABLET", ItemBrandName: 'EPZICOM',
    DeviceQuantityOnHand: 10, DeviceParLevel: 10, DeviceRestockLevel: 200, PendingDevicePickQuantity: 5,
    DisplayPackageSize: '10', DisplayNumberOfPackages: '4', DisplayDeviceQuantityOnHand: "10", DisplayQohNumberOfPackages: '10', PackSize: 5, Xr2Item: true, UnitOfIssue: 'EA',
    AvailablePharmacyLocationCount: 3, AvailablePharmacyQty: 20
  },
  {
    ItemId: "5005", ItemFormattedGenericName: "abacavir-lamivudine 600-300 mg TABLET", ItemBrandName: 'EPZICOM',
    DeviceQuantityOnHand: 10, DeviceParLevel: 10, DeviceRestockLevel: 200, PendingDevicePickQuantity: 5,
    DisplayPackageSize: '10', DisplayNumberOfPackages: '4', DisplayDeviceQuantityOnHand: "10", DisplayQohNumberOfPackages: '10', PackSize: 5, Xr2Item: true, UnitOfIssue: 'EA',
    AvailablePharmacyLocationCount: 3, AvailablePharmacyQty: 20
  },
  {
    ItemId: "39301", ItemFormattedGenericName: "abacavir-lamivudine 600-300 mg TABLET", ItemBrandName: 'EPZICOM',
    DeviceQuantityOnHand: 10, DeviceParLevel: 10, DeviceRestockLevel: 200, PendingDevicePickQuantity: 5,
    DisplayPackageSize: '10', DisplayNumberOfPackages: '4', DisplayDeviceQuantityOnHand: "10", DisplayQohNumberOfPackages: '10', PackSize: 5, Xr2Item: true, UnitOfIssue: 'EA',
    AvailablePharmacyLocationCount: 3, AvailablePharmacyQty: 20
  },
  {
    ItemId: "1029", ItemFormattedGenericName: "abacavir-lamivudine 600-300 mg TABLET", ItemBrandName: 'EPZICOM',
    DeviceQuantityOnHand: 10, DeviceParLevel: 10, DeviceRestockLevel: 200, PendingDevicePickQuantity: 5,
    DisplayPackageSize: '10', DisplayNumberOfPackages: '4', DisplayDeviceQuantityOnHand: "10", DisplayQohNumberOfPackages: '10', PackSize: 5, Xr2Item: true, UnitOfIssue: 'EA',
    AvailablePharmacyLocationCount: 3, AvailablePharmacyQty: 20
  },
  {
    ItemId: "677373", ItemFormattedGenericName: "abacavir-lamivudine 600-300 mg TABLET", ItemBrandName: 'EPZICOM',
    DeviceQuantityOnHand: 10, DeviceParLevel: 10, DeviceRestockLevel: 200, PendingDevicePickQuantity: 5,
    DisplayPackageSize: '10', DisplayNumberOfPackages: '4', DisplayDeviceQuantityOnHand: "10", DisplayQohNumberOfPackages: '10', PackSize: 5, Xr2Item: true, UnitOfIssue: 'EA',
    AvailablePharmacyLocationCount: 3, AvailablePharmacyQty: 20
  },
  ];

  beforeEach(async(() => {
    locationService = { back: () => { } };
    spyOn(locationService, 'back');

    coreEventConnectionService = {
      refreshDeviceNeedsSubject: new Subject(),
    };

    simpleDialogService = {
      displayErrorOk: jasmine.createSpy('displayErrorOk'),
      displayInfoOk: jasmine.createSpy('displayInfoOk'),
    };

    getDeviceAssignedItems = jasmine.createSpy('getDeviceAssignedItems');
    deviceReplenishmentOnDemandService = {
      getDeviceAssignedItems: getDeviceAssignedItems,
      pickDeviceItemNeeds: () => of([])
    }

    get = jasmine.createSpy('get');
    itemLocaitonDetailsService = {
      get: get
    }

    TestBed.configureTestingModule({
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      declarations: [
        InternalTransferDeviceOndemandItemsPageComponent,
        MockInternalTransferDeviceOndemandItemsListComponent,
        MockAppHeaderContainer,
        MockTranslatePipe,
      ],
      imports: [
        LayoutModule,
        FooterModule,
        ButtonActionModule,
        RouterTestingModule,
        HttpClientModule
      ],
      providers: [
        { provide: Location, useValue: locationService },
        { provide: DeviceReplenishmentOnDemandService, useValue: deviceReplenishmentOnDemandService },
        { provide: TranslateService, useValue: { get: () => of('') } },
        { provide: SimpleDialogService, useValue: simpleDialogService },
        { provide: PopupWindowService, useValue: popupWindowService },
        { provide: CoreEventConnectionService, useValue: coreEventConnectionService },
        { provide: ItemLocaitonDetailsService, useValue: itemLocaitonDetailsService },
        { provide: 'env', useValue: { } },
        { provide: 'configEndpointKey', useValue: { } },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    spyOn(coreEventConnectionService.refreshDeviceNeedsSubject, "subscribe").and.callThrough();
    getDeviceAssignedItems.and.returnValue(of(assignedItemsData));
    fixture = TestBed.createComponent(InternalTransferDeviceOndemandItemsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.assignedItems$ = of(assignedItemsData);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
