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

@Component({
  selector: 'app-internal-transfer-device-needs-page',
  templateUrl: './internal-transfer-device-needs-page.component.html',
  styleUrls: ['./internal-transfer-device-needs-page.component.scss']
})
export class InternalTransferDeviceNeedsPageComponent implements OnInit {
  itemHeaderKey: string = 'ITEM';
  qohHeaderKey: string = 'QOH';
  xferQtyHeaderKey: string = 'QTY_TO_XFER';
  qtyPendingHeaderKey: string = 'QTY_PENDING_PICK';
  itemNeeds$: Observable<IItemReplenishmentNeed[]>;
  device$: Observable<IDevice>;
  colHeaders$: Observable<any>;
  reportTitle$: Observable<string>;
  requestStatus: 'none' | 'printing' = 'none';

  constructor(
    private wpfActionControllerService: WpfActionControllerService,
    private pdfGridReportService: PdfGridReportService,
    private tableBodyService: TableBodyService,
    activatedRoute: ActivatedRoute,
    devicesService: DevicesService,
    deviceReplenishmentNeedsService: DeviceReplenishmentNeedsService,
    translateService: TranslateService,
  ) {
    let deviceId = Number.parseInt(activatedRoute.snapshot.paramMap.get('deviceId'));
    this.device$ = devicesService.get().pipe(shareReplay(1), map(devices => devices.find(d => d.Id == deviceId)));
    this.reportTitle$ = this.device$.pipe(switchMap(d => {
      return translateService.get('DEVICE_NEEDS_REPORT_TITLE', { deviceDescription: d.Description });
    }));
    this.itemNeeds$ = deviceReplenishmentNeedsService.getDeviceItemNeeds(deviceId).pipe(shareReplay(1));
  }

  ngOnInit() {
  }

  goBack() {
    this.wpfActionControllerService.ExecuteBackAction();
  }
  
  print() {
    this.requestStatus = 'printing';
    var colDefinitions: ITableColumnDefintion<IItemReplenishmentNeed>[] = [
      { cellPropertyNames: [ 'ItemFormattedGenericName', 'ItemBrandName', 'ItemId' ], headerResourceKey: this.itemHeaderKey, width: "auto" },
      { cellPropertyNames: [ 'DeviceQuantityOnHand' ], headerResourceKey: this.qohHeaderKey, width: "*" },
      { cellPropertyNames: [ 'DeviceQuantityNeeded' ], headerResourceKey: this.xferQtyHeaderKey, width: "*" },
      { cellPropertyNames: [ 'PendingDevicePickQuantity' ], headerResourceKey: this.qtyPendingHeaderKey, width: "*" },
    ];
    let tableBody$ = this.tableBodyService.buildTableBody(colDefinitions, this.itemNeeds$);
    this.pdfGridReportService.print(tableBody$, this.reportTitle$).subscribe(x => {
      this.requestStatus = 'none';
    }, err => {
      this.requestStatus = 'none';
    });
  }
}
