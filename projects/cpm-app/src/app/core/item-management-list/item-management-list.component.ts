import { Component, OnInit, ViewChild, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { nameof } from '../../shared/functions/nameof';
import { ItemManagement } from '../model/item-management';
import { SearchBoxComponent } from '@omnicell/webcorecomponents';
import { WindowService } from '../../shared/services/window-service';
import { IAngularReportBaseData } from '../../api-core/data-contracts/i-angular-report-base-data';
import { Observable, of } from 'rxjs';
import { XR2InventoryLists } from '../model/xr2-inventory-list';
import { SelectableDeviceInfo } from '../../shared/model/selectable-device-info';
import { ItemManagementService } from '../../api-core/services/item-management.service';
import { TableBodyService } from '../../shared/services/printing/table-body.service';
import { Xr2InventoryPdfGridReportService } from '../../shared/services/printing/xr2-inventory-pdf-grid-report-service';
import { PdfPrintService } from '../../api-core/services/pdf-print-service';
import { SimpleDialogService } from '../../shared/services/dialogs/simple-dialog.service';
import { TranslateService } from '@ngx-translate/core';
import { DevicesService } from '../../api-core/services/devices.service';
import { isEmpty, map, shareReplay } from 'rxjs/operators';
import { ITableColumnDefintion } from '../../shared/services/printing/i-table-column-definition';
import { DatePipe } from '@angular/common';
import { ContentTable } from 'pdfmake/interfaces';
import * as _ from 'lodash';
import { ReportConstants } from '../../shared/constants/report-constants';
import { ConsoleLoggerProfile } from 'oal-core/lib/services/logger/services/console-logger-profile';

@Component({
  selector: "app-item-management-list",
  templateUrl: "./item-management-list.component.html",
  styleUrls: ["./item-management-list.component.scss"],
})
export class ItemManagementListComponent implements AfterViewInit {
  private _items: ItemManagement[];

  readonly itemIdPropertyName = nameof<ItemManagement>("ItemId");
  readonly itemDescriptionPropertyName = nameof<ItemManagement>(
    "ItemDescription"
  );
  readonly unitDoseQtyOnHandPropertyName = nameof<ItemManagement>(
    "UnitDoseQtyOnHand"
  );
  readonly bulkQtyOnHandPropertyName = nameof<ItemManagement>("BulkQtyOnHand");
  readonly totalQtyOnHandPropertyName = nameof<ItemManagement>(
    "TotalQtyOnHand"
  );

  searchFields = [this.itemDescriptionPropertyName, this.itemIdPropertyName];

  @ViewChild("searchBox", null) searchElement: SearchBoxComponent;
  searchTextFilter: string;

  //For XR2 Inventory
  reportTitle$: Observable<string>;
  requestStatus: "none" | "printing" | "complete" = "none";
  reportsStaus: string;
  reportPrinting: number = 0;
  printFailed = false;
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
  arrReportList: XR2InventoryLists[] = [];

  @Input()
  set items(value: ItemManagement[]) {
    this._items = value;
    this.windowService.dispatchResizeEvent();
  }

  get items(): ItemManagement[] {
    return this._items;
  }

  @Output()
  itemIdSelected: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private windowService: WindowService,
    private itemManagementService: ItemManagementService,
    private tableBodyService: TableBodyService,
    private pdfGridReportService: Xr2InventoryPdfGridReportService,
    private pdfPrintService: PdfPrintService,
    private simpleDialogService: SimpleDialogService,
    public translateService: TranslateService,
    private devicesService: DevicesService
  ) {
    this.reportTitle$ = translateService.get("XR2_INV_REPORT_TITLE");
    this.reportBaseData$ = pdfPrintService.getReportBaseData().pipe(shareReplay(1));
  }

  orderChanged(orderedItems: ItemManagement[]) {
    this.items = orderedItems;
  }

  itemSelected(itemId: string) {
    this.itemIdSelected.next(itemId);
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.searchElement.searchOutput$.subscribe((data) => {
      this.searchTextFilter = data;
    });

    this.devicesService.getAllXr2Devices().subscribe((data) => {
      this.deviceInformationList = data;
      this.getActiveXr2DevicesCount();
    });

    this.reportBaseData$.subscribe((baseData) => {
      this.reportBasedata = baseData;
    });
  }

  getActiveXr2DevicesCount() {
    this.activeXR2DevicesCount = this.deviceInformationList.length;
  }

  hasActiveXR2Devices(): boolean {
    if (this.activeXR2DevicesCount > 0) return true;
    else return false;
  }

  printXR2Inventory() {
    this.requestStatus = "printing";
    this.getReportData();
  }

  getReportData() {
    this.reportPickListLines$ = this.itemManagementService.getXR2ReportData().pipe(map((x) => {
          return x.map((p) => new XR2InventoryLists(p));}),shareReplay(1));

    this.reportBaseData$.subscribe();
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

    for (let deviceID of this.deviceInformationList) {
      this.printDeviceReport(deviceID.DeviceId);
    }
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
      this.deviceInformationList.find((obj) => obj.DeviceId === deviceId).Description
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
                this.reportPrinting === this.activeXR2DevicesCount &&
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
}
