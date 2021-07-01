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
    public translateService: TranslateService
  ) {

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
  }
}
