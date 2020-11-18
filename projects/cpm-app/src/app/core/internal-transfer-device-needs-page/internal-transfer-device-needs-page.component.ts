import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { DeviceReplenishmentNeedsService } from '../../api-core/services/device-replenishment-needs.service';
import { IItemReplenishmentNeed } from '../../api-core/data-contracts/i-item-replenishment-need';
import { Observable, Subject } from 'rxjs';
import { DevicesService } from '../../api-core/services/devices.service';
import { map, shareReplay, switchMap, takeUntil } from 'rxjs/operators';
import { IDevice } from '../../api-core/data-contracts/i-device';
import { PdfGridReportService } from '../../shared/services/printing/pdf-grid-report-service';
import { TranslateService } from '@ngx-translate/core';
import { ITableColumnDefintion } from '../../shared/services/printing/i-table-column-definition';
import { TableBodyService } from '../../shared/services/printing/table-body.service';
import { SimpleDialogService } from '../../shared/services/dialogs/simple-dialog.service';
import { PdfPrintService } from '../../api-core/services/pdf-print-service';
import { IAngularReportBaseData } from '../../api-core/data-contracts/i-angular-report-base-data';
import * as _ from 'lodash';
import { IInterDeviceTransferPickRequest } from '../../api-core/data-contracts/i-inter-device-transfer-pick-request';
import { CoreEventConnectionService } from "../../api-core/services/core-event-connection.service";

@Component({
  selector: 'app-internal-transfer-device-needs-page',
  templateUrl: './internal-transfer-device-needs-page.component.html',
  styleUrls: ['./internal-transfer-device-needs-page.component.scss']
})
export class InternalTransferDeviceNeedsPageComponent implements OnInit {
  itemHeaderKey = 'ITEM';
  packSizeHeaderKey = 'PACKSIZE';
  qohHeaderKey = 'QOH';
  xferQtyHeaderKey = 'QTY_TO_XFER';
  qtyPendingHeaderKey = 'QTY_PENDING_PICK';
  itemNeeds$: Observable<IItemReplenishmentNeed[]>;
  reportItemNeeds$: Observable<IItemReplenishmentNeed[]>;
  device$: Observable<IDevice>;
  colHeaders$: Observable<any>;
  reportTitle$: Observable<string>;
  requestStatus: 'none' | 'picking' | 'printing' = 'none';
  reportBaseData$: Observable<IAngularReportBaseData>;
  isXr2Item: boolean;
  deviceId: number;
  itemsToPick: IItemReplenishmentNeed[] = new Array();
  sortedNeeds$: Observable<IItemReplenishmentNeed[]>;
  ngUnsubscribe = new Subject();

  constructor(
    private wpfActionControllerService: WpfActionControllerService,
    private pdfGridReportService: PdfGridReportService,
    private tableBodyService: TableBodyService,
    private simpleDialogService: SimpleDialogService,
    private deviceReplenishmentNeedsService: DeviceReplenishmentNeedsService,
    activatedRoute: ActivatedRoute,
    devicesService: DevicesService,
    translateService: TranslateService,
    pdfPrintService: PdfPrintService,
    coreEventConnectionService: CoreEventConnectionService
  ) {
    this.deviceId = Number.parseInt(activatedRoute.snapshot.paramMap.get('deviceId'));
    this.device$ = devicesService.get().pipe(shareReplay(1), map(devices => devices.find(d => d.Id === this.deviceId)));
    this.reportTitle$ = this.device$.pipe(switchMap(d => {
      return translateService.get('DEVICE_NEEDS_REPORT_TITLE', { deviceDescription: d.Description });
    }));
    this.loadNeeds();
    this.reportBaseData$ = pdfPrintService.getReportBaseData().pipe(shareReplay(1));

    this.itemNeeds$.subscribe(needs => {
      this.isXr2Item = needs[0].Xr2Item;
    });

    coreEventConnectionService.refreshDeviceNeedsSubject.pipe(takeUntil(this.ngUnsubscribe)).subscribe(message => this.onRefreshDeviceNeeds());
  }

  ngOnInit() {
    this.loadNeedsReport();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private onRefreshDeviceNeeds() {
    this.loadNeeds();
    this.loadNeedsReport();
  }

  private loadNeeds(): void {
    this.itemNeeds$ = this.deviceReplenishmentNeedsService.getDeviceItemNeeds(this.deviceId).pipe(shareReplay(1));
  }

  private loadNeedsReport(): void {
    this.reportItemNeeds$ = this.deviceReplenishmentNeedsService.getDeviceItemNeeds(this.deviceId).pipe(shareReplay(1));
    this.reportItemNeeds$ = this.reportItemNeeds$.pipe(
      map(need => {
        need.forEach(element =>
        {
            element.SortFormattedName = element.ItemFormattedGenericName;
            if(element.ItemFormattedGenericName && element.ItemFormattedGenericName.length > 40) {
              const reg = new RegExp(".{1," + 18 + "}","g");
              const parts = element.ItemFormattedGenericName.match(reg);
              element.ItemFormattedDescription =  parts.join('\n');
              element.ItemFormattedGenericName = '';
            }
            if(element.ItemBrandName && element.ItemBrandName.length > 40) {
              const reg = new RegExp(".{1," + 18 + "}","g");
              const parts = element.ItemBrandName.match(reg);
              element.ItemBrandNameDescription =  parts.join('\n');
              element.ItemBrandName = '';
            }
            if(element.ItemId && element.ItemId.length > 40) {
              const reg = new RegExp(".{1," + 18 + "}","g");
              const parts = element.ItemBrandName.match(reg);
              element.ItemIdDescription =  parts.join('\n');
              element.ItemId = '';
            }
          })
        return need;
      })
    );
  }

  goBack() {
    this.wpfActionControllerService.ExecuteBackAction();
  }

  onSelect(items: IItemReplenishmentNeed[]) {
    this.itemsToPick = items;
  }

  pick() {
    if (this.itemsToPick.length > 0) {
      this.requestStatus = 'picking';
      var picksByItemId = _.groupBy(this.itemsToPick, x => x.ItemId);
      const items: IInterDeviceTransferPickRequest[] = new Array<IInterDeviceTransferPickRequest>();
      for(var itemId in picksByItemId){
        const itemPicks = picksByItemId[itemId];
        const item = {
          ItemId: itemId,
          QuantityToPick: itemPicks.map(x => x.DeviceQuantityNeeded).reduce((total, value) => total + value),
          SourceDeviceLocationId: itemPicks[0].PickLocationDeviceLocationId
        };
        items.push(item);
      }

      this.deviceReplenishmentNeedsService.pickDeviceItemNeeds(this.deviceId, items).subscribe(x => this.handlePickSuccess(), e => this.handlePickFailure());
    } else {
      this.simpleDialogService.displayErrorOk('INTERNAL_TRANS_PICKQUEUE_SENT_TITLE', 'INTERNAL_TRANS_PICKQUEUE_NONE_SELECTED');
    }
  }

  print() {
    let colDefinitions: ITableColumnDefintion<IItemReplenishmentNeed>[];

    if (this.isXr2Item) {
      colDefinitions = [
        { cellPropertyNames: [ 'ItemFormattedGenericName','ItemFormattedDescription', 'ItemBrandName','ItemBrandNameDescription', 'ItemId','ItemIdDescription', 'DisplayPackageSize' ],
            headerResourceKey: this.itemHeaderKey, width: 'auto' },
        { cellPropertyNames: [ 'DisplayDeviceQuantityOnHand', 'DisplayQohNumberOfPackages' ],
            headerResourceKey: this.qohHeaderKey, width: '*' },
        { cellPropertyNames: [ 'DisplayDeviceQuantityNeeded', 'DisplayNumberOfPackages' ],
            headerResourceKey: this.xferQtyHeaderKey, width: '*' },
        { cellPropertyNames: [ 'PendingDevicePickQuantity' ], headerResourceKey: this.qtyPendingHeaderKey, width: '*' },
      ];
    } else {
      colDefinitions = [
        { cellPropertyNames: [ 'ItemFormattedGenericName','ItemFormattedDescription', 'ItemBrandName','ItemBrandNameDescription', 'ItemId','ItemIdDescription' ],
            headerResourceKey: this.itemHeaderKey, width: 'auto' },
        { cellPropertyNames: [ 'DisplayDeviceQuantityOnHand' ],
            headerResourceKey: this.qohHeaderKey, width: '*' },
        { cellPropertyNames: [ 'DisplayDeviceQuantityNeeded' ],
            headerResourceKey: this.xferQtyHeaderKey, width: '*' },
        { cellPropertyNames: [ 'PendingDevicePickQuantity' ], headerResourceKey: this.qtyPendingHeaderKey, width: '*' },
      ];
    }

    this.requestStatus = 'printing';
    this.sortedNeeds$ = this.reportItemNeeds$.pipe(map(needs => {
        return _.orderBy(needs, x => x.SortFormattedName.toLocaleLowerCase(), 'asc');
      }));
    const tableBody$ = this.tableBodyService.buildTableBody(colDefinitions, this.sortedNeeds$);
    this.pdfGridReportService.printWithBaseData(tableBody$, this.reportTitle$, this.reportBaseData$).subscribe(succeeded => {
      this.requestStatus = 'none';
      if (!succeeded) {
        this.displayPrintFailed();
      } else {
        this.simpleDialogService.displayInfoOk('PRINT_SUCCEEDED_DIALOG_TITLE', 'PRINT_SUCCEEDED_DIALOG_MESSAGE');
      }
    }, err => {
      this.requestStatus = 'none';
      this.displayPrintFailed();
    });
  }

  private displayPrintFailed() {
    this.simpleDialogService.displayErrorOk('PRINT_FAILED_DIALOG_TITLE', 'PRINT_FAILED_DIALOG_MESSAGE');
  }

  private handlePickSuccess() {
    this.itemNeeds$ = this.deviceReplenishmentNeedsService.getDeviceItemNeeds(this.deviceId).pipe(shareReplay(1));
    this.simpleDialogService.displayInfoOk('INTERNAL_TRANS_PICKQUEUE_SENT_TITLE', 'INTERNAL_TRANS_PICKQUEUE_SENT_OK');
    this.requestStatus = 'none';
  }

  private handlePickFailure() {
    this.simpleDialogService.displayInfoOk('INTERNAL_TRANS_PICKQUEUE_FAILED_TITLE', 'INTERNAL_TRANS_PICKQUEUE_FAILED_MSG');
    this.requestStatus = 'none';
  }
}
