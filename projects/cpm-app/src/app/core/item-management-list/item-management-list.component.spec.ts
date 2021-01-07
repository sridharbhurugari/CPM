import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemManagementListComponent } from './item-management-list.component';
import { MockGridSortCol } from '../../shared/testing/mock-grid-sort-col.spec';
import { MockColHeaderSortable } from '../../shared/testing/mock-col-header-sortable.spec';
import { MockTranslatePipe } from '../testing/mock-translate-pipe.spec';
import { MockSearchPipe } from '../testing/mock-search-pipe.spec';
import { MockAppHeaderContainer } from '../testing/mock-app-header.spec';
import { WindowService } from '../../shared/services/window-service';
import { MockSearchBox } from '../testing/mock-search-box.spec';
import { GridModule, PopupDialogService,ButtonActionModule } from '@omnicell/webcorecomponents';
import { HttpClientModule } from '@angular/common/http';
import { ItemManagementService } from '../../api-core/services/item-management.service';
import { of, Subject } from 'rxjs';
import { TableBodyService } from '../../shared/services/printing/table-body.service';
import { Xr2InventoryPdfGridReportService } from '../../shared/services/printing/xr2-inventory-pdf-grid-report-service';
import { TranslateService } from '@ngx-translate/core';
import { SimpleDialogService } from '../../shared/services/dialogs/simple-dialog.service';
import { PdfPrintService } from '../../api-core/services/pdf-print-service';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { DevicesService } from '../../api-core/services/devices.service';
import { XR2InventoryLists } from '../model/xr2-inventory-list';
import { ITableColumnDefintion } from '../../shared/services/printing/i-table-column-definition';
import { ReportConstants } from '../../shared/constants/report-constants';
import * as _ from 'lodash';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { Guid } from 'guid-typescript';

describe('ItemManagementListComponent', () => {
  let component: ItemManagementListComponent;
  let fixture: ComponentFixture<ItemManagementListComponent>;
  let wpfActionControllerService: Partial<WpfActionControllerService>;
  let simpleDialogService: Partial<SimpleDialogService>;
  let printWithBaseData: jasmine.Spy;
  let tableBody: jasmine.Spy;
  let devicesService: Partial<DevicesService>;
  const arrTestData : XR2InventoryLists[] = [{
    ItemId: "768796",FormattedGenericName: "Digoxin 0.5mg/2ml 2ml inj",TradeName: "Lanoxin",QuantityOnHand: 0,FormattedQuantityOnHand: "",DeviceLocationID: 70086,DeviceID:8,DeviceDescription: "XR2 Developer1",
    PackSize: 2,PackSizeMin: 5,PackSizeMax: 10,UnitsOfIssue: "EACH",TotalPacks: 20,FormattedPackSize: "",FormattedPackSizeMin: "",FormattedPackSizeMax: "",
    FormattedExpirationDate: "",OmniSiteID: "",ExpirationDate: "12/20/2020"},
    {
      ItemId: "8939",FormattedGenericName: "acebutolol 200mg CAPSULE",TradeName: "SECTRAL",QuantityOnHand: 0,FormattedQuantityOnHand: "",DeviceLocationID: 70086,DeviceID:8,DeviceDescription: "XR2 Developer1",
      PackSize: 2,PackSizeMin: 5,PackSizeMax: 10,UnitsOfIssue: "EACH",TotalPacks: 20,FormattedPackSize: "",FormattedPackSizeMin: "",FormattedPackSizeMax: "",
      FormattedExpirationDate: "",OmniSiteID: "",ExpirationDate: "12/20/2020"},
      {
        ItemId: "768796",FormattedGenericName: "Digoxin 0.5mg/2ml 2ml inj",TradeName: "Lanoxin",QuantityOnHand: 0,FormattedQuantityOnHand: "",DeviceLocationID: 70096,DeviceID:9,DeviceDescription: "XR2 Developer2",
        PackSize: 2,PackSizeMin: 5,PackSizeMax: 10,UnitsOfIssue: "EACH",TotalPacks: 20,FormattedPackSize: "",FormattedPackSizeMin: "",FormattedPackSizeMax: "",
        FormattedExpirationDate: "",OmniSiteID: "",ExpirationDate: "12/20/2020"},
        {
          ItemId: "8939",FormattedGenericName: "acebutolol 200mg CAPSULE",TradeName: "SECTRAL",QuantityOnHand: 0,FormattedQuantityOnHand: "",DeviceLocationID: 70096,DeviceID:9,DeviceDescription: "XR2 Developer2",
          PackSize: 2,PackSizeMin: 5,PackSizeMax: 10,UnitsOfIssue: "EACH",TotalPacks: 20,FormattedPackSize: "",FormattedPackSizeMin: "",FormattedPackSizeMax: "",
          FormattedExpirationDate: "",OmniSiteID: "",ExpirationDate: "12/20/2020"}];

  beforeEach(async(() => {
    printWithBaseData = jasmine.createSpy('printWithBaseData');
   tableBody = jasmine.createSpy('buildTableBody');;

    devicesService = {
      getAllXr2Devices: () => of([])
    };
    const pdfGridReportService: Partial<Xr2InventoryPdfGridReportService> = {
      printWithBaseData
    };
    simpleDialogService = {
      displayErrorOk: jasmine.createSpy('displayErrorOk'),
      displayInfoOk: jasmine.createSpy('displayInfoOk'),
    };
    const popupDismissedSubject = new Subject<boolean>();
    TestBed.configureTestingModule({
      declarations: [
        ItemManagementListComponent,
        MockSearchBox,
        MockAppHeaderContainer,
        MockSearchPipe,
        MockTranslatePipe,
        MockColHeaderSortable,
        MockGridSortCol
      ],
      imports: [
        GridModule,
        ButtonActionModule,
        HttpClientModule
      ],
      providers: [
        { provide: WindowService, useValue: { }} ,
        { provide: ItemManagementService, useValue: { get: () => of([]), getXR2ReportData: () => of([]) }},
        { provide: TableBodyService, useValue: { buildTableBody: () => of({}) } },
        { provide: Xr2InventoryPdfGridReportService, useValue: pdfGridReportService },
        { provide: TranslateService, useValue: { get: () => of('') } },
        { provide: SimpleDialogService, useValue: simpleDialogService },
        { provide: PdfPrintService, useValue: { getReportBaseData: () => of({}) } },
        { provide: PopupDialogService, useValue: simpleDialogService },
        { provide: DevicesService, useValue: devicesService},
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemManagementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.deviceInformationList=[{DeviceId:8,Description:"SAMPLE",DefaultOwnerName:"SAMPLE",DeviceTypeId:'2100',IsActive:true,CurrentLeaseHolder:Guid.create()},
    {DeviceId:9,Description:"SAMPLE11",DefaultOwnerName:"SAMPLE11",DeviceTypeId:'2100',IsActive:true,CurrentLeaseHolder:Guid.create()}];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('print xr2 inventory', () => {
    it('print xr2 inventory', () => {
      // Selected > 0
      component.printXR2Inventory();
   })
  });


  describe('check valid date', () => {
    it('check the valid date', () => {
      let datestring = "12/20/2020";
      // Selected > 0
      expect(component.checkValidDate(datestring)).toBeTruthy();
   })
  });

  describe('check valid date', () => {
    it('check the valid date', () => {
      let datestring = "40/40/2020";
      expect(component.checkValidDate(datestring)).toBeFalsy();
   })
  });

  describe('filter and format report data list', () => {
    it('filter and format report data list', () => {
    component.reportPickListLines$ = of(arrTestData);
    component.arrReportList = arrTestData;

    component.filterAndFormatReportList();
   })
  });

  describe('device wise print', () => {
    it('device wise print', () => {
    component.arrReportList = arrTestData;
    component.reportPickListLines$ = of(arrTestData);
    component.printDeviceReport(8);
   })
  });
  describe('print actual report', () => {
    it('print actual report', () => {
    component.arrReportList = arrTestData;
    component.reportPickListLines$ = of(arrTestData);
    var colDefinitions: ITableColumnDefintion<XR2InventoryLists>[] = [
      {
        cellPropertyNames: ["FormattedGenericName", "TradeName", "ItemId"],headerResourceKey: "ITEM", width: "60%",
      },
      {
        cellPropertyNames: ["FormattedPackSize"],headerResourceKey: "PACKSIZE",width: "4%",
      },
      {
        cellPropertyNames: ["FormattedQuantityOnHand"],headerResourceKey: "QOH",width: "10%",
      },
      {
        cellPropertyNames: ["FormattedPackSizeMin"],headerResourceKey: "PACKSIZE_MIN",width: "8%",
      },
      {
        cellPropertyNames: ["FormattedPackSizeMax"],headerResourceKey: "PACKSIZE_MAX",width: "8%",
      },
      {
        cellPropertyNames: ["FormattedExpirationDate"],headerResourceKey: "EARLIEST_EXP_DATE",width: "10%",
      },
    ];
    let sortedXR2Inv = of(
      _.orderBy(component.arrReportList, (x) => x.FormattedGenericName.toLowerCase(), "asc")
    );
    let tableBody$ = tableBody.call(colDefinitions,sortedXR2Inv,ReportConstants.Xr2InventoryReport);
     component.printTheReport(tableBody$,8);
   })
  });

});
