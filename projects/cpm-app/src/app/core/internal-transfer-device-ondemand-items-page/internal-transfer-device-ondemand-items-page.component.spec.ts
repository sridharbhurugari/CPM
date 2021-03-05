import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { ButtonActionModule, FooterModule, LayoutModule, PopupDialogService, PopupDialogType, PopupWindowService } from '@omnicell/webcorecomponents';
import { Subject, of } from 'rxjs';
import { IItemReplenishmentOnDemand } from '../../api-core/data-contracts/i-item-replenishment-ondemand';
import { CoreEventConnectionService } from '../../api-core/services/core-event-connection.service';
import { ItemLocaitonDetailsService } from '../../api-core/services/item-locaiton-details.service';
import { MockAppHeaderContainer } from '../testing/mock-app-header.spec';
import { MockTranslatePipe } from '../testing/mock-translate-pipe.spec';
import { InternalTransferDeviceOndemandItemsPageComponent } from './internal-transfer-device-ondemand-items-page.component';
import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DevicesService } from '../../api-core/services/devices.service';
import { ConfirmPopupComponent } from '../../shared/components/confirm-popup/confirm-popup.component';
import { IItemLocationDetail } from '../../api-core/data-contracts/i-item-location-detail';
import { DeviceReplenishmentNeedsService } from '../../api-core/services/device-replenishment-needs.service';
import { IDevice } from '../../api-core/data-contracts/i-device';

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
  let popupDismissedSubject = new Subject<boolean>();

  let locationService: Partial<Location>;
  let popupWindowService: Partial<PopupWindowService> = {
    show: jasmine.createSpy('show'),
  };
  let getDeviceAssignedItems: jasmine.Spy;
  let get: jasmine.Spy;
  let coreEventConnectionService: Partial<CoreEventConnectionService>;
  let deviceReplenishmentNeedsService: Partial<DeviceReplenishmentNeedsService>;
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
    AvailablePharmacyLocationCount: 0, AvailablePharmacyQty: 20
  },
  ];

  let deviceData: IDevice[] = [{
    Id: 999,
    Description: "Descritpion",
    DeviceType: "Device Type",
    OutputDevices: []
  }];


  beforeEach(async(() => {
    locationService = { back: () => { } };
    spyOn(locationService, 'back');

    const popupResult: Partial<ConfirmPopupComponent> = { dismiss: popupDismissedSubject };
    popupWindowService = {
      show: jasmine.createSpy('show').and.callFake((x, y) => {
        if (y.data.requestedQuantity == 0) {
          y.data.requestedQuantity = 2;
        }

        return popupResult;
      }),
    };

    coreEventConnectionService = {
      refreshDeviceOnDemandSubject: new Subject(),
    };

    getDeviceAssignedItems = jasmine.createSpy('getDeviceAssignedItems');
    deviceReplenishmentNeedsService = {
      getDeviceAssignedItems: getDeviceAssignedItems,
      pickDeviceItemNeeds: jasmine.createSpy('pickDeviceItemNeeds').and.returnValue(of()),
    }

    let locationSource: Partial<IItemLocationDetail> = {
      ItemId: "39301",
      DeviceId: 999,
      DeviceType: "2020",
      DeviceDescription: "source",
      DeviceLocationId: 32892,
      QuantityOnHand: 500,
    };
    get = jasmine.createSpy('get').and.returnValue(of([ locationSource ]));
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
        { provide: DeviceReplenishmentNeedsService, useValue: deviceReplenishmentNeedsService },
        { provide: TranslateService, useValue: { get: () => of('') } },
        { provide: CoreEventConnectionService, useValue: coreEventConnectionService },
        { provide: ItemLocaitonDetailsService, useValue: itemLocaitonDetailsService },
        { provide: DevicesService, useValue: { get: () => of(deviceData) } },
        { provide: PopupDialogService, useValue: popupWindowService },
        { provide: 'env', useValue: { } },
        { provide: 'configEndpointKey', useValue: { } },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    spyOn(coreEventConnectionService.refreshDeviceOnDemandSubject, "subscribe").and.callThrough();
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
