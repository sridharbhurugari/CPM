import { Component, OnInit } from '@angular/core';
import { UnderfilledPicklistLinesService } from '../../api-core/services/underfilled-picklist-lines.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UnderfilledPicklistLine } from '../model/underfilled-picklist-line';
import { map, shareReplay } from 'rxjs/operators';
import * as _ from 'lodash';
import { UnderfilledPicklistsService } from '../../api-core/services/underfilled-picklists.service';
import { IUnderfilledPicklist } from '../../api-core/data-contracts/i-underfilled-picklist';
import { TableBodyService } from '../../shared/services/printing/table-body.service';
import { PdfGridReportService } from '../../shared/services/printing/pdf-grid-report-service';
import { TranslateService } from '@ngx-translate/core';
import { SimpleDialogService } from '../../shared/services/dialogs/simple-dialog.service';
import { IAngularReportBaseData } from '../../api-core/data-contracts/i-angular-report-base-data';
import { ITableColumnDefintion } from '../../shared/services/printing/i-table-column-definition';
import { PdfPrintService } from '../../api-core/services/pdf-print-service';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-underfilled-picklist-lines-page',
  templateUrl: './underfilled-picklist-lines-page.component.html',
  styleUrls: ['./underfilled-picklist-lines-page.component.scss']
})
export class UnderfilledPicklistLinesPageComponent implements OnInit {
  itemHeaderKey: string = 'DESCRIPTION_ID';
  qohHeaderKey: string = 'PHARMACY_QOH';
  destinationHeaderKey: string = 'DESTINATION';
  qtyFilledHeaderKey: string = 'QTY_FILLED_REQUESTED';
  dateHeaderKey: string = 'DATE'
  picklistLines$: Observable<UnderfilledPicklistLine[]>;
  reportPickListLines$: Observable<UnderfilledPicklistLine[]>;
  picklist$: Observable<IUnderfilledPicklist>;
  reportTitle$: Observable<string>;
  requestStatus: 'none' | 'printing' = 'none';
  reportBaseData$: Observable<IAngularReportBaseData>;

  constructor(
    private route: ActivatedRoute,
    private underfilledPicklistsService: UnderfilledPicklistsService,
    private pdfGridReportService: PdfGridReportService,
    private tableBodyService: TableBodyService,
    private simpleDialogService: SimpleDialogService,
    private underfilledPicklistLinesService: UnderfilledPicklistLinesService,
    private wpfActionControllerService: WpfActionControllerService,
    translateService: TranslateService,
    pdfPrintService: PdfPrintService,
  ) { 
    this.reportTitle$ = translateService.get('UNFILLED');
    this.reportBaseData$ = pdfPrintService.getReportBaseData().pipe(shareReplay(1));
  }

  ngOnInit() {
    let orderId = this.route.snapshot.queryParamMap.get('orderId');
    let datePipe = new DatePipe("en-US");
    this.picklist$ = this.underfilledPicklistsService.getForOrder(orderId).pipe(shareReplay(1));
    this.picklistLines$ = this.underfilledPicklistLinesService.get(orderId).pipe(map(underfilledPicklistLines => {
      var displayObjects = underfilledPicklistLines.map(l => new UnderfilledPicklistLine(l));
      var result = _.orderBy(displayObjects, (x: UnderfilledPicklistLine) => [x.DestinationSortValue, x.ItemFormattedGenericName.toLowerCase()]);
      return result;
    }));
    this.getReportData(datePipe);
  }

  navigateBack(){
    this.wpfActionControllerService.ExecuteBackAction();
  }

  getReportData(datePipe: DatePipe){
    this.reportPickListLines$ = this.picklistLines$.pipe(
      map(underfilled => {
        underfilled.forEach(function(element)
        {
          let date = element.FillDate;
          element.PrintFillDate = datePipe.transform(date, 'M/d/yy h:mm a');
          element.DisplayFillRequired = element.FillQuantity + ' / ' + element.OrderQuantity;
          if(element.PatientRoom && element.PatientRoom !== '')
            element.DisplayDestionationValue  = element.PatientRoom + ',';
            
            if(element.ItemFormattedGenericName && element.ItemFormattedGenericName.length > 40) {
              let reg = new RegExp(".{1," + 18 + "}","g");
              let parts = element.ItemFormattedGenericName.match(reg);
              element.ItemFormatedDescription =  parts.join('\n');
              element.ItemFormattedGenericName = '';
            }
            if(element.ItemBrandName && element.ItemBrandName.length > 40) {
              let reg = new RegExp(".{1," + 18 + "}","g");
              let parts = element.ItemBrandName.match(reg);
              element.ItemBrandDescription =  parts.join('\n');
              element.ItemBrandName = '';
            }  
            if(element.ItemId && element.ItemId.length > 40) {
              let reg = new RegExp(".{1," + 18 + "}","g");
              let parts = element.ItemBrandName.match(reg);
              element.ItemIdDescription =  parts.join('\n');
              element.ItemId = '';
            }
        })
        return underfilled;
      })
    );
    
  }

  print() {
    this.requestStatus = 'printing';
    var colDefinitions: ITableColumnDefintion<UnderfilledPicklistLine>[] = [
      { cellPropertyNames: [ 'ItemFormattedGenericName','ItemFormatedDescription','ItemBrandName','ItemBrandDescription','ItemId','ItemIdDescription'], headerResourceKey: this.itemHeaderKey, width: "auto" },
      { cellPropertyNames: [ 'PharmacyQOH' ], headerResourceKey: this.qohHeaderKey, width: "*" },
      { cellPropertyNames: [ 'DisplayDestionationValue','AreaDescription','PatientName','DestinationOmni' ], headerResourceKey: this.destinationHeaderKey, width: "*" },
      { cellPropertyNames: [ 'DisplayFillRequired','UnfilledReason' ], headerResourceKey: this.qtyFilledHeaderKey, width: "*" },
      { cellPropertyNames: [ 'PrintFillDate'], headerResourceKey: this.dateHeaderKey, width: "auto" },
    ];

    let sortedFilled$ = this.reportPickListLines$.pipe(map(underFill => {
      return _.orderBy(underFill, x => x.DescriptionSortValue, 'asc');
    }));

    this.getDocumentData();
    let tableBody$ = this.tableBodyService.buildTableBody(colDefinitions, sortedFilled$);
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
  private getDocumentData() {
    let pickList: IUnderfilledPicklist;
    let reportBasedata: IAngularReportBaseData;
    this.picklist$.subscribe((listData)=> {pickList = listData});
    this.reportBaseData$.subscribe((baseData) => { reportBasedata = baseData });
    reportBasedata.OrderId = pickList.OrderId;
    reportBasedata.PriorityCode = pickList.PriorityCode;
    this.reportBaseData$ = of(reportBasedata);
  }
  private displayPrintFailed() {
    this.simpleDialogService.displayErrorOk('PRINT_FAILED_DIALOG_TITLE', 'PRINT_FAILED_DIALOG_MESSAGE');
  }
}
