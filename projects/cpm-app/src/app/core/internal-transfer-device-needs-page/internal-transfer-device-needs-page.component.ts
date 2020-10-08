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
  requestStatus: 'none' | 'printing' = 'none';
  reportBaseData$: Observable<IAngularReportBaseData>;
  isXr2Item: boolean;
  deviceId: number;

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
    this.reportItemNeeds$ = this.deviceReplenishmentNeedsService.getDeviceItemNeeds(this.deviceId).pipe(shareReplay(1));
    this.reportItemNeeds$ = this.reportItemNeeds$.pipe(
      map(need => {
        need.forEach(function(element)
        {  
            element.SortFormattedName = element.ItemFormattedGenericName;
            if(element.ItemFormattedGenericName && element.ItemFormattedGenericName.length > 40) {
              let reg = new RegExp(".{1," + 18 + "}","g");
              let parts = element.ItemFormattedGenericName.match(reg);
              element.ItemFormattedDescription =  parts.join('\n');
              element.ItemFormattedGenericName = '';
            }
            if(element.ItemBrandName && element.ItemBrandName.length > 40) {
              let reg = new RegExp(".{1," + 18 + "}","g");
              let parts = element.ItemBrandName.match(reg);
              element.ItemBrandNameDescription =  parts.join('\n');
              element.ItemBrandName = '';
            }  
            if(element.ItemId && element.ItemId.length > 40) {
              let reg = new RegExp(".{1," + 18 + "}","g");
              let parts = element.ItemBrandName.match(reg);
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

  print() {
    this.requestStatus = 'printing';
    let colDefinitions: ITableColumnDefintion<IItemReplenishmentNeed>[];

    if (this.isXr2Item) {
      colDefinitions = [
        { cellPropertyNames: [ 'ItemFormattedGenericName','ItemFormattedDescription', 'ItemBrandName','ItemBrandNameDescription', 'ItemId','ItemIdDescription', 'PackageSize' ],
            headerResourceKey: this.itemHeaderKey, width: 'auto' },
        { cellPropertyNames: [ 'DeviceQuantityOnHand', 'UnitOfIssue', 'QohNumberOfPackages' ],
            headerResourceKey: this.qohHeaderKey, width: '*' },
        { cellPropertyNames: [ 'DeviceQuantityNeeded', 'UnitOfIssue', 'NumberOfPackages' ],
            headerResourceKey: this.xferQtyHeaderKey, width: '*' },
        { cellPropertyNames: [ 'PendingDevicePickQuantity' ], headerResourceKey: this.qtyPendingHeaderKey, width: '*' },
      ];
    } else {
      colDefinitions = [
        { cellPropertyNames: [ 'ItemFormattedGenericName','ItemFormattedDescription', 'ItemBrandName','ItemBrandNameDescription', 'ItemId','ItemIdDescription' ],
            headerResourceKey: this.itemHeaderKey, width: 'auto' },
        { cellPropertyNames: [ 'QohNumberOfPackages' ],
            headerResourceKey: this.qohHeaderKey, width: '*' },
        { cellPropertyNames: [ 'NumberOfPackages' ],
            headerResourceKey: this.xferQtyHeaderKey, width: '*' },
        { cellPropertyNames: [ 'PendingDevicePickQuantity' ], headerResourceKey: this.qtyPendingHeaderKey, width: '*' },
      ];
    }

    const sortedNeeds$ = this.reportItemNeeds$.pipe(map(needs => {
      return _.orderBy(needs, x => x.SortFormattedName.toLocaleLowerCase(), 'asc');
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

  private displayPrintFailed() {
    this.simpleDialogService.displayErrorOk('PRINT_FAILED_DIALOG_TITLE', 'PRINT_FAILED_DIALOG_MESSAGE');
  }
}
