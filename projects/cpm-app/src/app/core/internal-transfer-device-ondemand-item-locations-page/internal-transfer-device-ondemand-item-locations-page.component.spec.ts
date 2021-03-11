import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { ButtonActionModule, FooterModule, LayoutModule  } from '@omnicell/webcorecomponents';
import { of, Subject } from 'rxjs';
import { IItemLocationDetail } from '../../api-core/data-contracts/i-item-location-detail';
import { IItemReplenishmentOnDemand } from '../../api-core/data-contracts/i-item-replenishment-ondemand';
import { MockTranslatePipe } from '../testing/mock-translate-pipe.spec';
import { Location } from '@angular/common';
import { InternalTransferDeviceOndemandItemLocationsPageComponent } from './internal-transfer-device-ondemand-item-locations-page.component';
import { SimpleDialogService } from '../../shared/services/dialogs/simple-dialog.service';
import { ItemLocaitonDetailsService } from '../../api-core/services/item-locaiton-details.service';
import { DeviceReplenishmentNeedsService } from '../../api-core/services/device-replenishment-needs.service';
import { DevicesService } from '../../api-core/services/devices.service';
import { ActivatedRoute } from '@angular/router';
import { CoreEventConnectionService } from '../../api-core/services/core-event-connection.service';
@Component({
  selector: 'app-internal-transfer-device-ondemand-item-location-list',
  template: ''
})
class MockInternalTransferItemsListComponent {
  @Input()itemLocations: IItemLocationDetail[]
  @Input()item: IItemReplenishmentOnDemand;
}

describe('InternalTransferDeviceOndemandItemLocationsPageComponent', () => {
  let component: InternalTransferDeviceOndemandItemLocationsPageComponent;
  let fixture: ComponentFixture<InternalTransferDeviceOndemandItemLocationsPageComponent>;
  let locationService: Partial<Location>;
  let simpleDialogService: Partial<SimpleDialogService>;
  let coreEventConnectionService: Partial<CoreEventConnectionService>;
  let deviceReplenishmentNeedsService: Partial<DeviceReplenishmentNeedsService>;
  let itemLocaitonDetailsService: Partial<ItemLocaitonDetailsService>;

  let assignedItemsData: IItemReplenishmentOnDemand[] = [{
    ItemId: "39301", ItemFormattedGenericName: "abacavir-lamivudine 600-300 mg TABLET", ItemBrandName: 'EPZICOM',
    DeviceQuantityOnHand: 10, DeviceParLevel: 10, DeviceRestockLevel: 200, PendingDevicePickQuantity: 5,
    DisplayPackageSize: '10', DisplayNumberOfPackages: '4', DisplayDeviceQuantityOnHand: "10", DisplayQohNumberOfPackages: '10', PackSize: 5, Xr2Item: true, UnitOfIssue: 'EA',
    AvailablePharmacyLocationCount: 3, AvailablePharmacyQty: 20
  },]

  let selectedLocationsData: IItemLocationDetail = {
    ItemId: "I12345", ItemTradeName: "Item Trade Name", ItemFormattedGenericName: "Item Formatted Generic Name",
    UnitOfIssue: "EA", QuantityOnHand: 139, ExpirationDate: "", ExpirationDateGranularity: null,
    LocationDescription: "Location Description 1", DeviceLocationId: 1, DeviceId: 1234, DeviceDescription: "Device Description",
    DeviceType: "Device Type", PackageFormType: "Package Form Type", PackageFormName: "Package Form Name",
    DeviceOwnerShortName: "Device Owner Short Name", DeviceDefaultOwner: null, CarouselDisplayQuantity: 139, Description: "Description",
    Quantity: 2, DeviceLocation: null, SafetyStockIssueScan: false
  };

  beforeEach(async(() => {
    locationService = { back: () => { } };
    spyOn(locationService, 'back');

    simpleDialogService = {
      displayErrorOk: jasmine.createSpy('displayErrorOk'),
      displayInfoOk: jasmine.createSpy('displayInfoOk'),
    };

    coreEventConnectionService = {
      refreshDeviceOnDemandSubject: new Subject(),
    };

    deviceReplenishmentNeedsService = {
      pickDeviceItemNeeds: () => of(),
      getDeviceAssignedItems: () => of(assignedItemsData)
    };

    itemLocaitonDetailsService = {
      get: () => of([]),
      getInternalTransfer: () => of([selectedLocationsData])
    };
    spyOn(deviceReplenishmentNeedsService, 'pickDeviceItemNeeds');

    TestBed.configureTestingModule({
      declarations: [
        InternalTransferDeviceOndemandItemLocationsPageComponent,
        MockInternalTransferItemsListComponent,
        MockTranslatePipe
       ],
      imports: [
        LayoutModule,
        FooterModule,
        ButtonActionModule,
      ],
      providers: [
        { provide: Location, useValue: locationService },
        { provide: SimpleDialogService, useValue: simpleDialogService },
        { provide: ItemLocaitonDetailsService, useValue: itemLocaitonDetailsService },
        { provide: DeviceReplenishmentNeedsService, useValue: deviceReplenishmentNeedsService},
        { provide: DevicesService, useValue: { get: () => of([]) }},
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap : { get: () => '' } } } },
        { provide: CoreEventConnectionService, useValue: coreEventConnectionService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalTransferDeviceOndemandItemLocationsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('given the back button is clicked', () => {
    describe('goBack', () => {
      beforeEach(() => {
        component.goBack();
      });

      it('should call wpfActionControllerService.back', () => {
        expect(locationService.back).toHaveBeenCalled();
      });
    });
  });

  describe('given a valid location was just selected', () => {
    describe('onItemSelected - true', () => {
      beforeEach(() => {
        component.onItemSelected(true);
      });

      it('should set requestStatus to selected', () => {
        expect(component.requestStatus).toEqual('selected');
      });
    });
  });

  describe('given an invalid location was just selected', () => {
    describe('onItemSelected - false', () => {
      beforeEach(() => {
        component.onItemSelected(false);
      });

      it('should set requestStatus to selected', () => {
        expect(component.requestStatus).toEqual('none');
      });
    });
  });

  describe('given an invalid location was just selected', () => {
    describe('onSelectedItem', () => {
      beforeEach(() => {
        component.onSelectedItem(selectedLocationsData);
      });

      it('should set requestStatus to none', () => {
        expect(component.itemsToPick.length).toEqual(1);
        expect(component.selectedSource).toEqual(selectedLocationsData.DeviceLocationId);
        expect(component.requestedAmount).toEqual(selectedLocationsData.Quantity * component.selecetdPackSize);
      });
    });
  });
});
