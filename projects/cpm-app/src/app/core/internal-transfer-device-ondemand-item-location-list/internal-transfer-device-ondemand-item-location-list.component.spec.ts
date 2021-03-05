import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { LayoutModule, FooterModule, ButtonActionModule, InputsModule, GridModule } from '@omnicell/webcorecomponents';
import { of } from 'rxjs';
import { IItemLocationDetail } from '../../api-core/data-contracts/i-item-location-detail';
import { IItemReplenishmentOnDemand } from '../../api-core/data-contracts/i-item-replenishment-ondemand';
import { MockColHeaderSortable } from '../../shared/testing/mock-col-header-sortable.spec';
import { MockGridSortCol } from '../../shared/testing/mock-grid-sort-col.spec';
import { MockAppHeaderContainer } from '../testing/mock-app-header.spec';
import { MockSearchPipe } from '../testing/mock-search-pipe.spec';
import { MockTranslatePipe } from '../testing/mock-translate-pipe.spec';

import { InternalTransferDeviceOndemandItemLocationListComponent } from './internal-transfer-device-ondemand-item-location-list.component';

fdescribe('InternalTransferDeviceOndemandItemLocationListComponent', () => {
  let component: InternalTransferDeviceOndemandItemLocationListComponent;
  let fixture: ComponentFixture<InternalTransferDeviceOndemandItemLocationListComponent>;

  let selectedItemsData: IItemReplenishmentOnDemand = {
    ItemId: "39301", ItemFormattedGenericName: "abacavir-lamivudine 600-300 mg TABLET", ItemBrandName: 'EPZICOM',
    DeviceQuantityOnHand: 10, DeviceParLevel: 10, DeviceRestockLevel: 200, PendingDevicePickQuantity: 5,
    DisplayPackageSize: 'Pack Size: 5', DisplayNumberOfPackages: '4', DisplayDeviceQuantityOnHand: "10", DisplayQohNumberOfPackages: '10', PackSize: 5, Xr2Item: true, UnitOfIssue: 'EA',
    AvailablePharmacyLocationCount: 3, AvailablePharmacyQty: 20
  };

  let itemLocationsData: IItemLocationDetail[] = [{
    ItemId: "I12345", ItemTradeName: "Item Trade Name", ItemFormattedGenericName: "Item Formatted Generic Name",
    UnitOfIssue: "EA", QuantityOnHand: 139, ExpirationDate: "", ExpirationDateGranularity: null,
    LocationDescription: "Location Description 1", DeviceLocationId: 1, DeviceId: 1234, DeviceDescription: "Device Description",
    DeviceType: "Device Type", PackageFormType: "Package Form Type", PackageFormName: "Package Form Name",
    DeviceOwnerShortName: "Device Owner Short Name", DeviceDefaultOwner: null, CarouselDisplayQuantity: 139, Description: "Description",
    Quantity: 0, DeviceLocation: null, SafetyStockIssueScan: false
  },
  {
    ItemId: "I12345", ItemTradeName: "Item Trade Name", ItemFormattedGenericName: "Item Formatted Generic Name",
    UnitOfIssue: "EA", QuantityOnHand: 119, ExpirationDate: "", ExpirationDateGranularity: null,
    LocationDescription: "Location Description 2", DeviceLocationId: 2, DeviceId: 1234, DeviceDescription: "Device Description",
    DeviceType: "Device Type", PackageFormType: "Package Form Type", PackageFormName: "Package Form Name",
    DeviceOwnerShortName: "Device Owner Short Name", DeviceDefaultOwner: null, CarouselDisplayQuantity: 139, Description: "Description",
    Quantity: 0, DeviceLocation: null, SafetyStockIssueScan: false
  }];

  let selectedLocationsData: IItemLocationDetail = {
    ItemId: "I12345", ItemTradeName: "Item Trade Name", ItemFormattedGenericName: "Item Formatted Generic Name",
    UnitOfIssue: "EA", QuantityOnHand: 139, ExpirationDate: "", ExpirationDateGranularity: null,
    LocationDescription: "Location Description 1", DeviceLocationId: 1, DeviceId: 1234, DeviceDescription: "Device Description",
    DeviceType: "Device Type", PackageFormType: "Package Form Type", PackageFormName: "Package Form Name",
    DeviceOwnerShortName: "Device Owner Short Name", DeviceDefaultOwner: null, CarouselDisplayQuantity: 139, Description: "Description",
    Quantity: 0, DeviceLocation: null, SafetyStockIssueScan: false
  };

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ InternalTransferDeviceOndemandItemLocationListComponent,
        MockTranslatePipe,
        MockAppHeaderContainer,
        MockSearchPipe,
        MockColHeaderSortable,
        MockAppHeaderContainer,
        MockGridSortCol,
       ],
      imports: [
        LayoutModule,
        FooterModule,
        ButtonActionModule,
        InputsModule,
        FormsModule,
        GridModule
      ],
      providers: [
        { provide: TranslateService, useValue: { get: () => of('') } },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalTransferDeviceOndemandItemLocationListComponent);
    component = fixture.componentInstance;
    component.item = selectedItemsData;
    component.itemLocations = itemLocationsData;
    fixture.detectChanges();
    spyOn(component.isSelected, 'emit');
    spyOn(component.selectedItem, 'emit');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('given the selected location is clicked and does not have the quantiy to fill at least 1 pack size', () => {
    describe('locationSelected', () => {
      beforeEach(() => {
        selectedLocationsData.QuantityOnHand = 1;
        component.locationSelected(selectedLocationsData);
      });

      it('isSelected and selectedItem should not emit', () => {
        expect(component.isSelected.emit).not.toHaveBeenCalledWith(true);
        expect(component.selectedItem.emit).not.toHaveBeenCalledWith(selectedLocationsData);
      });
      selectedLocationsData.QuantityOnHand = 139;
    });
  });

  describe('given a location is selected with no previous selected location', () => {
    describe('locationSelected', () => {
      beforeEach(() => {
        component.locationSelected(selectedLocationsData);
      });

      it('selectedItemLocation.DeviceLocationId should be equal to the clicked locations DeviceLocationId', () => {
        expect(component.selectedItemLocation.DeviceLocationId).toEqual(selectedLocationsData.DeviceLocationId);
      });

      it('selectedItemLocation.Quantity should be equal 1', () => {
        expect(component.selectedItemLocation.Quantity).toEqual(1);
      });

      it('isSelected should emit with true', () => {
        expect(component.isSelected.emit).toHaveBeenCalledWith(true);
      });

      it('selectedItem should emit with the clicked location', () => {
        expect(component.selectedItem.emit).toHaveBeenCalledWith(selectedLocationsData);
      });
    });
  });

  describe('given the currently selected location is clicked', () => {
    describe('locationSelected', () => {
      beforeEach(() => {
        component.selectedItemLocation = selectedLocationsData;
        component.locationSelected(selectedLocationsData);
      });

      it('isSelected and selectedItem should not emit', () => {
        expect(component.isSelected.emit).not.toHaveBeenCalledWith(true);
        expect(component.selectedItem.emit).not.toHaveBeenCalledWith(selectedLocationsData);
      });
    });
  });

  describe('given the currently selected location sets the quantity to 0', () => {
    describe('pickQtyChanged', () => {
      beforeEach(() => {
        component.selectedItemLocation = selectedLocationsData;
        selectedLocationsData.Quantity = 0;
        component.pickQtyChanged(selectedLocationsData);
      });

      it('isSelected and selectedItem should not emit', () => {
        expect(component.isSelected.emit).toHaveBeenCalledWith(false);
        expect(component.selectedItem.emit).toHaveBeenCalledWith(selectedLocationsData);
      });

      selectedLocationsData.Quantity = 1;
    });
  });

  describe('given the current selected location sets the quantity > 0', () => {
    describe('pickQtyChanged', () => {
      beforeEach(() => {
        component.selectedItemLocation = selectedLocationsData;
        selectedLocationsData.Quantity = 2;
        component.pickQtyChanged(selectedLocationsData);
      });

      it('isSelected and selectedItem should not emit', () => {
        expect(component.isSelected.emit).toHaveBeenCalledWith(true);
        expect(component.selectedItem.emit).toHaveBeenCalledWith(selectedLocationsData);
      });

      selectedLocationsData.Quantity = 1;
    });
  });
});
