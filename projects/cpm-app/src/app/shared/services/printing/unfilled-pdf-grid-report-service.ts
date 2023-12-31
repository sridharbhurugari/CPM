import { Injectable } from '@angular/core';
import { IAngularReportBaseData } from '../../../api-core/data-contracts/i-angular-report-base-data';
import { PdfPrintService } from '../../../api-core/services/pdf-print-service';
import { OcapUrlBuilderService } from '../ocap-url-builder.service';
import { TDocumentDefinitions, ContentTable } from 'pdfmake/interfaces';
import { Observable, bindCallback, of, throwError, forkJoin } from 'rxjs';
import { switchMap, shareReplay, catchError, map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { IReportLabels } from './i-report-labels';
import { PdfMakeService } from './pdf-make.service';
import { ImageDataService } from '../images/image-data.service';
@Injectable({
  providedIn: 'root',
})
export class UnfilledPdfGridReportService {
  reportBaseData$: Observable<IAngularReportBaseData>;
  reportLogo$: Observable<string>;
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
    const reportLabelKeys: (keyof IReportLabels)[] = ['REPORT_LABEL_OMNI_ID', 'REPORT_LABEL_OMNI_NAME', 'REPORT_LABEL_PRINTED', 'UNFILLED_REPORT_LABEL_ORDER_ID', 'UNFILLED_REPORT_LABEL_PRIORITYCODE'];
    this.reportLabels$ = translateService.get(reportLabelKeys).pipe(shareReplay(1), catchError(err => of(err.status)));
  }

  printMe(reportBaseDataPrintMe: IAngularReportBaseData, tableBodyPrintMe: ContentTable, reportTitle: string): Observable<boolean> {
    try {
      const printingResult = forkJoin(this.reportLogo$, this.reportLabels$).pipe(switchMap(
        c => {
          const reportLogoData = c[0];
          const reportLabels = c[1];
          return this.print(reportBaseDataPrintMe, reportLogoData, tableBodyPrintMe, reportTitle, reportLabels);
        }
      ));
      return printingResult;
    } catch (e) {
      console.log('printMe ERROR', e);
      return of(false);
    }
  }

  private print(reportBaseData: IAngularReportBaseData, reportLogoDataUrl: string, tableBodyPrintMe: ContentTable, reportTitle: string, reportLabels: IReportLabels): Observable<boolean> {
    try {
      const pdf = this.generatePdf(reportBaseData, reportLogoDataUrl, tableBodyPrintMe, reportTitle, reportLabels);
      console.log("print pdf", pdf);
      const boundGetBlob = pdf.getBlob.bind(pdf);
      console.log("boundGetBlob", boundGetBlob);
      const blob$ = bindCallback<Blob>(boundGetBlob)().pipe(
        catchError((err) => {
          console.log('error caught when calling printPdf:', err);
          return throwError(err);    //Rethrow it back to component
        }));
      console.log("blob$", blob$);
      return blob$.pipe(switchMap((blob: Blob) => {
        console.log("printPdf(blob)", blob);
        return this.pdfPrintService.printPdf(blob).pipe(
          catchError((err) => {
            console.log('error caught when calling printPdf:', err);
            return throwError(err);    //Rethrow it back to component
          }));
      }), catchError(err => of(err.status)));
    } catch (e) {
      console.log('print ERROR', e);
      return of(false);
    }
  }

  private generatePdf(reportBaseData: IAngularReportBaseData, reportLogoDataUrl: string, tableBodyPdf: ContentTable, reportTitle: string, reportLabels: IReportLabels): pdfMake.TCreatedPdf {
    console.log("Enter generatePdf:", reportBaseData, reportLogoDataUrl, tableBodyPdf, reportTitle, reportLabels);
    const documentDefinition = this.getDocumentDefinitionForUnfilled(reportBaseData, reportLogoDataUrl, tableBodyPdf, reportTitle, reportLabels);
    console.log("generatePdf documentDefinition", documentDefinition);
    const pdf = this.pdfMakeService.createPdf(documentDefinition);
    return pdf;
  }

  // for Unfilled report
  private getDocumentDefinitionForUnfilled(reportBaseData: IAngularReportBaseData, reportLogo: any, tableBodyDoc: ContentTable, reportTitle: string, reportLabels: IReportLabels): TDocumentDefinitions {
    return {
      footer: (currentPage: number, pageCount: number) => {
        return [
          {
            columns: [
              { text: reportBaseData.SiteDescription, alignment: 'left', fontSize: 8, margin: 5 },
              { text: reportBaseData.CombinedAddress, alignment: 'center', fontSize: 8, margin: 5 },
              { text: currentPage.toString() + '/' + pageCount, alignment: 'right', fontSize: 8, margin: 5 },
            ],
          }];
      },
      header: (currentPage: number, pageCount: number) => {
        return [
          {
            columns: [
              { text: '', alignment: 'left', fontSize: 8, margin: 5 },
              { text: '', alignment: 'center', fontSize: 8, margin: 5 },
              { text: '', alignment: 'right', fontSize: 8, margin: 5 },
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
            { text: reportTitle, alignment: 'right', style: 'header', fontSize: 20, bold: true },
          ],
        },
        // line
        { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 595 - 2 * 40, y2: 5, lineWidth: 1 }] },
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
        { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 515, y2: 5, lineWidth: 1 }] },
        // blank line
        { text: '   ', alignment: 'center', fontSize: 12, bold: true, lineHeight: 1.25 },
        // report contents
        tableBodyDoc,
      ],
    };
  }
}
