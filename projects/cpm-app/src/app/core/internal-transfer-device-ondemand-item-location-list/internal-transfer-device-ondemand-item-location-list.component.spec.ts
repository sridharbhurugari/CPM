import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { LayoutModule, FooterModule, ButtonActionModule } from '@omnicell/webcorecomponents';
import { of } from 'rxjs';
import { IItemLocationDetail } from '../../api-core/data-contracts/i-item-location-detail';
import { IItemReplenishmentOnDemand } from '../../api-core/data-contracts/i-item-replenishment-ondemand';
import { MockColHeaderSortable } from '../../shared/testing/mock-col-header-sortable.spec';
import { MockGridSortCol } from '../../shared/testing/mock-grid-sort-col.spec';
import { MockAppHeaderContainer } from '../testing/mock-app-header.spec';
import { MockSearchBox } from '../testing/mock-search-box.spec';
import { MockSearchPipe } from '../testing/mock-search-pipe.spec';
import { MockTranslatePipe } from '../testing/mock-translate-pipe.spec';

import { InternalTransferDeviceOndemandItemLocationListComponent } from './internal-transfer-device-ondemand-item-location-list.component';

fdescribe('InternalTransferDeviceOndemandItemLocationListComponent', () => {
  let component: InternalTransferDeviceOndemandItemLocationListComponent;
  let fixture: ComponentFixture<InternalTransferDeviceOndemandItemLocationListComponent>;

  let selectedItemsData: IItemReplenishmentOnDemand = {
    ItemId: "39301", ItemFormattedGenericName: "abacavir-lamivudine 600-300 mg TABLET", ItemBrandName: 'EPZICOM',
    DeviceQuantityOnHand: 10, DeviceParLevel: 10, DeviceRestockLevel: 200, PendingDevicePickQuantity: 5,
    DisplayPackageSize: '10', DisplayNumberOfPackages: '4', DisplayDeviceQuantityOnHand: "10", DisplayQohNumberOfPackages: '10', PackSize: 5, Xr2Item: true, UnitOfIssue: 'EA',
    AvailablePharmacyLocationCount: 3, AvailablePharmacyQty: 20
  };

  let itemLocationsData: IItemLocationDetail[] = [{
    ItemId: "I12345", ItemTradeName: "Item Trade Name", ItemFormattedGenericName: "Item Formatted Generic Name",
    UnitOfIssue: "EA", QuantityOnHand: 139, ExpirationDate: "", ExpirationDateGranularity: null,
    LocationDescription: "Location Description", DeviceLocationId: 123456, DeviceId: 1234, DeviceDescription: "Device Description",
    DeviceType: "Device Type", PackageFormType: "Package Form Type", PackageFormName: "Package Form Name",
    DeviceOwnerShortName: "Device Owner Short Name", DeviceDefaultOwner: null, CarouselDisplayQuantity: 139, Description: "Description",
    Quantity: 0, DeviceLocation: null, SafetyStockIssueScan: false
  }];

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ InternalTransferDeviceOndemandItemLocationListComponent,
        MockTranslatePipe,
        MockAppHeaderContainer,
        MockSearchBox,
        MockSearchPipe,
        MockColHeaderSortable,
        MockAppHeaderContainer,
        MockGridSortCol,
       ],
      imports: [
        LayoutModule,
        FooterModule,
        ButtonActionModule,
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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
