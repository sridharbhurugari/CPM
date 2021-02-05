import {Injectable, Inject} from '@angular/core';
import {IAngularReportBaseData} from '../../../api-core/data-contracts/i-angular-report-base-data';
import {PdfPrintService} from '../../../api-core/services/pdf-print-service';
import {OcapUrlBuilderService} from '../ocap-url-builder.service';
import {TDocumentDefinitions, ContentTable} from 'pdfmake/interfaces';
import {Observable, forkJoin, bindCallback, of} from 'rxjs';
import {switchMap, shareReplay, catchError} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import {IReportLabels} from './i-report-labels';
import {PdfMakeService} from './pdf-make.service';
import {ImageDataService} from '../images/image-data.service';
@Injectable({
  providedIn: 'root',
})
export class UnfilledPdfGridReportService {
  reportBaseData$: Observable<IAngularReportBaseData>;
  reportLogo$: Observable<string>;
  reportLogoData: string;
  reportLabels$: Observable<IReportLabels>;

  constructor(
    private pdfPrintService: PdfPrintService,
    private ocapUrlBuilderService: OcapUrlBuilderService,
    private pdfMakeService: PdfMakeService,
    translateService: TranslateService,
    imageDataService: ImageDataService,
  ) {
    this.reportBaseData$ = this.pdfPrintService.getReportBaseData().pipe(shareReplay(1), catchError(err => of(err.status)));
    this.reportLogo$ = imageDataService.getBase64ImageFromUrl(this.ocapUrlBuilderService.buildUrl('/web/cpm-app/assets/img/reportlogo.png')).pipe(shareReplay(1), catchError(err => of(err.status)));
    this.reportLogo$.subscribe((data) => {
      this.reportLogoData = data; console.log('Logo info received: ', this.reportLogoData);
    });
    const reportLabelKeys: (keyof IReportLabels)[] = ['REPORT_LABEL_OMNI_ID', 'REPORT_LABEL_OMNI_NAME', 'REPORT_LABEL_PRINTED', 'UNFILLED_REPORT_LABEL_ORDER_ID', 'UNFILLED_REPORT_LABEL_PRIORITYCODE'];
    this.reportLabels$ = translateService.get(reportLabelKeys).pipe(shareReplay(1), catchError(err => of(err.status)));
  }

  prePrint(reportBaseData: IAngularReportBaseData, tableBodyPrintMe: ContentTable, reportTitle: string): boolean {
    try {
      if (!this.reportLogoData) {
        console.log('Missing logo info:', this.reportLogoData);
        return false;
      }
      let reportLabels: IReportLabels = {
        REPORT_LABEL_OMNI_ID: '',
        REPORT_LABEL_OMNI_NAME: '',
        REPORT_LABEL_PRINTED: '',
        UNFILLED_REPORT_LABEL_ORDER_ID: '',
        UNFILLED_REPORT_LABEL_PRIORITYCODE: '',
        REPORT_LABEL_XR2_DEVICE_ID: '',
      };
      this.reportLabels$.subscribe((data) => reportLabels = data, console.error );
      const pdf = this.generatePdf(reportBaseData, this.reportLogoData, tableBodyPrintMe, reportTitle, reportLabels);
      console.log("prePrint pdf:", pdf);
      return true;
    } catch (e) {
      console.log('prePrint ERROR', e);
      return false;
    }
  }

  printMe(reportBaseDataPrintMe: IAngularReportBaseData, tableBodyPrintMe: ContentTable, reportTitle: string): Observable<boolean> {
    try {
      if (!this.reportLogoData) {
        console.log('Missing logo info:', this.reportLogoData);
        return of(false);
      }
      let reportLabels: IReportLabels = {
        REPORT_LABEL_OMNI_ID: '',
        REPORT_LABEL_OMNI_NAME: '',
        REPORT_LABEL_PRINTED: '',
        UNFILLED_REPORT_LABEL_ORDER_ID: '',
        UNFILLED_REPORT_LABEL_PRIORITYCODE: '',
        REPORT_LABEL_XR2_DEVICE_ID: '',
      };
      this.reportLabels$.subscribe((data) => reportLabels = data, console.error );
      return this.print(reportBaseDataPrintMe, this.reportLogoData, tableBodyPrintMe, reportTitle, reportLabels);
    } catch (e) {
      console.log('printMe ERROR', e);
      return of(false);
    }
  }

  private print(reportBaseData: IAngularReportBaseData, reportLogoDataUrl: string, tableBodyPrintMe: ContentTable, reportTitle: string, reportLabels: IReportLabels): Observable<boolean> {
    try {
      const pdf = this.generatePdf(reportBaseData, reportLogoDataUrl, tableBodyPrintMe, reportTitle, reportLabels);
      const boundGetBlob = pdf.getBlob.bind(pdf);
      const blob$ = bindCallback<Blob>(boundGetBlob)();
      return blob$.pipe(switchMap((blob: Blob) => {
        return this.pdfPrintService.printPdf(blob);
      }), catchError(err => of(err.status)));
    } catch (e) {
      console.log('print ERROR', e);
      return of(false);
    }
  }

  private generatePdf(reportBaseData: IAngularReportBaseData, reportLogoDataUrl: string, tableBody: ContentTable, reportTitle: string, reportLabels: IReportLabels): pdfMake.TCreatedPdf {
    const documentDefinition = this.getDocumentDefinitionForUnfilled(reportBaseData, reportLogoDataUrl, tableBody, reportTitle, reportLabels);
    const pdf = this.pdfMakeService.createPdf(documentDefinition);
    return pdf;
  }

  // for Unfilled report
  private getDocumentDefinitionForUnfilled(reportBaseData: IAngularReportBaseData, reportLogo: any, tableBody: ContentTable, reportTitle: string, reportLabels: IReportLabels): TDocumentDefinitions {
    return {
      footer: (currentPage: number, pageCount: number) => {
        return [
          {
            columns: [
              {text: reportBaseData.SiteDescription, alignment: 'left', fontSize: 8, margin: 5},
              {text: reportBaseData.CombinedAddress, alignment: 'center', fontSize: 8, margin: 5},
              {text: currentPage.toString() + '/' + pageCount, alignment: 'right', fontSize: 8, margin: 5},
            ],
          }];
      },
      header: (currentPage: number, pageCount: number) => {
        return [
          {
            columns: [
              {text: '', alignment: 'left', fontSize: 8, margin: 5},
              {text: '', alignment: 'center', fontSize: 8, margin: 5},
              {text: '', alignment: 'right', fontSize: 8, margin: 5},
            ],
          }];
      },
      content: [
        // logo and title
        {
          columns: [
            {
              image: reportLogo,
              width: 82,
              height: 18,
            },
            {text: reportTitle, alignment: 'right', style: 'header', fontSize: 20, bold: true},
          ],
        },
        // line
        {canvas: [{type: 'line', x1: 0, y1: 5, x2: 595 - 2 * 40, y2: 5, lineWidth: 1}]},
        // report base data
        {
          layout: 'noBorders', // optional
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 0,
            widths: [50, 75, 150, 50, '*'],
            body: [
              ['', reportLabels.UNFILLED_REPORT_LABEL_ORDER_ID, reportBaseData.OrderId, reportLabels.REPORT_LABEL_PRINTED, reportBaseData.FormattedDateTime],
              ['', reportLabels.UNFILLED_REPORT_LABEL_PRIORITYCODE, reportBaseData.PriorityCode, '', ''],
              ['', '', '', '', ''],
              ['', reportLabels.REPORT_LABEL_OMNI_NAME, reportBaseData.OmniName, '', ''],
            ],
          },
        },
        // line
        {canvas: [{type: 'line', x1: 0, y1: 5, x2: 515, y2: 5, lineWidth: 1}]},
        // blank line
        {text: '   ', alignment: 'center', fontSize: 12, bold: true, lineHeight: 1.25},
        // report contents
        tableBody,
      ],
    };
  }
}
