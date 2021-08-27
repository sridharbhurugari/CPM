import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UnderfilledPicklistLinesService } from '../../api-core/services/underfilled-picklist-lines.service';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Observable, of, merge, Subject } from 'rxjs';
import { UnderfilledPicklistLine } from '../model/underfilled-picklist-line';
import { map, shareReplay, switchMap, scan, takeUntil, catchError } from 'rxjs/operators';
import { UnderfilledPicklistsService } from '../../api-core/services/underfilled-picklists.service';
import { IUnderfilledPicklist } from '../../api-core/data-contracts/i-underfilled-picklist';
import { TableBodyService } from '../../shared/services/printing/table-body.service';
import { UnfilledPdfGridReportService } from '../../shared/services/printing/unfilled-pdf-grid-report-service';
import { TranslateService } from '@ngx-translate/core';
import { SimpleDialogService } from '../../shared/services/dialogs/simple-dialog.service';
import { IAngularReportBaseData } from '../../api-core/data-contracts/i-angular-report-base-data';
import { ITableColumnDefintion } from '../../shared/services/printing/i-table-column-definition';
import { PdfPrintService } from '../../api-core/services/pdf-print-service';
import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {
  PopupDialogService,
  PopupDialogProperties,
  PopupDialogType,
} from '@omnicell/webcorecomponents';
import { UnderfilledPicklistLinesComponent } from '../underfilled-picklist-lines/underfilled-picklist-lines.component';
import * as _ from 'lodash';
import { ResetPickRoutesService } from '../../api-core/services/reset-pick-routes';
import { WorkstationTrackerService } from '../../api-core/services/workstation-tracker.service';
import { WorkstationTrackerData } from '../../api-core/data-contracts/workstation-tracker-data';
import { OperationType } from '../../api-core/data-contracts/operation-type';
import { PickingEventConnectionService } from '../../api-core/services/picking-event-connection.service';
import { IUnfilledPicklistlineAddedOrUpdatedEvent } from '../../api-core/events/i-unfilled-picklistline-added-or-updated-event';
import { IUnfilledPicklistlineRemovedEvent } from '../../api-core/events/i-unfilled-picklistline-removed-event';
import { IUnderfilledPicklistLine } from '../../api-core/data-contracts/i-underfilled-picklist-line';
import { ReportConstants } from '../../shared/constants/report-constants';
import { ContentTable } from 'pdfmake/interfaces';
import { WpfInteropService } from '../../shared/services/wpf-interop.service';

@Component({
  selector: 'app-underfilled-picklist-lines-page',
  templateUrl: './underfilled-picklist-lines-page.component.html',
  styleUrls: ['./underfilled-picklist-lines-page.component.scss']
})
export class UnderfilledPicklistLinesPageComponent implements OnInit, OnDestroy {
  ngUnsubscribe = new Subject();
  itemHeaderKey = 'DESCRIPTION_ID';
  qohHeaderKey = 'PHARMACY_QOH';
  destinationHeaderKey = 'DESTINATION';
  qtyFilledHeaderKey = 'QTY_FILLED_REQUESTED';
  dateHeaderKey = 'DATE';
  picklist$: Observable<IUnderfilledPicklist>;
  picklistLines$: Observable<UnderfilledPicklistLine[]>;
  picklistLines: UnderfilledPicklistLine[];
  reportTitle$: Observable<string>;
  requestStatus: 'none' | 'printing' | 'reroute' | 'complete' = 'none';
  reportBaseData$: Observable<IAngularReportBaseData>;
  reportBaseData: IAngularReportBaseData = {
    Address1: '',
    Address2: '',
    Address3: '',
    CombinedAddress: '',
    FormPrinterName: '',
    FormattedDateTime: '',
    OmniId: '',
    OmniName: '',
    SiteDescription: '',
    OrderId: '',
    PriorityCode: '',
    DeviceDescriptionName: ''
  };
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
  currentUrl: string;

  constructor(
    private route: ActivatedRoute,
    private underfilledPicklistsService: UnderfilledPicklistsService,
    private pdfGridReportService: UnfilledPdfGridReportService,
    private tableBodyService: TableBodyService,
    private simpleDialogService: SimpleDialogService,
    private underfilledPicklistLinesService: UnderfilledPicklistLinesService,
    private resetPickRoutesService: ResetPickRoutesService,
    public translateService: TranslateService,
    public pdfPrintService: PdfPrintService,
    private dialogService: PopupDialogService,
    private workstationTrackerService: WorkstationTrackerService,
    private pickingEventConnectionService: PickingEventConnectionService,
    private router: Router,
    private wpfInteropService: WpfInteropService
  ) {
    this.reportTitle$ = translateService.get('UNFILLED');
    this.reportBaseData$ = pdfPrintService.getReportBaseData();
    this.wpfInteropService.wpfViewModelClosing.pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => {
      this.unTrack();
    });

  }

  @ViewChild(UnderfilledPicklistLinesComponent, null) child: UnderfilledPicklistLinesComponent;
  ngOnInit() {
    try {
      const orderId = this.route.snapshot.queryParamMap.get('orderId');
      this.picklist$ = this.underfilledPicklistsService.getForOrder(orderId).pipe(shareReplay(1), catchError(err => of(err.status)));

      this.picklistLines$ = this.underfilledPicklistLinesService.get(orderId).pipe(shareReplay(1)).pipe(map(x => {
        return x.map(l => new UnderfilledPicklistLine(l));
      }), catchError(err => of(err.status)));
      this.picklistLines$.subscribe((pll) => { this.picklistLines = pll; });

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
      this.workstationTrackerService.GetWorkstationName().subscribe(s => {
        this.workstation = s.WorkstationShortName;
        this.workstationTrackerData = {
          Id: orderId,
          Operation: OperationType.Unfilled,
          ConnectionId: null,
          WorkstationShortName: this.workstation,
          WorkstationFriendlyName: s.WorkstationFriendlyName
        };
      });
      this.getDocumentData();
    } catch (e) {
      console.log('UnderfilledPicklistLinesPageComponent.ngOnInit ERROR', e);
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngAfterViewInit() {
    this.child.SelectedItemCount$.subscribe(n => this.currentItemCountSelected = n);
    this.pickingEventConnectionService.updateUnfilledPicklistLineSubject
      .pipe(takeUntil(this.ngUnsubscribe), catchError(err => of(err.status)))
      .subscribe(event => this.onPllUpsert(event));
    this.pickingEventConnectionService.removedUnfilledPicklistLineSubject
      .pipe(takeUntil(this.ngUnsubscribe), catchError(err => of(err.status)))
      .subscribe(event => this.onPllDelete(event));
  }

  private onPllUpsert(event: IUnfilledPicklistlineAddedOrUpdatedEvent) {
    try {
      if (!event) {
        return;
      }

      if (event.PicklistLineUnderfilled.OrderId === this.picklistLines[0].OrderId) {
        let index = this.picklistLines.findIndex((r) => r.PicklistLineId === event.PicklistLineUnderfilled.PicklistLineId);
        if (index != -1) {
          this.picklistLines.splice(index, 1)
        }
        const upll = new UnderfilledPicklistLine(event.PicklistLineUnderfilled);
        this.picklistLines.push(upll);
      }
    } catch (e) {
      console.log('UnderfilledPicklistLinesPageComponent.onPllAdd ERROR', e);
    }
  }

  private onPllDelete(event: IUnfilledPicklistlineRemovedEvent) {
    try {
      if (!event) {
        return;
      }

      let index = this.picklistLines.findIndex((r) => r.PicklistLineId === event.PicklistLineId.toString());
      if (index != -1) {
        this.picklistLines.splice(index, 1)
      }

    } catch (e) {
      console.log('UnderfilledPicklistLinesPageComponent.onPllDelete ERROR', e);
    }
  }
  navigateBack() {
    this.currentUrl = this.router.url;
    if(this.currentUrl && this.currentUrl.includes("underfilled/picklistLines")){
      this.workstationTrackerService.UnTrack(this.workstationTrackerData).subscribe().add(() => {
        this.router.navigate(['core/picklists/underfilled']);
      });
    }
  }

  unTrack() {
    this.workstationTrackerService.UnTrack(this.workstationTrackerData).subscribe();
  }

  getReportData(datePipe: DatePipe): UnderfilledPicklistLine[] {
    const underfilled = this.child.picklistLines;

    underfilled.forEach(element => {
      const date = element.FillDate;
      element.PrintFillDate = datePipe.transform(date, 'M/d/yy   h:mm a');
      element.DisplayFillRequired = (element.FillQuantity ? element.FillQuantity.toString() : '0') + ' / ' + element.OrderQuantity;
      if (element.PatientRoom && element.PatientRoom !== '') {
        element.DisplayDestionationValue = element.PatientRoom + ',';
      }

      if (element.ItemFormattedGenericName && element.ItemFormattedGenericName.length > 40) {
        const reg = new RegExp('.{1,' + 18 + '}', 'g');
        const parts = element.ItemFormattedGenericName.match(reg);
        element.ItemFormatedDescription = parts.join('\n');
        element.ItemFormattedGenericName = '';
      }
      if (element.ItemBrandName && element.ItemBrandName.length > 40) {
        const reg = new RegExp('.{1,' + 18 + '}', 'g');
        const parts = element.ItemBrandName.match(reg);
        element.ItemBrandDescription = parts.join('\n');
        element.ItemBrandName = '';
      }
      if (element.ItemId && element.ItemId.length > 40) {
        const reg = new RegExp('.{1,' + 18 + '}', 'g');
        const parts = element.ItemBrandName.match(reg);
        element.ItemIdDescription = parts.join('\n');
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
  }

  getRerouteButtonEnabled(): boolean {
    return (this.child.SelectedButCannotRerouteCount() === 0) && this.getButtonEnabled();
  }

  getButtonEnabled(): boolean {
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
      {
        cellPropertyNames: ['ItemFormattedGenericName', 'ItemFormatedDescription', 'ItemBrandName', 'ItemBrandDescription', 'ItemId', 'ItemIdDescription']
        , headerResourceKey: this.itemHeaderKey, width: 'auto'
      },
      { cellPropertyNames: ['PharmacyQOH'], headerResourceKey: this.qohHeaderKey, width: '*' },
      {
        cellPropertyNames: ['DisplayDestionationValue', 'AreaDescription', 'AreaDesctiptionForReport', 'PatientName', 'patientNameForReport', 'DestinationOmni', 'DestinationOmniForReport']
        , headerResourceKey: this.destinationHeaderKey, width: 'auto'
      },
      { cellPropertyNames: ['DisplayFillRequired', 'UnfilledReason'], headerResourceKey: this.qtyFilledHeaderKey, width: '*' },
      { cellPropertyNames: ['PrintFillDate'], headerResourceKey: this.dateHeaderKey, width: 'auto' },
    ];

    this.getDocumentData();
    const datePipe = new DatePipe("en-US");
    const rptData = this.getReportData(datePipe);
    const sortedFilled$ = of(rptData).pipe(map(underFill => {
      return _.orderBy(underFill, x => x.DescriptionSortValue, 'asc');
    }), catchError(err => of(err.status)));

    // snapshot TableData for running through the pdf creator:
    const tableBodyPrintMe$ = this.tableBodyService.buildTableBody(colDefinitions, sortedFilled$);
    let tableBodyPrintMe: ContentTable;
    tableBodyPrintMe$.subscribe((data) => tableBodyPrintMe = data, console.error);

    this.pdfGridReportService.printMe(this.reportBaseData, tableBodyPrintMe, ReportConstants.UnfilledReport).subscribe(succeeded => {
      this.requestStatus = 'none';
      if (!succeeded) {
        console.log('printMe returned Failed')
        this.displayPrintFailed();
      } else {
        this.simpleDialogService.displayInfoOk('PRINT_SUCCEEDED_DIALOG_TITLE', 'PRINT_SUCCEEDED_DIALOG_MESSAGE');
      }
    }, err => {
      console.log('printMe error: ', err)
      this.requestStatus = 'none';
      this.displayPrintFailed();
    });
  }

  private getDocumentData() {
    const docData$ = forkJoin(this.reportBaseData$, this.picklist$).pipe(map(results => {
      let reportBaseData = results[0];
      let picklist = results[1];
      reportBaseData.OrderId = picklist.OrderId;
      reportBaseData.PriorityCode = picklist.PriorityCode;
      return reportBaseData;
    }), shareReplay(), catchError(err => of(err.status)));
    docData$.subscribe((data) => this.reportBaseData = data,
      err => console.log('getDocumentData ERROR: ', err));
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
