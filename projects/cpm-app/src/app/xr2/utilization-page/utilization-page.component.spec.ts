import {
  Injector,
  NO_ERRORS_SCHEMA,
} from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Observable, of, Subject } from "rxjs";
import { UtilizationService } from "../../api-xr2/services/utilization.service";
import { UtilizationEventConnectionService } from "../services/utilization-event-connection.service";
import { UtilizationDataEvent } from "../model/utilization-data-event";
import { TranslateService } from "@ngx-translate/core";
import {
  ProgressAnimationComponent,
  FooterModule,
  ButtonActionModule,
} from "@omnicell/webcorecomponents";
import { MockUtilizationHeaderComponent } from "../../shared/testing/mock-utilization-header-component.spec";
import { MockTranslatePipe } from "../../core/testing/mock-translate-pipe.spec";
import { UtilizationPageComponent } from "./utilization-page.component";
import { WindowService } from "../../shared/services/window-service";
import { WpfInteropService } from "../../shared/services/wpf-interop.service";
import { UnassignedMedicationInfo } from "../model/utilization-unassigned-medication-info";
import { ExpiringMedicationInfo } from "../model/utilization-expiring-medication-info";
import { ErroredMedicationInfo } from "../model/utilization-errored-medication-info";
import { EventEventId } from "../../shared/constants/event-event-id";
import { Xr2StorageCapacityDisplay } from "../model/xr2-storage-capacity-display";
import { Router } from "@angular/router";
import { BaseRouteReuseStrategy } from "../../core/base-route-reuse-strategy/base-route-reuse-strategy";
import { GridModule, PopupDialogService} from '@omnicell/webcorecomponents';
import { HttpClientModule } from '@angular/common/http';
import { TableBodyService } from '../../shared/services/printing/table-body.service';
import { Xr2InventoryPdfGridReportService } from '../../shared/services/printing/xr2-inventory-pdf-grid-report-service';
import { SimpleDialogService } from '../../shared/services/dialogs/simple-dialog.service';
import { PdfPrintService } from '../../api-core/services/pdf-print-service';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { DevicesService } from '../../api-core/services/devices.service';
import { ITableColumnDefintion } from '../../shared/services/printing/i-table-column-definition';
import { ReportConstants } from '../../shared/constants/report-constants';
import * as _ from 'lodash';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { Guid } from 'guid-typescript';
import { XR2InventoryLists } from "../../core/model/xr2-inventory-list";

describe("UtilizationPageComponent", () => {
  let component: UtilizationPageComponent;
  let fixture: ComponentFixture<UtilizationPageComponent>;
  let translateService: Partial<TranslateService>;
  let utilizationService: Partial<UtilizationService>;
  let utilizationEventConnectionService: Partial<UtilizationEventConnectionService>;
  let router: Partial<Router>;
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
  let i: Injector = {
    get(service: any) {
      return null;
    },
  };
  let baseRouteReuseStrategy: BaseRouteReuseStrategy =
    new BaseRouteReuseStrategy(i);

  beforeEach(async(() => {
    printWithBaseData = jasmine.createSpy('printWithBaseData');
    tableBody = jasmine.createSpy('buildTableBody');;
    devicesService = { getAllXr2Devices: () => of([]) };

    const pdfGridReportService: Partial<Xr2InventoryPdfGridReportService> = {
       printWithBaseData
     };

     utilizationService = {
      get: jasmine.createSpy("get").and.returnValue(of(UtilizationService)),
      getXR2ReportData: jasmine.createSpy("getXR2ReportData").and.returnValue(of([])) };

     simpleDialogService = {
       displayErrorOk: jasmine.createSpy('displayErrorOk'),
       displayInfoOk: jasmine.createSpy('displayInfoOk'),
     };

     const popupDismissedSubject = new Subject<boolean>();

    utilizationEventConnectionService = {
      UtilizationIncomingDataSubject: new Subject<UtilizationDataEvent>(),
      UtilizationIncomingDataErrorSubject: new Subject<any>(),
      Xr2StorageCapacityDisplayEventSubject: new Subject<
        Xr2StorageCapacityDisplay[]
      >(),
      ngUnsubscribe: new Subject(),
    };

    TestBed.configureTestingModule({
      declarations: [
        UtilizationPageComponent,
        MockUtilizationHeaderComponent,
        ProgressAnimationComponent,
        MockTranslatePipe,
      ],
      imports: [ButtonActionModule, FooterModule, HttpClientModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: Router, useValue: { navigate: jasmine.createSpy("navigate"), routeReuseStrategy: baseRouteReuseStrategy} },
        { provide: UtilizationEventConnectionService, useValue: utilizationEventConnectionService },
        { provide: WpfInteropService, useValue: { wpfViewModelActivated: new Subject() } },
        { provide: WindowService, useValue: { getHash: () => "" } },
        { provide: UtilizationService, useValue: utilizationService},
        { provide: TableBodyService, useValue: { buildTableBody: () => of({}) } },
        { provide: Xr2InventoryPdfGridReportService, useValue: pdfGridReportService },
        { provide: SimpleDialogService, useValue: simpleDialogService },
        { provide: TranslateService, useValue: { get: () => of('') } },
        { provide: PdfPrintService, useValue: { getReportBaseData: () => of({}) } },
        { provide: PopupDialogService, useValue: simpleDialogService },
        { provide: DevicesService, useValue: devicesService},
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilizationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.get(Router);
    component.deviceInformationList=[{DeviceId:8,Description:"SAMPLE",DefaultOwnerName:"SAMPLE",DeviceTypeId:'2100',IsActive:true,CurrentLeaseHolder:Guid.create()},
    {DeviceId:9,Description:"SAMPLE11",DefaultOwnerName:"SAMPLE11",DeviceTypeId:'2100',IsActive:true,CurrentLeaseHolder:Guid.create()}];
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("onDataReceived NotAssigned", () => {
    beforeEach(() => {
      component.notAssignedItems = 0;
      component.notAssignedDoses = 0;
      component.notAssignedLoaded = false;
      component.selectedDeviceInformation.DeviceId = 4;
    });

    it("Check when empty", () => {
      let data: UnassignedMedicationInfo[];
      component.notAssignedData = data;
      let event: UtilizationDataEvent = {
        EventId: EventEventId.UnassignedMedsReceived,
        DeviceId: 4,
        EventDateTime: new Date(),
        UtilizationData: data,
      };
      component.onDataReceived(event);

      expect(component.notAssignedItems).toBe(0);
      expect(component.notAssignedDoses).toBe(0);
      expect(component.notAssignedLoaded).toBe(true);
    });

    it("Check Count and Sums", () => {
      let a1: UnassignedMedicationInfo = {
        ItemCode: "a",
        PocketTypeId: 1,
        Inventory: 11,
      };
      let b1: UnassignedMedicationInfo = {
        ItemCode: "b",
        PocketTypeId: 1,
        Inventory: 21,
      };
      let b2: UnassignedMedicationInfo = {
        ItemCode: "b",
        PocketTypeId: 2,
        Inventory: 22,
      };
      let data: UnassignedMedicationInfo[] = [a1, b1, b2];
      component.notAssignedData = data;
      let event: UtilizationDataEvent = {
        EventId: EventEventId.UnassignedMedsReceived,
        DeviceId: 4,
        EventDateTime: new Date(),
        UtilizationData: data,
      };
      component.onDataReceived(event);

      expect(component.notAssignedItems).toBe(2);
      expect(component.notAssignedDoses).toBe(11 + 21 + 22);
      expect(component.notAssignedLoaded).toBe(true);
    });

    it("Check Different DeviceId gets rejected", () => {
      let a1: UnassignedMedicationInfo = {
        ItemCode: "a",
        PocketTypeId: 1,
        Inventory: 11,
      };
      let b1: UnassignedMedicationInfo = {
        ItemCode: "b",
        PocketTypeId: 1,
        Inventory: 21,
      };
      let b2: UnassignedMedicationInfo = {
        ItemCode: "b",
        PocketTypeId: 2,
        Inventory: 22,
      };
      let data: UnassignedMedicationInfo[] = [a1, b1, b2];
      component.notAssignedData = data;
      let event: UtilizationDataEvent = {
        EventId: EventEventId.UnassignedMedsReceived,
        DeviceId: 999,
        EventDateTime: new Date(),
        UtilizationData: data,
      };
      component.onDataReceived(event);

      expect(component.notAssignedItems).toBe(0);
      expect(component.notAssignedDoses).toBe(0);
      expect(component.notAssignedLoaded).toBe(false);
    });

    it("Check for Error", () => {
      component.onDataReceived(null);
      expect(component.screenState).toBe(
        UtilizationPageComponent.ListState.Error
      );
    });
  });

  describe("Set PocketsWithErrors", () => {
    beforeEach(() => {
      component.pocketsWithErrorsLoaded = false;
      component.selectedDeviceInformation.DeviceId = 4;
    });

    it("Check when empty", () => {
      let data: ErroredMedicationInfo[];
      component.pocketsWithErrorsData = data;
      let event: UtilizationDataEvent = {
        EventId: EventEventId.ErroredMedsReceived,
        DeviceId: 4,
        EventDateTime: new Date(),
        UtilizationData: data,
      };
      component.onDataReceived(event);

      expect(component.pocketsWithErrorsItems).toBe(0);
      expect(component.pocketsWithErrorsDoses).toBe(0);
      expect(component.pocketsWithErrorsLoaded).toBe(true);
    });

    it("Check Count and Sums", () => {
      let a1: ErroredMedicationInfo = {
        ItemCode: "a",
        PocketTypeId: 1,
        ErrorsCount: 11,
      };
      let b1: ErroredMedicationInfo = {
        ItemCode: "b",
        PocketTypeId: 1,
        ErrorsCount: 21,
      };
      let b2: ErroredMedicationInfo = {
        ItemCode: "b",
        PocketTypeId: 2,
        ErrorsCount: 22,
      };
      let data: ErroredMedicationInfo[] = [a1, b1, b2];
      component.pocketsWithErrorsData = data;
      let event: UtilizationDataEvent = {
        EventId: EventEventId.ErroredMedsReceived,
        DeviceId: 4,
        EventDateTime: new Date(),
        UtilizationData: data,
      };
      component.onDataReceived(event);

      expect(component.pocketsWithErrorsItems).toBe(2);
      expect(component.pocketsWithErrorsDoses).toBe(11 + 21 + 22);
      expect(component.pocketsWithErrorsLoaded).toBe(true);
    });
  });

  describe("Set Expired()", () => {
    beforeEach(() => {
      component.expiredLoaded = false;
      component.selectedDeviceInformation.DeviceId = 4;
    });

    it("Check when empty", () => {
      let data: ExpiringMedicationInfo[];
      component.expiringData = data;
      let event: UtilizationDataEvent = {
        EventId: EventEventId.ExpiringMedsReceived,
        DeviceId: 4,
        EventDateTime: new Date(),
        UtilizationData: data,
      };
      component.onDataReceived(event);

      expect(component.expiredItems).toBe(0);
      expect(component.expiredDoses).toBe(0);
      expect(component.expiredLoaded).toBe(true);

      expect(component.expiringThisMonthItems).toBe(0);
      expect(component.expiringThisMonthDoses).toBe(0);
      expect(component.expiringThisMonthLoaded).toBe(true);
    });

    it("Check Count and Sums", () => {
      let a1: ExpiringMedicationInfo = {
        ExpiredCount: 11,
        ExpiringCount: 0,
        ItemCode: "a",
        PocketTypeId: 1,
        Inventory: 111,
      };
      let b1: ExpiringMedicationInfo = {
        ExpiredCount: 21,
        ExpiringCount: 2,
        ItemCode: "b",
        PocketTypeId: 1,
        Inventory: 221,
      };
      let b2: ExpiringMedicationInfo = {
        ExpiredCount: 22,
        ExpiringCount: 3,
        ItemCode: "b",
        PocketTypeId: 2,
        Inventory: 222,
      };
      let c1: ExpiringMedicationInfo = {
        ExpiredCount: 0,
        ExpiringCount: 4,
        ItemCode: "c",
        PocketTypeId: 1,
        Inventory: 331,
      };
      let data: ExpiringMedicationInfo[] = [a1, b1, b2, c1];
      component.expiringData = data;
      let event: UtilizationDataEvent = {
        EventId: EventEventId.ExpiringMedsReceived,
        DeviceId: 4,
        EventDateTime: new Date(),
        UtilizationData: data,
      };
      component.onDataReceived(event);

      expect(component.expiredItems).toBe(2);
      expect(component.expiredDoses).toBe(11 + 21 + 22 + 0);
      expect(component.expiredLoaded).toBe(true);

      expect(component.expiringThisMonthItems).toBe(2);
      expect(component.expiringThisMonthDoses).toBe(0 + 2 + 3 + 4);
      expect(component.expiringThisMonthLoaded).toBe(true);
    });
  });

  it("onRefreshClick", () => {
    component.screenState = UtilizationPageComponent.ListState.Error;
    component.expiredLoaded = true;
    component.expiringThisMonthLoaded = true;
    component.notAssignedLoaded = true;
    component.pocketsWithErrorsLoaded = true;
    component.onRefreshClick();

    expect(utilizationService.get).toHaveBeenCalled();
    expect(component.screenState).not.toBe(
      UtilizationPageComponent.ListState.Error
    );
    expect(component.expiredLoaded).not.toBe(true);
    expect(component.expiringThisMonthLoaded).not.toBe(true);
    expect(component.notAssignedLoaded).not.toBe(true);
    expect(component.pocketsWithErrorsLoaded).not.toBe(true);
  });

  describe("onDataError", () => {
    beforeEach(() => {
      component.screenState = UtilizationPageComponent.ListState.WaitingForData;
      component.selectedDeviceInformation.DeviceId = 4;
    });
    it("Same Device", () => {
      let event: UtilizationDataEvent = {
        EventId: EventEventId.ExpiringMedsReceived,
        DeviceId: 4,
        EventDateTime: new Date(),
        UtilizationData: null,
      };
      component.onDataError(event);
      expect(component.screenState).toBe(
        UtilizationPageComponent.ListState.Error
      );
    });

    it("Wrong device", () => {
      let event: UtilizationDataEvent = {
        EventId: EventEventId.ExpiringMedsReceived,
        DeviceId: 999,
        EventDateTime: new Date(),
        UtilizationData: null,
      };
      component.onDataError(event);
      expect(component.screenState).toBe(
        UtilizationPageComponent.ListState.WaitingForData
      );
    });

    it("Missing related event info", () => {
      component.onDataError(null);
      expect(component.screenState).toBe(
        UtilizationPageComponent.ListState.Error
      );
    });
  });

  describe("Basic Navigation", () => {
    it("Show ExpiredDetails", () => {
      component.showExpiredDetails();
      expect(router.navigate).toHaveBeenCalledWith(
        jasmine.arrayContaining([
          jasmine.stringMatching("xr2/utilization/detailsExpired/"),
        ])
      );
    });
    it("Show ExpiringThisMonthDetails", () => {
      component.showExpiringThisMonthDetails();
      expect(router.navigate).toHaveBeenCalledWith(
        jasmine.arrayContaining([
          jasmine.stringMatching("xr2/utilization/detailsExpiringThisMonth/"),
        ])
      );
    });
    it("Show NotAssignedDetails", () => {
      component.showNotAssignedDetails();
      expect(router.navigate).toHaveBeenCalledWith(
        jasmine.arrayContaining([
          jasmine.stringMatching("xr2/utilization/detailsNotAssigned/"),
        ])
      );
    });
    it("Show PocketsWithErrorsDetails", () => {
      component.showPocketsWithErrorsDetails();
      expect(router.navigate).toHaveBeenCalledWith(
        jasmine.arrayContaining([
          jasmine.stringMatching("xr2/utilization/detailsPocketsWithErrors/"),
        ])
      );
    });
    it("Show Destock", () => {
      component.showDestock();
      expect(router.navigate).toHaveBeenCalledWith(
        jasmine.arrayContaining([
          jasmine.stringMatching("xr2/utilization/destock"),
        ])
      );
    });
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
