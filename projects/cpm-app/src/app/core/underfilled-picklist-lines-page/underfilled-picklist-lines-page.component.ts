import { Component, OnInit, ViewChild } from '@angular/core';
import { UnderfilledPicklistLinesService } from '../../api-core/services/underfilled-picklist-lines.service';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Observable, of } from 'rxjs';
import { UnderfilledPicklistLine } from '../model/underfilled-picklist-line';
import { map, shareReplay } from 'rxjs/operators';
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
import { HttpErrorResponse } from '@angular/common/http';
import {   PopupDialogService,
  PopupDialogProperties,
  PopupDialogType, } from '@omnicell/webcorecomponents';
import { UnderfilledPicklistLinesComponent } from '../underfilled-picklist-lines/underfilled-picklist-lines.component';
import * as _ from 'lodash';
import { ResetPickRoutesService } from '../../api-core/services/reset-pick-routes';
import { WorkstationTrackerService } from '../../api-core/services/workstation-tracker.service';
import { WorkstationTrackerData } from '../../api-core/data-contracts/workstation-tracker-data';
import { OperationType } from '../../api-core/data-contracts/operation-type';

@Component({
  selector: 'app-underfilled-picklist-lines-page',
  templateUrl: './underfilled-picklist-lines-page.component.html',
  styleUrls: ['./underfilled-picklist-lines-page.component.scss']
})
export class UnderfilledPicklistLinesPageComponent implements OnInit {
  itemHeaderKey = 'DESCRIPTION_ID';
  qohHeaderKey = 'PHARMACY_QOH';
  destinationHeaderKey = 'DESTINATION';
  qtyFilledHeaderKey = 'QTY_FILLED_REQUESTED';
  dateHeaderKey = 'DATE';
  picklistLines$: Observable<UnderfilledPicklistLine[]>;
  reportPickListLines$: Observable<UnderfilledPicklistLine[]>;
  picklist$: Observable<IUnderfilledPicklist>;
  reportTitle$: Observable<string>;
  requestStatus: 'none' | 'printing' | 'reroute' | 'complete' = 'none';
  reportBaseData$: Observable<IAngularReportBaseData>;
  errorGenericTitle$: Observable<string>;
  errorGenericMessage$: Observable<string>;
  okButtonText: string;
  errorRerouteTitle$: Observable<string>;
  errorRerouteMessage$: Observable<string>;
  errorCloseTitle$: Observable<string>;
  errorCloseMessage$: Observable<string>;
  ItemCountTotal$: Observable<number>;
  ItemCountSelected$: Observable<number>;
  currentItemCountSelected = 0;
  buttonEnabled = false;
  buttonVisible = false;
  workstationTrackerData: WorkstationTrackerData;
  workstation: string;
  constructor(
    private route: ActivatedRoute,
    private underfilledPicklistsService: UnderfilledPicklistsService,
    private pdfGridReportService: PdfGridReportService,
    private tableBodyService: TableBodyService,
    private simpleDialogService: SimpleDialogService,
    private underfilledPicklistLinesService: UnderfilledPicklistLinesService,
    private resetPickRoutesService: ResetPickRoutesService,
    private wpfActionControllerService: WpfActionControllerService,
    public translateService: TranslateService,
    public pdfPrintService: PdfPrintService,
    private dialogService: PopupDialogService,
    private workstationTrackerService: WorkstationTrackerService
  ) {
    this.reportTitle$ = translateService.get('UNFILLED');
    this.reportBaseData$ = pdfPrintService.getReportBaseData().pipe(shareReplay(1));
  }

  @ViewChild(UnderfilledPicklistLinesComponent, null) child: UnderfilledPicklistLinesComponent;
  ngOnInit() {
    try {
    const orderId = this.route.snapshot.queryParamMap.get('orderId');
    const datePipe = new DatePipe("en-US");
    this.picklist$ = this.underfilledPicklistsService.getForOrder(orderId).pipe(shareReplay(1));
    this.picklistLines$ = this.underfilledPicklistLinesService.get(orderId).pipe(map(underfilledPicklistLines => {
      const displayObjects = underfilledPicklistLines.map(l => new UnderfilledPicklistLine(l));
      const result = _.orderBy(displayObjects,
         (x: UnderfilledPicklistLine) => [x.DestinationSortValue, x.ItemFormattedGenericName.toLowerCase()]);
      return result;
    }));
    // permission: are buttons visible
    this.underfilledPicklistsService.doesUserHaveDeletePicklistPermissions().subscribe(v => this.buttonVisible = v);
    // error message text
    this.errorGenericTitle$ = this.translateService.get('ERROR_ROUTE_MAINTENANCE_TITLE');
    this.errorGenericMessage$ = this.translateService.get('ERROR_ROUTE_MAINTENANCE_MESSAGE');
    this.translateService.get('OK').subscribe(s => this.okButtonText = s);
    this.errorRerouteTitle$ = this.translateService.get('FAILEDTOREROUTE_HEADER_TEXT');
    this.errorRerouteMessage$ = this.translateService.get('FAILEDTOREROUTE_BODY_TEXT');
    this.errorCloseTitle$ = this.translateService.get('FAILEDTOCLOSE_HEADER_TEXT');
    this.errorCloseMessage$ = this.translateService.get('FAILEDTOCLOSE_BODY_TEXT');
    this.workstationTrackerService.GetWorkstationShortName().subscribe(s => {
      this.workstation = s;
      this.workstationTrackerData = {
        Id: orderId,
        Operation: OperationType.Unfilled,
        ConnectionId: null,
        WorkstationShortName: this.workstation
      };
    });

    this.getReportData(datePipe);
    } catch (e) {
      console.log('UnderfilledPicklistLinesPageComponent.ngOnInit ERROR');
      console.log(e);
    }
  }

  ngAfterViewInit() {
    this.child.SelectedItemCount$.subscribe(n => this.currentItemCountSelected = n);
  }

  navigateBack() {
    this.workstationTrackerService.UnTrack(this.workstationTrackerData).subscribe().add(() => {
      this.wpfActionControllerService.ExecuteBackAction();
    });
  }

  getReportData(datePipe: DatePipe) {
    this.reportPickListLines$ = this.picklistLines$.pipe(
      map(underfilled => {
        underfilled.forEach(element => {
          const date = element.FillDate;
          element.PrintFillDate = datePipe.transform(date, 'M/d/yy   h:mm a');
          element.DisplayFillRequired = (element.FillQuantity ? element.FillQuantity.toString() : '0') + ' / ' + element.OrderQuantity;
          if (element.PatientRoom && element.PatientRoom !== '') {
            element.DisplayDestionationValue  = element.PatientRoom + ',';
          }

          if (element.ItemFormattedGenericName && element.ItemFormattedGenericName.length > 40) {
              const reg = new RegExp('.{1,' + 18 + '}', 'g');
              const parts = element.ItemFormattedGenericName.match(reg);
              element.ItemFormatedDescription =  parts.join('\n');
              element.ItemFormattedGenericName = '';
            }
          if (element.ItemBrandName && element.ItemBrandName.length > 40) {
              const reg = new RegExp('.{1,' + 18 + '}', 'g');
              const parts = element.ItemBrandName.match(reg);
              element.ItemBrandDescription =  parts.join('\n');
              element.ItemBrandName = '';
            }
          if (element.ItemId && element.ItemId.length > 40) {
              const reg = new RegExp('.{1,' + 18 + '}', 'g');
              const parts = element.ItemBrandName.match(reg);
              element.ItemIdDescription =  parts.join('\n');
              element.ItemId = '';
            }
          if (element.AreaDescription && element.AreaDescription.length > 21) {
              const reg = new RegExp('.{1,' + 10 + '}', 'g');
              const parts = element.AreaDescription.match(reg);
              element.AreaDesctiptionForReport = parts.join('\n');
              element.AreaDescription = '';
            }
          if (element.PatientName && element.PatientName.length > 21) {
              const reg = new RegExp('.{1,' + 10 + '}', 'g');
              const parts = element.PatientName.match(reg);
              element.patientNameForReport = parts.join('\n');
              element.PatientName = '';
            }
          if (element.DestinationOmni && element.DestinationOmni.length > 21) {
              const reg = new RegExp('.{1,' + 10 + '}', 'g');
              const parts = element.DestinationOmni.match(reg);
              element.DestinationOmniForReport = parts.join('\n');
              element.DestinationOmni = '';
            }
        });
        return underfilled;
      })
    );
  }

getRerouteButtonEnabled(): boolean  {
  return (this.child.SelectedButCannotRerouteCount() === 0) && this.getButtonEnabled();
  }

getButtonEnabled(): boolean  {
    let returnValue = true;
    if (this.currentItemCountSelected === 0) {
     returnValue = false;
  }
    if (this.requestStatus !== 'none') {
   returnValue = false;
  }
    return returnValue;
  }

  getSelected(): string[] {
    let selected: string[] = [];
    const pll = this.child.picklistLines;
    selected = _.filter(pll, { IsChecked: true }).map(f => f.PicklistLineId);
    return selected;
  }

  clearCheckedItems() {
    const pll = this.child.picklistLines;
    const keep = _.filter(pll, { IsChecked: false });
    this.child.picklistLines = keep;
    this.child.updateAllCheckboxValues(false);
  }

  reroute() {
    this.requestStatus = 'reroute';
    const selected: string[] = this.getSelected();
    this.resetPickRoutesService.reset(selected).subscribe(succeeded => {
      this.requestStatus = 'none';
      this.clearCheckedItems();
      this.exitIfListIsEmpty();
    }, err => {
      this.onRerouteFailed(err);
    });
  }

  close() {
    this.requestStatus = 'complete';
    const selected: string[] = this.getSelected();
    this.underfilledPicklistLinesService.close(selected).subscribe(succeeded => {
      this.requestStatus = 'none';
      this.clearCheckedItems();
      this.exitIfListIsEmpty();
    }, err => {
      this.onCloseFailed(err);
    });
  }

  exitIfListIsEmpty() {
    if (this.child.TotalItemCount() === 0) {
      this.navigateBack();
    }
  }

  print() {
    this.requestStatus = 'printing';
    const colDefinitions: ITableColumnDefintion<UnderfilledPicklistLine>[] = [
      { cellPropertyNames: [ 'ItemFormattedGenericName', 'ItemFormatedDescription', 'ItemBrandName', 'ItemBrandDescription', 'ItemId', 'ItemIdDescription']
        , headerResourceKey: this.itemHeaderKey, width: 'auto' },
      { cellPropertyNames: [ 'PharmacyQOH' ], headerResourceKey: this.qohHeaderKey, width: '*' },
      { cellPropertyNames: [ 'DisplayDestionationValue', 'AreaDescription', 'AreaDesctiptionForReport', 'PatientName', 'patientNameForReport', 'DestinationOmni', 'DestinationOmniForReport' ]
        , headerResourceKey: this.destinationHeaderKey, width: 'auto' },
      { cellPropertyNames: [ 'DisplayFillRequired', 'UnfilledReason' ], headerResourceKey: this.qtyFilledHeaderKey, width: '*' },
      { cellPropertyNames: [ 'PrintFillDate'], headerResourceKey: this.dateHeaderKey, width: 'auto' },
    ];

    const sortedFilled$ = this.reportPickListLines$.pipe(map(underFill => {
      return _.orderBy(underFill, x => x.DescriptionSortValue, 'asc');
    }));

    this.getDocumentData();
    const tableBody$ = this.tableBodyService.buildTableBody(colDefinitions, sortedFilled$);
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
    this.picklist$.subscribe((listData) => {pickList = listData; });
    this.reportBaseData$.subscribe((baseData) => { reportBasedata = baseData; });
    reportBasedata.OrderId = pickList.OrderId;
    reportBasedata.PriorityCode = pickList.PriorityCode;
    this.reportBaseData$ = of(reportBasedata);
  }

  private displayPrintFailed() {
    this.simpleDialogService.displayErrorOk('PRINT_FAILED_DIALOG_TITLE', 'PRINT_FAILED_DIALOG_MESSAGE');
  }

  onRerouteFailed(error: HttpErrorResponse): any {
    this.requestStatus = 'none';
    if (error.status === 400) {
      forkJoin(this.errorRerouteTitle$, this.errorRerouteMessage$).subscribe(r => {
        this.displayError(r[0], r[0], r[1]);
      });
    } else {
      forkJoin(this.errorGenericTitle$, this.errorGenericMessage$).subscribe(r => {
        this.displayError(r[0], r[0], r[1]);
      });
    }
  }

  onCloseFailed(error: HttpErrorResponse): any {
    this.requestStatus = 'none';
    if (error.status === 400) {
      forkJoin(this.errorCloseTitle$, this.errorCloseMessage$).subscribe(r => {
        this.displayError(r[0], r[0], r[1]);
      });
    } else {
      forkJoin(this.errorGenericTitle$, this.errorGenericMessage$).subscribe(r => {
        this.displayError(r[0], r[0], r[1]);
      });
    }
  }

  displayError(uniqueId, title, message) {
    const properties = new PopupDialogProperties(uniqueId);
    properties.primaryButtonText = this.okButtonText;
    properties.titleElementText = title;
    properties.messageElementText = message;
    properties.showPrimaryButton = true;
    properties.showSecondaryButton = false;
    properties.dialogDisplayType = PopupDialogType.Error;
    properties.timeoutLength = 0;
    this.dialogService.showOnce(properties);
  }
}
