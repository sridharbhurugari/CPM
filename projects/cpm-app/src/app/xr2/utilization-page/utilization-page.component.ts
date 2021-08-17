import * as _ from "lodash";
import { Component, OnInit, ViewChild } from "@angular/core";
import { Observable, of, Subject } from "rxjs";
import {
  finalize,
  catchError,
  shareReplay,
  takeUntil,
  filter,
  map,
} from "rxjs/operators";
import { UtilizationService } from "../../api-xr2/services/utilization.service";
import { nameof } from "../../shared/functions/nameof";
import { SelectableDeviceInfo } from "../../shared/model/selectable-device-info";
import { UtilizationEventConnectionService } from "../services/utilization-event-connection.service";
import { UtilizationDataEvent } from "../model/utilization-data-event";
import { WindowService } from "../../shared/services/window-service";
import { WpfInteropService } from "../../shared/services/wpf-interop.service";
import { ExpiringMedicationInfo } from "../model/utilization-expiring-medication-info";
import { EventEventId } from "../../shared/constants/event-event-id";
import { ErroredMedicationInfo } from "../model/utilization-errored-medication-info";
import { UnassignedMedicationInfo } from "../model/utilization-unassigned-medication-info";
import { Xr2StorageCapacityDisplay } from "../model/xr2-storage-capacity-display";
import { GridComponent } from "@omnicell/webcorecomponents";
import { NavigationExtras, Router } from "@angular/router";
import { BaseRouteReuseStrategy } from "../../core/base-route-reuse-strategy/base-route-reuse-strategy";
import { UtilizationHeaderComponent } from "../utilization-header/utilization-header.component";
import { IAngularReportBaseData } from "../../api-core/data-contracts/i-angular-report-base-data";
import { XR2InventoryLists } from "../../core/model/xr2-inventory-list";
import { DatePipe } from "@angular/common";
import { ITableColumnDefintion } from "../../shared/services/printing/i-table-column-definition";
import { ReportConstants } from "../../shared/constants/report-constants";
import { TableBodyService } from "../../shared/services/printing/table-body.service";
import { ContentTable } from "pdfmake/interfaces";
import { Xr2InventoryPdfGridReportService } from "../../shared/services/printing/xr2-inventory-pdf-grid-report-service";
import { SimpleDialogService } from "../../shared/services/dialogs/simple-dialog.service";
import { TranslateService } from "@ngx-translate/core";
import { PdfPrintService } from "../../api-core/services/pdf-print-service";
import { DevicesService } from "../../api-core/services/devices.service";
import { Console } from "console";

@Component({
  selector: "app-utilization-page",
  templateUrl: "./utilization-page.component.html",
  styleUrls: ["./utilization-page.component.scss"],
})
export class UtilizationPageComponent implements OnInit {
  selectedDeviceInformation: SelectableDeviceInfo;
  requestDeviceUtilizationPocketSummaryInfo$: Observable<number>;
  deviceUtilizationPocketSummaryInfo: any[];
  searchTextFilter: string;
  currentSortPropertyName: string;
  screenState: UtilizationPageComponent.ListState =
    UtilizationPageComponent.ListState.NoData;
  ngUnsubscribe = new Subject();
  lastErrorMessage: string;
  eventDateTime: Date;
  isIconOver: boolean = false;

  expiringData: ExpiringMedicationInfo[];
  expiredLoaded: boolean = false;
  expiredItems: number = 0;
  expiredDoses: number = 0;

  expiringThisMonthLoaded: boolean = false;
  expiringThisMonthItems: number = 0;
  expiringThisMonthOnlyDoses: number = 0;
  expiringThisMonthDoses: number = 0;

  notAssignedData: UnassignedMedicationInfo[];
  notAssignedLoaded: boolean = false;
  notAssignedItems: number = 999;
  notAssignedDoses: number = 999;

  pocketsWithErrorsData: ErroredMedicationInfo[];
  pocketsWithErrorsLoaded: boolean = false;
  pocketsWithErrorsItems: number = 0;
  pocketsWithErrorsDoses: number = 0;

   //For XR2 Inventory
   reportTitle$: Observable<string>;
   requestStatus: "none" | "printing" | "complete" = "none";
   reportsStaus: string;
   reportPrinting: number = 0;
   printFailed = false;
   isFirstTime = true;
   printFailedDialogShownCount = 1;
   reportBaseData$: Observable<IAngularReportBaseData>;
   displayFilteredList$: Observable<XR2InventoryLists[]>;
   xr2InvReportItems: XR2InventoryLists[];
   deviceInformationList: SelectableDeviceInfo[];
   reportBasedata: IAngularReportBaseData;
   reportPickListLines$: Observable<XR2InventoryLists[]>;
   activeXR2DevicesCount: number = 0;
   qtyFilledHeaderKey = "QTY_FILLED_REQUESTED";
   dateHeaderKey = "DATE";
   invReportItems: XR2InventoryLists[];
   arrReportList: XR2InventoryLists[] = [];

  xr2StorageCapacityDisplays: Xr2StorageCapacityDisplay[];

  readonly pocketTypeDefinitionName = nameof<Xr2StorageCapacityDisplay>(
    "PocketTypeDefinition"
  );
  readonly percentageUsedName =
    nameof<Xr2StorageCapacityDisplay>("PercentageUsed");
  readonly pocketsRemainingName =
    nameof<Xr2StorageCapacityDisplay>("PocketsRemaining");

  @ViewChild("header", { static: false }) header: UtilizationHeaderComponent;
  @ViewChild("ocgrid", { static: false }) ocGrid: GridComponent;

  constructor(
    private utilizationService: UtilizationService,
    private utilizationEventConnectionService: UtilizationEventConnectionService,
    private windowService: WindowService,
    private wpfInteropService: WpfInteropService,
    private tableBodyService: TableBodyService,
    private pdfGridReportService: Xr2InventoryPdfGridReportService,
    private simpleDialogService: SimpleDialogService,
    private pdfPrintService: PdfPrintService,
    public translateService: TranslateService,
    private devicesService: DevicesService,
    private router: Router
  ) {
    this.setupDataRefresh();
    this.reportTitle$ = translateService.get("XR2_INV_REPORT_TITLE");
    this.reportBaseData$ = this.pdfPrintService.getReportBaseData().pipe(shareReplay(1));
  }

  ngOnInit() {
    if (!this.selectedDeviceInformation) {
      this.selectedDeviceInformation = new SelectableDeviceInfo(null);
      this.selectedDeviceInformation.DeviceId = 0;
    }
    this.setUtilizationService();
    this.refreshData();
  }
  /* istanbul ignore next */
  ngAfterViewInit(): void {
    this.reportBaseData$.subscribe((baseData) => {
      this.reportBasedata = baseData;
    });
    this.devicesService.getAllXr2Devices().subscribe((data) => {
      this.deviceInformationList = data;
      this.getActiveXr2DevicesCount();
    });
    this.utilizationEventConnectionService.UtilizationIncomingDataSubject.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe((event) => this.onDataReceived(event));
    this.utilizationEventConnectionService.UtilizationIncomingDataErrorSubject.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe((event) => this.onDataError(event));
    this.utilizationEventConnectionService.Xr2StorageCapacityDisplayEventSubject.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe((event) =>
      this.onXr2StorageCapacityDisplayEventReceived(event)
    );

  }

  // On WPF Page Return in CPM, the page is already in the browser, so we reset the data
  /* istanbul ignore next */
  private setupDataRefresh() {
    let hash = this.windowService.getHash();
    this.wpfInteropService.wpfViewModelActivated
      .pipe(
        filter((x) => x == hash),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(() => {
        this.eventDateTime = null;
        this.header.setToDefault();
        this.selectedDeviceInformation = this.header.selectedDeviceInformation;

        this.refreshData();
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.complete();
    this.ngUnsubscribe.next();
  }

  setUtilizationService() {
    // Utilization Service
    this.requestDeviceUtilizationPocketSummaryInfo$ = this.utilizationService
      .get(this.selectedDeviceInformation.DeviceId)
      .pipe(
        shareReplay(1),
        finalize(() => {
          if (this.selectedDeviceInformation.DeviceId === 0) {
            this.screenState = UtilizationPageComponent.ListState.NoData;
          } else {
            this.screenState =
              UtilizationPageComponent.ListState.WaitingForData;
          }
          console.log("on complete");
        }),
        catchError((error) => {
          this.lastErrorMessage = String(error.message);
          this.screenState = UtilizationPageComponent.ListState.Error;
          console.log("on error", error.message);
          throw error;
        })
      );
  }

  onDeviceSelectionChangedEvent($event) {
    if (this.selectedDeviceInformation !== $event) {
      this.selectedDeviceInformation = $event;
      this.refreshData();
    }
  }

  onRefreshClick() {
    this.refreshData();
  }

  private refreshData() {
    (<BaseRouteReuseStrategy>this.router.routeReuseStrategy).removeCacheItem(
      "utilization",
      true
    );
    this.screenState = UtilizationPageComponent.ListState.MakingDataRequest;
    this.expiredLoaded = false;
    this.expiringThisMonthLoaded = false;
    this.notAssignedLoaded = false;
    this.pocketsWithErrorsLoaded = false;

    this.setUtilizationService();
    this.setPrintInventoryButton();
    this.requestDeviceUtilizationPocketSummaryInfo$.subscribe();
    
  }

  setPrintInventoryButton(): void {
    this.requestStatus = "none";
     let reportPickListLines$ = this.utilizationService.getXR2ReportData(this.selectedDeviceInformation.DeviceId).pipe(map((x) => {
      return x.map((p) => new XR2InventoryLists(p));}),shareReplay(1));

      reportPickListLines$.subscribe((p) => {
         this.invReportItems = p as XR2InventoryLists[];
         if(this.invReportItems && this.invReportItems.length !== 0){
          this.requestStatus = "complete";
        }
      });
  }

  onDataReceived(event: UtilizationDataEvent) {
    try {
      // only process events for our device
      if (event && event.DeviceId !== this.selectedDeviceInformation.DeviceId) {
        return;
      }

      // Event types: ExpiringMedsReceived  UnassignedMedsReceived  ErroredMedsReceived
      switch (event.EventId) {
        case EventEventId.ExpiringMedsReceived: {
          this.expiringData = event.UtilizationData as ExpiringMedicationInfo[];
          this.SetExpired();
          this.SetExpiringThisMonth();
          break;
        }
        case EventEventId.UnassignedMedsReceived: {
          this.notAssignedData =
            event.UtilizationData as UnassignedMedicationInfo[];
          this.SetNotAssigned();
          break;
        }
        case EventEventId.ErroredMedsReceived: {
          this.pocketsWithErrorsData =
            event.UtilizationData as ErroredMedicationInfo[];
          this.SetPocketsWithErrors();
          break;
        }
      }
      this.deviceUtilizationPocketSummaryInfo = event.UtilizationData;
      this.screenState = UtilizationPageComponent.ListState.Display;
      this.eventDateTime = event.EventDateTime;
    } catch (e) {
      this.screenState = UtilizationPageComponent.ListState.Error;
      this.lastErrorMessage = e.message;
      console.log("UtilizationPageComponent.onDataReceived ERROR");
      console.log(e);
    }
  }

  private onXr2StorageCapacityDisplayEventReceived(
    event: Xr2StorageCapacityDisplay[]
  ) {
    if (
      event &&
      event[0].DeviceId !== this.selectedDeviceInformation.DeviceId
    ) {
      return;
    }
    this.xr2StorageCapacityDisplays = event as Xr2StorageCapacityDisplay[];
    console.log(this.xr2StorageCapacityDisplays[1].IsOverStock);
    this.resizeGrid();
    this.screenState = UtilizationPageComponent.ListState.Display;
  }

  public SetExpired() {
    const exp = _.filter(this.expiringData, (e) => {
      return e.ExpiredCount > 0;
    });
    this.expiredItems = _(exp).countBy("ItemCode").size();
    this.expiredDoses = _.sumBy(this.expiringData, "ExpiredCount");
    this.expiredLoaded = true;
  }

  public SetExpiringThisMonth() {
    const exp = _.filter(this.expiringData, (e) => {
      return e.ExpiringCount > 0;
    });
    // this.expiringThisMonthItems = _(exp).countBy("ItemCode").size();
    this.expiringThisMonthItems = _(this.expiringData).countBy("ItemCode").size();
    this.expiringThisMonthOnlyDoses = _.sumBy(this.expiringData, "ExpiringCount");
    this.expiringThisMonthDoses = this.expiringThisMonthOnlyDoses + this.expiredDoses;
    this.expiringThisMonthLoaded = true;
  }

  public SetNotAssigned() {
    this.notAssignedItems = _(this.notAssignedData).countBy("ItemCode").size();
    // Check if null or unassigned
    if (this.notAssignedItems == null) {
      this.notAssignedItems = 0;
    }
    this.notAssignedDoses = _.sumBy(this.notAssignedData, "Inventory");
    this.notAssignedLoaded = true;
  }

  public SetPocketsWithErrors() {
    this.pocketsWithErrorsItems = _(this.pocketsWithErrorsData)
      .countBy("ItemCode")
      .size();
    this.pocketsWithErrorsDoses = _.sumBy(
      this.pocketsWithErrorsData,
      "ErrorsCount"
    );
    this.pocketsWithErrorsLoaded = true;
  }

  public NavigateToPocketDetailsPage(rowClicked: Xr2StorageCapacityDisplay) {
    if (rowClicked.PocketInventoryCount == 0) {
      return;
    }

    if(this.isIconOver){
      this.isIconOver = false;
      return;
    }

    const navigationExtras: NavigationExtras = {
      queryParams: {
        DeviceId: rowClicked.DeviceId,
        PocketTypeId: rowClicked.PocketTypeId,
        DeviceDescription: this.selectedDeviceInformation.Description,
        TrayTypeDescription: rowClicked.PocketTypeDefinition,
      },
      fragment: "anchor",
    };
    this.router.navigate(["xr2/utilization/details"], navigationExtras);
  }

  public toastIconClicked(){
   this.isIconOver = true;
  }

  /*Xr2 Inventory Report*/
  getActiveXr2DevicesCount() {
    this.activeXR2DevicesCount = this.deviceInformationList.length;
  }

  hasActiveXR2Devices(): boolean {
    if (this.selectedDeviceInformation.DeviceId !== 0) return true;
    else return false;
  }

  printXR2Inventory() {
    this.requestStatus = "printing";
    if(!this.isFirstTime){
      this.reportBaseData$ = this.pdfPrintService.getReportBaseData().pipe(shareReplay(1));
      this.reportBaseData$.subscribe((baseData) => {
        this.reportBasedata = baseData;
      });
    }
    this.isFirstTime = false;
    this.getReportData();
  }

  getReportData() {
    this.reportPickListLines$ = this.utilizationService.getXR2ReportData(this.selectedDeviceInformation.DeviceId).pipe(map((x) => {
          return x.map((p) => new XR2InventoryLists(p));}),shareReplay(1));

    this.reportBaseData$ && this.reportBaseData$.subscribe();
    this.reportPickListLines$.subscribe((p) => {
      this.arrReportList = p as XR2InventoryLists[];
      this.filterAndFormatReportList();
      this.printEachDeviceReport();
    });

  }

  filterAndFormatReportList() {
    const datePipe = new DatePipe("en-US");
    const singleNewLine ="\n";
    const threeNewlines = "\n\n\n";
    const twoNewlines = "\n\n";
    const space =" ";
    let arrUniqueReportList: XR2InventoryLists[] = [];
    if (this.reportPickListLines$) {
      let groupedData = this.groupByReportData(this.arrReportList, function (item) {
        return [item.DeviceLocationID, item.DeviceDescription, item.ItemId];
      });
      var self = this;
      groupedData.forEach(function(indData){
        let value: XR2InventoryLists = {
          ItemId: "",FormattedGenericName: "",TradeName: "",QuantityOnHand: 0,FormattedQuantityOnHand: "",DeviceLocationID: 0,DeviceID: 0,DeviceDescription: "",
          PackSize: 0,PackSizeMin: 0,PackSizeMax: 0,UnitsOfIssue: "",TotalPacks: 0,FormattedPackSize: "",FormattedPackSizeMin: "",FormattedPackSizeMax: "",
          FormattedExpirationDate: "",OmniSiteID: "",ExpirationDate: ""};
        indData.forEach(element => {
          value.ItemId = element.ItemId;
          value.FormattedGenericName = element.FormattedGenericName;
          value.TradeName = element.TradeName;
          value.QuantityOnHand = element.PackSize*element.TotalPacks;
          value.DeviceLocationID = element.DeviceLocationID;
          value.DeviceID = element.DeviceID;
          value.DeviceDescription = element.DeviceDescription;
          value.PackSize = element.PackSize;
          value.PackSizeMin = element.PackSizeMin;
          value.PackSizeMax = element.PackSizeMax;
          value.UnitsOfIssue = element.UnitsOfIssue;
          value.TotalPacks = element.TotalPacks;
          value.FormattedPackSize += element.PackSize + threeNewlines;
          value.FormattedQuantityOnHand += value.QuantityOnHand + space + element.UnitsOfIssue + singleNewLine + "Packs:" + element.TotalPacks + twoNewlines;
          value.FormattedPackSizeMin +=  element.PackSizeMin + space+ element.UnitsOfIssue + threeNewlines;
          value.FormattedPackSizeMax +=  element.PackSizeMax + space + element.UnitsOfIssue + threeNewlines;
            if(self.checkValidDate(element.ExpirationDate))
            {
              value.FormattedExpirationDate += datePipe.transform(new Date(element.ExpirationDate), "MM/dd/yyyy" ) + threeNewlines;
            }
            else
            {
              value.FormattedExpirationDate += space + threeNewlines;
            }
          value.OmniSiteID = element.OmniSiteID;
        },
        arrUniqueReportList.push(value));
      },
     );
    }
    this.reportPickListLines$ = of(arrUniqueReportList);
  }

  groupByReportData(array, f) {
    var groups = {};
    array.forEach(function (o) {
      var group = JSON.stringify(f(o));
      groups[group] = groups[group] || [];
      groups[group].push(o);
    });
    return Object.keys(groups).map(function (group) {
      return groups[group];
    });
  }

  printEachDeviceReport() {
    this.reportPrinting = 0;
    this.printFailed = false;
    this.printFailedDialogShownCount = 1;
    this.printDeviceReport(this.selectedDeviceInformation.DeviceId);
  }

  printDeviceReport(element: number) {
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

    if (this.reportPickListLines$) {
      this.displayFilteredList$ = this.reportPickListLines$.pipe(map((eventsListItems) => {
        return _.orderBy(eventsListItems
              .filter((item) => item.DeviceID === element)
              .map((p) => new XR2InventoryLists(p)),
            (p) => p.FormattedGenericName.toLowerCase(),"asc");}));

      this.displayFilteredList$
        .pipe(
          map((reportdata) => {
            return this.parseRowsData(reportdata, colDefinitions, element);
          })
        )
        .subscribe();
    }
  }

  parseRowsData(
    items: XR2InventoryLists[],
    colDefinitions: ITableColumnDefintion<XR2InventoryLists>[],
    element: number
  ) { 
    if(items.length > 0 )
    {
    let sortedXR2Inv = of(
      _.orderBy(items, (x) => x.FormattedGenericName.toLowerCase(), "asc")
    );

    let tableBody$ = this.tableBodyService.buildTableBody(colDefinitions,sortedXR2Inv,ReportConstants.ReportBodySmallFontSize);
    this.printTheReport(tableBody$, element);
    }
  }

  checkValidDate(date: string): boolean {
    var ldate = date && new Date(date);
    if (
      ldate instanceof Date &&
      !isNaN(ldate.getTime()) &&
      ldate.getFullYear() > 1900
    ) {
      return true;
    } else {
      return false;
    }
  }

  printTheReport(tableBody: Observable<ContentTable>, deviceId: number) {
    console.log("printing started");
    this.setDeviceDescriptionData(
      this.selectedDeviceInformation.Description
    );
    let reportBaseData$ = of({ ...this.reportBasedata });
    try {
      this.pdfGridReportService.printWithBaseData(tableBody, of(ReportConstants.Xr2InventoryReport),reportBaseData$)
        .subscribe(
          (succeeded) => {
            if (!succeeded) {
              this.printFailed = true;
              this.reportPrinting++;
              if (this.printFailedDialogShownCount === 1) {
                this.requestStatus = "none";
                this.displayPrintFailedDialog();
              }
              this.printFailedDialogShownCount++;
              return false;
            } else {
              this.reportPrinting++;
              if (
                !this.printFailed
              ) {
                this.requestStatus = "none";
                this.reportPrinting = 0;
                this.simpleDialogService.displayInfoOk(
                  "PRINT_SUCCEEDED_DIALOG_TITLE",
                  "PRINT_SUCCEEDED_DIALOG_MESSAGE"
                );
              }
              return true;
            }
          },
          (err) => {
            this.printFailed = true;
            this.reportPrinting++;
            if (this.printFailedDialogShownCount === 1) {
              this.requestStatus = "none";
              this.displayPrintFailedDialog();
            }
            this.printFailedDialogShownCount++;
            return false;
          }
        );
    } catch (e) {
      console.log("Print XR2 Inventory failed");
      this.printFailed = true;
      this.requestStatus = "none";
      this.displayPrintFailedDialog();
      return false;
    }
  }

  setDeviceDescriptionData(deviceDescription: string) {
    this.reportBasedata.DeviceDescriptionName = deviceDescription;
    this.reportBaseData$ = of(this.reportBasedata);
    this.reportBaseData$.subscribe();
    this.reportBaseData$
      .pipe(map((p) => console.log(p.DeviceDescriptionName)))
      .subscribe();
  }

  displayPrintFailedDialog() {
    this.simpleDialogService.displayErrorOk(
      "PRINT_FAILED_DIALOG_TITLE",
      "PRINT_FAILED_DIALOG_MESSAGE"
    );
  }
  /* istanbul ignore next */
  private resizeGrid() {
    setTimeout(() => {
      if (this.ocGrid) {
        this.ocGrid.checkTableBodyOverflown();
      }
    }, 250);
  }

  orderChanged(orderedItems: Xr2StorageCapacityDisplay[]) {
    this.xr2StorageCapacityDisplays = orderedItems;
  }

  onDataError(event) {
    try {
      if (
        event.DeviceId !== undefined &&
        event.DeviceId !== this.selectedDeviceInformation.DeviceId
      ) {
        return;
      }
      this.screenState = UtilizationPageComponent.ListState.Error;
    } catch (e) {
      this.screenState = UtilizationPageComponent.ListState.Error;
      this.lastErrorMessage = e.message;
      console.log("UtilizationPageComponent.onDataError ERROR");
      console.log(e);
    }
  }

  showExpiredDetails() {
    this.router.navigate([
      "xr2/utilization/detailsExpired/",
      this.selectedDeviceInformation.DeviceId,
    ]);
  }
  showExpiringThisMonthDetails() {
    this.router.navigate([
      "xr2/utilization/detailsExpiringThisMonth/",
      this.selectedDeviceInformation.DeviceId,
    ]);
  }
  showNotAssignedDetails() {
    this.router.navigate([
      "xr2/utilization/detailsNotAssigned/",
      this.selectedDeviceInformation.DeviceId,
    ]);
  }
  showPocketsWithErrorsDetails() {
    this.router.navigate([
      "xr2/utilization/detailsPocketsWithErrors/",
      this.selectedDeviceInformation.DeviceId,
    ]);
  }
  showDestock() {
    this.router.navigate([
      "xr2/utilization/destock",
      this.selectedDeviceInformation.DeviceId,
    ]);
  }
}
export namespace UtilizationPageComponent {
  export enum ListState {
    MakingDataRequest = "MakingDataRequest", // Request data from XR2. Data will arive as an event
    WaitingForData = "WaitingForData", // Data request completed and we are waiting for XR2's event to come back
    Error = "Error", // There was an error
    NoData = "NoData", // No data to display (no device was selected)
    Display = "Display", // Display data
  }
}
export enum OcAnimationSize {
  small,
  normal,
  large,
}
