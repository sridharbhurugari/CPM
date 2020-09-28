import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { DeviceReplenishmentNeedsService } from '../../api-core/services/device-replenishment-needs.service';
import { IItemReplenishmentNeed } from '../../api-core/data-contracts/i-item-replenishment-need';
import { Observable } from 'rxjs';
import { DevicesService } from '../../api-core/services/devices.service';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { IDevice } from '../../api-core/data-contracts/i-device';
import { PdfGridReportService } from '../../shared/services/printing/pdf-grid-report-service';
import { TranslateService } from '@ngx-translate/core';
import { ITableColumnDefintion } from '../../shared/services/printing/i-table-column-definition';
import { TableBodyService } from '../../shared/services/printing/table-body.service';
import { SimpleDialogService } from '../../shared/services/dialogs/simple-dialog.service';
import { PdfPrintService } from '../../api-core/services/pdf-print-service';
import { IAngularReportBaseData } from '../../api-core/data-contracts/i-angular-report-base-data';
import * as _ from 'lodash';
import { findIndex } from 'lodash';
import { IItemNeedsOperationResult } from '../../api-core/data-contracts/i-item-needs-operation-result';

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
  device$: Observable<IDevice>;
  colHeaders$: Observable<any>;
  reportTitle$: Observable<string>;
  requestStatus: 'none' | 'printing' = 'none';
  reportBaseData$: Observable<IAngularReportBaseData>;
  isXr2Item: boolean;
  deviceId: number;
  itemsToPick: IItemReplenishmentNeed[];

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
  ) {
    this.deviceId = Number.parseInt(activatedRoute.snapshot.paramMap.get('deviceId'));
    this.device$ = devicesService.get().pipe(shareReplay(1), map(devices => devices.find(d => d.Id === this.deviceId)));
    this.reportTitle$ = this.device$.pipe(switchMap(d => {
      return translateService.get('DEVICE_NEEDS_REPORT_TITLE', { deviceDescription: d.Description });
    }));
    this.itemNeeds$ = this.deviceReplenishmentNeedsService.getDeviceItemNeeds(this.deviceId).pipe(shareReplay(1));
    this.reportBaseData$ = pdfPrintService.getReportBaseData().pipe(shareReplay(1));

    this.itemNeeds$.subscribe(needs => {
      this.isXr2Item = needs[0].Xr2Item;
    });
  }

  ngOnInit() {
  }

  goBack() {
    this.wpfActionControllerService.ExecuteBackAction();
  }

  pick() {
    let itemIds: string[];

    if (itemIds !== null && itemIds.length > 0 ) {
      this.deviceReplenishmentNeedsService.pickDeviceItemNeeds(this.deviceId, itemIds);

      this.simpleDialogService.displayInfoOk('INTERNAL_TRANS_PICKQUEUE_SENT_TITLE', 'INTERNAL_TRANS_PICKQUEUE_SENT_OK');
      return;
    }

    this.simpleDialogService.displayInfoOk('INTERNAL_TRANS_PICKQUEUE_SENT_TITLE', 'INTERNAL_TRANS_PICKQUEUE_NONE_SELECTED');
  }

  print() {
    this.requestStatus = 'printing';
    let colDefinitions: ITableColumnDefintion<IItemReplenishmentNeed>[];

    if (this.isXr2Item) {
      colDefinitions = [
        { cellPropertyNames: [ 'ItemFormattedGenericName', 'ItemBrandName', 'ItemId', 'DisplayPackageSize' ],
            headerResourceKey: this.itemHeaderKey, width: 'auto' },
        { cellPropertyNames: [ 'DeviceQuantityOnHand', 'UnitOfIssue', 'DisplayQohNumberOfPackages' ],
            headerResourceKey: this.qohHeaderKey, width: '*' },
        { cellPropertyNames: [ 'DeviceQuantityNeeded', 'UnitOfIssue', 'DisplayNumberOfPackages' ],
            headerResourceKey: this.xferQtyHeaderKey, width: '*' },
        { cellPropertyNames: [ 'PendingDevicePickQuantity' ], headerResourceKey: this.qtyPendingHeaderKey, width: '*' },
      ];
    } else {
      colDefinitions = [
        { cellPropertyNames: [ 'ItemFormattedGenericName', 'ItemBrandName', 'ItemId' ],
            headerResourceKey: this.itemHeaderKey, width: 'auto' },
        { cellPropertyNames: [ 'DisplayQohNumberOfPackages' ],
            headerResourceKey: this.qohHeaderKey, width: '*' },
        { cellPropertyNames: [ 'DisplayNumberOfPackages' ],
            headerResourceKey: this.xferQtyHeaderKey, width: '*' },
        { cellPropertyNames: [ 'PendingDevicePickQuantity' ], headerResourceKey: this.qtyPendingHeaderKey, width: '*' },
      ];
    }

    const sortedNeeds$ = this.itemNeeds$.pipe(map(needs => {
      return _.orderBy(needs, x => x.ItemFormattedGenericName.toLocaleLowerCase(), 'asc');
    }));
    const tableBody$ = this.tableBodyService.buildTableBody(colDefinitions, sortedNeeds$);
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

  onSelect(selectedItems: any) {
    this.itemsToPick = selectedItems;
  }
  private displayPrintFailed() {
    this.simpleDialogService.displayErrorOk('PRINT_FAILED_DIALOG_TITLE', 'PRINT_FAILED_DIALOG_MESSAGE');
  }
}
