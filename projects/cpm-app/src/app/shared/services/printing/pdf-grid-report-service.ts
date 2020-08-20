import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
import { AngularReportBaseData } from '../../../api-core/data-contracts/angular-report-base-data';
import { PdfPrintService } from '../../../api-core/services/pdf-print-service';
import { OcapUrlBuilderService } from '../ocap-url-builder.service';
import { TDocumentDefinitions, ContentTable } from 'pdfmake/interfaces';
import { from, Observable, forkJoin, bindCallback } from 'rxjs';
import { switchMap, shareReplay } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { IReportLabels } from './i-report-labels';

@Injectable({
  providedIn: 'root'
})
export class PdfGridReportService
{
  reportBaseData$: Observable<AngularReportBaseData>;
  reportLogo$: Observable<string>;
  reportLabels$: Observable<IReportLabels>;

  constructor(
    private pdfPrintService: PdfPrintService,
    private ocapUrlBuilderService: OcapUrlBuilderService,
    translateService: TranslateService,
  ) {
    this.reportBaseData$ = this.pdfPrintService.getReportBaseData().pipe(shareReplay(1));
    this.reportLogo$ = this.getBase64ImageFromURL(this.ocapUrlBuilderService.buildUrl('/web/cpm-app/assets/img/reportlogo.png'));
    const reportLabelKeys: (keyof IReportLabels)[] = [ 'REPORT_LABEL_OMNI_ID', 'REPORT_LABEL_OMNI_NAME', 'REPORT_LABEL_PRINTED' ];
    this.reportLabels$ = translateService.get(reportLabelKeys).pipe(shareReplay(1));
  }

  print(tableBody$: Observable<ContentTable>, reportTitle$: Observable<string>): Observable<boolean> {
    return forkJoin(this.reportBaseData$, this.reportLogo$, tableBody$, reportTitle$, this.reportLabels$).pipe(switchMap(r => {
      return this.generateAndPrintPdf(r[0], r[1], r[2], r[3], r[4]);
    }));
  }

  private generateAndPrintPdf(reportBaseData: AngularReportBaseData, reportLogoDataUrl: string, tableBody: ContentTable, reportTitle: string, reportLabels: IReportLabels): Observable<boolean> {
    const blob$ = this.generatePdfBlob(reportBaseData, reportLogoDataUrl, tableBody, reportTitle, reportLabels);
    return blob$.pipe(switchMap((blob: Blob) => {
      return this.pdfPrintService.printPdf(blob);
    }));
  }

  private generatePdfBlob(reportBaseData: AngularReportBaseData, reportLogoDataUrl: string, tableBody: ContentTable, reportTitle: string, reportLabels: IReportLabels): Observable<Blob> {
    const pdf = this.generatePdf(reportBaseData, reportLogoDataUrl, tableBody, reportTitle, reportLabels);
    const boundGetBlob = pdf.getBlob.bind(pdf);
    const blob$ = bindCallback<Blob>(boundGetBlob)();
    return blob$;
  }

  private generatePdf(reportBaseData: AngularReportBaseData, reportLogoDataUrl: string, tableBody: ContentTable, reportTitle: string, reportLabels: IReportLabels): pdfMake.TCreatedPdf {
    const documentDefinition = this.getDocumentDefinition(reportBaseData, reportLogoDataUrl, tableBody, reportTitle, reportLabels);
    const pdf = pdfMake.createPdf(documentDefinition, null, null, pdfFonts.pdfMake.vfs);
    return pdf;
  }

  private getDocumentDefinition(reportBaseData: AngularReportBaseData, reportLogo: any, tableBody: ContentTable, reportTitle: string, reportLabels: IReportLabels): TDocumentDefinitions {
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
            {
              image: reportLogo,
              width: 82,
              height: 18
            },
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
              ['', '', '', '', ''],
              ['', reportLabels.REPORT_LABEL_OMNI_ID, reportBaseData.OmniId, reportLabels.REPORT_LABEL_PRINTED, reportBaseData.FormattedDateTime],
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

  private getBase64ImageFromURL(url): Observable<string> {
    return from(new Promise<string>((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");
      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL("image/png");
        resolve(dataURL);
      };
      img.onerror = error => {
        reject(error);
      };
      img.src = url;
    }));
  }
}
