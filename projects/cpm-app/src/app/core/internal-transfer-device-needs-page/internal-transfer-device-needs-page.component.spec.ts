import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalTransferDeviceNeedsPageComponent } from './internal-transfer-device-needs-page.component';
import { MockAppHeaderContainer } from '../testing/mock-app-header.spec';
import { MockTranslatePipe } from '../testing/mock-translate-pipe.spec';
import { ButtonActionModule, FooterModule, LayoutModule } from '@omnicell/webcorecomponents';
import { ActivatedRoute } from '@angular/router';
import { DevicesService } from '../../api-core/services/devices.service';
import { of, Subject } from 'rxjs';
import { DeviceReplenishmentNeedsService } from '../../api-core/services/device-replenishment-needs.service';
import { Input, Component } from '@angular/core';
import { Location } from '@angular/common';
import { IItemReplenishmentNeed } from '../../api-core/data-contracts/i-item-replenishment-need';
import { PdfGridReportService } from '../../shared/services/printing/pdf-grid-report-service';
import { TableBodyService } from '../../shared/services/printing/table-body.service';
import { TranslateService } from '@ngx-translate/core';
import { SimpleDialogService } from '../../shared/services/dialogs/simple-dialog.service';
import { PdfPrintService } from '../../api-core/services/pdf-print-service';
import { CoreEventConnectionService } from "../../api-core/services/core-event-connection.service";

@Component({
  selector: 'app-internal-transfer-items-list',
  template: ''
})
class MockInternalTransferItemsListComponent {
  @Input()itemNeeds: IItemReplenishmentNeed[]
}

describe('InternalTransferDeviceNeedsPageComponent', () => {
  let component: InternalTransferDeviceNeedsPageComponent;
  let fixture: ComponentFixture<InternalTransferDeviceNeedsPageComponent>;
  let locationService: Partial<Location>;
  let simpleDialogService: Partial<SimpleDialogService>;
  let printWithBaseData: jasmine.Spy;
  let getDeviceItemNeeds: jasmine.Spy;
  let coreEventConnectionService: Partial<CoreEventConnectionService>;
  let deviceReplenishmentNeedsService: Partial<DeviceReplenishmentNeedsService>;

  let deviceNeedData: IItemReplenishmentNeed[] = [{
      ItemId: "39301", ItemFormattedGenericName: "abacavir-lamivudine 600-300 mg TABLET", ItemBrandName: 'EPZICOM',
      DeviceQuantityOnHand: 10, DeviceQuantityNeeded: 5, DeviceParLevel: 10, DeviceRestockLevel: 200, PendingDevicePickQuantity: 5,
      DisplayPackageSize: '10', DisplayNumberOfPackages: '4', DisplayDeviceQuantityNeeded: "20", DisplayDeviceQuantityOnHand: "10", DisplayQohNumberOfPackages: '10', PackSize: 5, Xr2Item: true, UnitOfIssue: 'EA',
      PickLocationDeviceLocationId: 10, PickLocationDescription: 'Patient', PickLocationQoh: 20,
      ItemFormattedDescription: 'abacavir-lamivudine', ItemBrandNameDescription: 'EPZICOM', ItemIdDescription: '39301',
      SortFormattedName: 'abacavir-lamivudine 600-300 mg TABLET', DestinationDeviceDescription: 'XR2'
    },
    {
      ItemId: "8939", ItemFormattedGenericName: "abacavir-lamivudine 600-300 mg TABLET", ItemBrandName: 'EPZICOM',
      DeviceQuantityOnHand: 10, DeviceQuantityNeeded: 5, DeviceParLevel: 10, DeviceRestockLevel: 200, PendingDevicePickQuantity: 5,
      DisplayPackageSize: '10', DisplayNumberOfPackages: '4', DisplayDeviceQuantityNeeded: "20", DisplayDeviceQuantityOnHand: "10", DisplayQohNumberOfPackages: '10', PackSize: 5, Xr2Item: true, UnitOfIssue: 'EA',
      PickLocationDeviceLocationId: 10, PickLocationDescription: 'Patient', PickLocationQoh: 20,
      ItemFormattedDescription: 'abacavir-lamivudine', ItemBrandNameDescription: 'EPZICOM', ItemIdDescription: '39301',
      SortFormattedName: 'abacavir-lamivudine 600-300 mg TABLET', DestinationDeviceDescription: 'XR2'
    },
    {
      ItemId: "5005", ItemFormattedGenericName: "abacavir-lamivudine 600-300 mg TABLET", ItemBrandName: 'EPZICOM',
      DeviceQuantityOnHand: 10, DeviceQuantityNeeded: 5, DeviceParLevel: 10, DeviceRestockLevel: 200, PendingDevicePickQuantity: 5,
      DisplayPackageSize: '10', DisplayNumberOfPackages: '4', DisplayDeviceQuantityNeeded: "20", DisplayDeviceQuantityOnHand: "10", DisplayQohNumberOfPackages: '10', PackSize: 5, Xr2Item: true, UnitOfIssue: 'EA',
      PickLocationDeviceLocationId: 10, PickLocationDescription: 'Patient', PickLocationQoh: 20,
      ItemFormattedDescription: 'abacavir-lamivudine', ItemBrandNameDescription: 'EPZICOM', ItemIdDescription: '39301',
      SortFormattedName: 'abacavir-lamivudine 600-300 mg TABLET', DestinationDeviceDescription: 'XR2'
    },
    {
      ItemId: "39301", ItemFormattedGenericName: "abacavir-lamivudine 600-300 mg TABLET", ItemBrandName: 'EPZICOM',
      DeviceQuantityOnHand: 10, DeviceQuantityNeeded: 5, DeviceParLevel: 10, DeviceRestockLevel: 200, PendingDevicePickQuantity: 5,
      DisplayPackageSize: '10', DisplayNumberOfPackages: '4', DisplayDeviceQuantityNeeded: "20", DisplayDeviceQuantityOnHand: "10", DisplayQohNumberOfPackages: '10', PackSize: 5, Xr2Item: true, UnitOfIssue: 'EA',
      PickLocationDeviceLocationId: 10, PickLocationDescription: 'Patient', PickLocationQoh: 20,
      ItemFormattedDescription: 'abacavir-lamivudine', ItemBrandNameDescription: 'EPZICOM', ItemIdDescription: '39301',
      SortFormattedName: 'abacavir-lamivudine 600-300 mg TABLET', DestinationDeviceDescription: 'XR2'
    },
    {
      ItemId: "1029", ItemFormattedGenericName: "abacavir-lamivudine 600-300 mg TABLET", ItemBrandName: 'EPZICOM',
      DeviceQuantityOnHand: 10, DeviceQuantityNeeded: 5, DeviceParLevel: 10, DeviceRestockLevel: 200, PendingDevicePickQuantity: 5,
      DisplayPackageSize: '10', DisplayNumberOfPackages: '4', DisplayDeviceQuantityNeeded: "20", DisplayDeviceQuantityOnHand: "10", DisplayQohNumberOfPackages: '10', PackSize: 5, Xr2Item: true, UnitOfIssue: 'EA',
      PickLocationDeviceLocationId: 10, PickLocationDescription: 'Patient', PickLocationQoh: 20,
      ItemFormattedDescription: 'abacavir-lamivudine', ItemBrandNameDescription: 'EPZICOM', ItemIdDescription: '39301',
      SortFormattedName: 'abacavir-lamivudine 600-300 mg TABLET', DestinationDeviceDescription: 'XR2'
    },
    {
      ItemId: "677373", ItemFormattedGenericName: "abacavir-lamivudine 600-300 mg TABLET", ItemBrandName: 'EPZICOM',
      DeviceQuantityOnHand: 10, DeviceQuantityNeeded: 5, DeviceParLevel: 10, DeviceRestockLevel: 200, PendingDevicePickQuantity: 5,
      DisplayPackageSize: '10', DisplayNumberOfPackages: '4', DisplayDeviceQuantityNeeded: "20", DisplayDeviceQuantityOnHand: "10", DisplayQohNumberOfPackages: '10', PackSize: 5, Xr2Item: true, UnitOfIssue: 'EA',
      PickLocationDeviceLocationId: 10, PickLocationDescription: 'Patient', PickLocationQoh: 20,
      ItemFormattedDescription: 'abacavir-lamivudine', ItemBrandNameDescription: 'EPZICOM', ItemIdDescription: '39301',
      SortFormattedName: 'abacavir-lamivudine 600-300 mg TABLET', DestinationDeviceDescription: 'XR2'
    },
  ];

  const needs = [
      {
        Xr2Item: true
      }
  ];

  beforeEach(async(() => {
    locationService = { back: () => { } };
    spyOn(locationService, 'back');
    printWithBaseData = jasmine.createSpy('printWithBaseData');
    let pdfGridReportService: Partial<PdfGridReportService> = {
      printWithBaseData: printWithBaseData
    };
    coreEventConnectionService = {
      refreshDeviceNeedsSubject: new Subject(),
    };


    simpleDialogService = {
      displayErrorOk: jasmine.createSpy('displayErrorOk'),
      displayInfoOk: jasmine.createSpy('displayInfoOk'),
    };

    getDeviceItemNeeds = jasmine.createSpy('getDeviceItemNeeds');
    deviceReplenishmentNeedsService = {
      getDeviceItemNeeds: getDeviceItemNeeds,
      pickDeviceItemNeeds: () => of([])
    }

    TestBed.configureTestingModule({
      declarations: [
        InternalTransferDeviceNeedsPageComponent,
        MockInternalTransferItemsListComponent,
        MockAppHeaderContainer,
        MockTranslatePipe,
      ],
      imports: [
        LayoutModule,
        FooterModule,
        ButtonActionModule,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap : { get: () => '8' } } } },
        { provide: Location, useValue: locationService },
        { provide: DevicesService, useValue: { get: () => of([]) } },
        { provide: DeviceReplenishmentNeedsService, useValue: deviceReplenishmentNeedsService },
        { provide: TableBodyService, useValue: { buildTableBody: () => of({}) } },
        { provide: PdfGridReportService, useValue: pdfGridReportService },
        { provide: TranslateService, useValue: { get: () => of('') } },
        { provide: SimpleDialogService, useValue: simpleDialogService },
        { provide: PdfPrintService, useValue: { getReportBaseData: () => of({}) } },
        { provide: CoreEventConnectionService, useValue: coreEventConnectionService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    spyOn(coreEventConnectionService.refreshDeviceNeedsSubject, 'subscribe').and.callThrough();
    getDeviceItemNeeds.and.returnValue(of(needs));
    fixture = TestBed.createComponent(InternalTransferDeviceNeedsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.itemNeeds$ = of(deviceNeedData);
    component.reportItemNeeds$ = component.itemNeeds$;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Connect to Events', () => {
    it('Connects to events on creation', () => {
      expect(component).toBeTruthy();
      expect(coreEventConnectionService.refreshDeviceNeedsSubject.subscribe).toHaveBeenCalled();
    });
  });

  describe('goBack', () => {
    it('should call wpfActionControllerService.back', () => {
      component.goBack();
      expect(locationService.back).toHaveBeenCalled();
    });
  });

  describe('print', () => {
    describe('succeeded', () => {
      it('should display info dialog', () => {
        printWithBaseData.and.returnValue(of(true));
        component.print();
        expect(simpleDialogService.displayInfoOk).toHaveBeenCalled();
      });
    });
    describe('failed', () => {
      it('should display error dialog', () => {
        printWithBaseData.and.returnValue(of(false));
        component.print();
        expect(simpleDialogService.displayErrorOk).toHaveBeenCalled();
      });
    });
  });

  describe('pick', () => {
    describe('succeeded', () => {
      it('should display info dialog', () => {
        component.itemsToPick.push({
          ItemBrandName: 'Brand Name',
          ItemFormattedGenericName: ' Generic Name',
          ItemId: 'MED01234',
          DeviceParLevel: 8000,
          DeviceQuantityNeeded: 1200,
          DeviceQuantityOnHand: 0,
          DeviceRestockLevel: 1200,
          Xr2Item: true,
          DisplayDeviceQuantityNeeded: '1220 EA',
          DisplayDeviceQuantityOnHand: '0 EA',
          DisplayNumberOfPackages: 'Packs: 1, 5, 10',
          DisplayPackageSize: 'Package Size: 1, 5, 10',
          DisplayQohNumberOfPackages: 'Packs: 0, 0, 0',
          PackSize: 1,
          PendingDevicePickQuantity: 0,
          UnitOfIssue: 'EA',
          PickLocationDeviceLocationId: 123455,
          PickLocationDescription: 'Pick Location Description',
          PickLocationQoh: 950,
          ItemFormattedDescription: 'Item Formatted Description',
          ItemBrandNameDescription: 'Item Brand Name Description',
          ItemIdDescription: 'Item Id Description',
          SortFormattedName: 'Sort Formatted Name',
          DestinationDeviceDescription: 'a device',
        });
        component.pick();
        expect(simpleDialogService.displayInfoOk).toHaveBeenCalled();
      });
    });
    describe('failed', () => {
      it('should display error dialog', () => {
        component.itemsToPick = new Array();
        component.pick();
        expect(simpleDialogService.displayErrorOk).toHaveBeenCalled();
      });
    });
  });

  describe('Refresh Device Needs', () => {
    it('should reload data',
      () => {
        coreEventConnectionService.refreshDeviceNeedsSubject.next();
        expect(deviceReplenishmentNeedsService.getDeviceItemNeeds).toHaveBeenCalled();
      });
  });
});
