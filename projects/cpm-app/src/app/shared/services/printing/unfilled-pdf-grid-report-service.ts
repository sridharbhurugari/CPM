import { Injectable, Inject } from '@angular/core';
import { IAngularReportBaseData } from '../../../api-core/data-contracts/i-angular-report-base-data';
import { PdfPrintService } from '../../../api-core/services/pdf-print-service';
import { OcapUrlBuilderService } from '../ocap-url-builder.service';
import { TDocumentDefinitions, ContentTable} from 'pdfmake/interfaces';
import { Observable, forkJoin, bindCallback } from 'rxjs';
import { switchMap, shareReplay } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { IReportLabels } from './i-report-labels';
import { PdfMakeService } from './pdf-make.service';
import { ImageDataService } from '../images/image-data.service';
import { ReportConstants } from '../../constants/report-constants';
//import { TDocumentDefinitions,ContentTable } from 'pdfmake/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UnfilledPdfGridReportService
{
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
    this.reportBaseData$ = this.pdfPrintService.getReportBaseData().pipe(shareReplay(1));
    this.reportLogo$ = imageDataService.getBase64ImageFromUrl(this.ocapUrlBuilderService.buildUrl('/web/cpm-app/assets/img/reportlogo.png'));
    this.reportLogo$.subscribe((data) => {this.reportLogoData = data; console.log("subscribe logo", this.reportLogoData); });
    const reportLabelKeys: (keyof IReportLabels)[] = [ 'REPORT_LABEL_OMNI_ID', 'REPORT_LABEL_OMNI_NAME', 'REPORT_LABEL_PRINTED', 'UNFILLED_REPORT_LABEL_ORDER_ID', 'UNFILLED_REPORT_LABEL_PRIORITYCODE',];
    this.reportLabels$ = translateService.get(reportLabelKeys).pipe(shareReplay(1));
  }

  printMe(reportBaseData: IAngularReportBaseData, tableBodyPrintMe: ContentTable, reportTitle: string): Observable<boolean> {
    console.log("subscribe logo", this.reportLogoData);
//    this.reportLogo$.subscribe((data) => {console.log("subscribe logo", data); this.reportLogoData = data;});

    let reportLabels: IReportLabels = {
      REPORT_LABEL_OMNI_ID: 'omni id:',
      REPORT_LABEL_OMNI_NAME: 'omni name:',
      REPORT_LABEL_PRINTED: 'printed:',
      UNFILLED_REPORT_LABEL_ORDER_ID : 'Order Id',
      UNFILLED_REPORT_LABEL_PRIORITYCODE: 'Priority type',
      REPORT_LABEL_XR2_DEVICE_ID: 'xr2 name'
    };
      this.reportLabels$.subscribe((data) => reportLabels = data, console.error );
console.log('pre-print', tableBodyPrintMe);
let rptBase: IAngularReportBaseData = JSON.parse(JSON.stringify(reportBaseData));
console.log('printMe - reportBaseData1', reportBaseData);
this.reportBaseData$.subscribe((data) => {rptBase = data; console.log('printMe - rptBase1', rptBase), console.error});
console.log('printMe - rptBase2', rptBase);
console.log('printMe - reportBaseData2', reportBaseData);
 return this.print(rptBase, this.reportLogoData, tableBodyPrintMe, reportTitle, reportLabels);
  }

  print(reportBaseData: IAngularReportBaseData, reportLogoDataUrl: string, tableBodyPrintMe: ContentTable, reportTitle: string, reportLabels: IReportLabels): Observable<boolean> {
    const pdf = this.generatePdf(reportBaseData, reportLogoDataUrl, tableBodyPrintMe, reportTitle, reportLabels);
    const boundGetBlob = pdf.getBlob.bind(pdf);
    const blob$ = bindCallback<Blob>(boundGetBlob)();
    return blob$.pipe(switchMap((blob: Blob) => {
       return this.pdfPrintService.printPdf(blob);
      }));
    // const result = this.pdfPrintService.printPdf(boundGetBlob);
    // return result;
  }

  private generatePdf(reportBaseData: IAngularReportBaseData, reportLogoDataUrl: string, tableBody: ContentTable, reportTitle: string, reportLabels: IReportLabels): pdfMake.TCreatedPdf {
    console.log('generatePdf - reportBaseData', reportBaseData);
    console.log('generatePdf - reportLogoDataUrl', reportLogoDataUrl);
    console.log('generatePdf - tableBody', tableBody);
    console.log('generatePdf - reportTitle', reportTitle);
    console.log('generatePdf - reportLabels', reportLabels);
    const documentDefinition = this.getDocumentDefinitionForUnfilled(reportBaseData, reportLogoDataUrl, tableBody, reportTitle, reportLabels);
    console.log('generatePdf - documentDefinition', documentDefinition);
    const pdf = this.pdfMakeService.createPdf(documentDefinition);
    console.log('generatePdf - pdf', pdf);
      return pdf;
  }

  //for Unfilled report
  private getDocumentDefinitionForUnfilled(reportBaseData: IAngularReportBaseData, reportLogo: any, tableBody: ContentTable, reportTitle: string, reportLabels: IReportLabels): TDocumentDefinitions {
    return {
      footer: (currentPage: number, pageCount: number) => {
        return [
          {
            columns: [
              { text: reportBaseData.SiteDescription, alignment: 'left', fontSize: 8, margin: 5 },
              { text: reportBaseData.CombinedAddress, alignment: 'center', fontSize: 8, margin: 5 },
              { text: currentPage.toString() + '/' + pageCount, alignment: 'right', fontSize: 8, margin: 5 }
            ]
          }]
      },
      header: (currentPage: number, pageCount: number) => {
        return [
          {
            columns: [
              { text: '', alignment: 'left', fontSize: 8, margin: 5 },
              { text: '', alignment: 'center', fontSize: 8, margin: 5 },
              { text: '', alignment: 'right', fontSize: 8, margin: 5 }
            ]
          }]
      },
      content: [
        // logo and title
        {
          columns: [
            // {
            //   image: reportLogo,
            //   width: 82,
            //   height: 18
            // },
            { text: reportTitle, alignment: 'right', style: 'header', fontSize: 20, bold: true }
          ]
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
              ['','','', '', ''],
              ['', reportLabels.REPORT_LABEL_OMNI_NAME, reportBaseData.OmniName, '', ''],
            ]
          }
        },
        // line
        { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 515, y2: 5, lineWidth: 1 }] },
        // blank line
        { text: '   ', alignment: 'center', fontSize: 12, bold: true, lineHeight: 1.25 },
        // report contents
        tableBody,
      ]
    };
  }
}
