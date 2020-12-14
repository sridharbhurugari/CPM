import { Injectable, Inject } from '@angular/core';
import { IAngularReportBaseData } from '../../../api-core/data-contracts/i-angular-report-base-data';
import { PdfPrintService } from '../../../api-core/services/pdf-print-service';
import { OcapUrlBuilderService } from '../ocap-url-builder.service';
import { TDocumentDefinitions, ContentTable,PageOrientation,Table} from 'pdfmake/interfaces';
import { Observable, forkJoin, bindCallback } from 'rxjs';
import { switchMap, shareReplay } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { IReportLabels } from './i-report-labels';
import { PdfMakeService } from './pdf-make.service';
import { ImageDataService } from '../images/image-data.service';
import { ReportConstants } from '../../constants/report-constants';

@Injectable({
  providedIn: 'root'
})
export class PdfGridReportService
{
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
    this.reportBaseData$ = this.pdfPrintService.getReportBaseData().pipe(shareReplay(1));
    this.reportLogo$ = imageDataService.getBase64ImageFromUrl(this.ocapUrlBuilderService.buildUrl('/web/cpm-app/assets/img/reportlogo.png'));
    const reportLabelKeys: (keyof IReportLabels)[] = [ 'REPORT_LABEL_OMNI_ID', 'REPORT_LABEL_OMNI_NAME', 'REPORT_LABEL_PRINTED', 'UNFILLED_REPORT_LABEL_ORDER_ID', 'UNFILLED_REPORT_LABEL_PRIORITYCODE',"REPORT_LABEL_XR2_DEVICE_ID",];
    this.reportLabels$ = translateService.get(reportLabelKeys).pipe(shareReplay(1));
  }

  printWithBaseData(tableBody$: Observable<ContentTable>, reportTitle$: Observable<string>, reportBaseData$: Observable<IAngularReportBaseData>): Observable<boolean> {
    return forkJoin(reportBaseData$, this.reportLogo$, tableBody$, reportTitle$, this.reportLabels$).pipe(switchMap(r => {
      return this.generateAndPrintPdf(r[0], r[1], r[2], r[3], r[4]);
    }));
  }

  print(tableBody$: Observable<ContentTable>, reportTitle$: Observable<string>): Observable<boolean> {
    return forkJoin(this.reportBaseData$, this.reportLogo$, tableBody$, reportTitle$, this.reportLabels$).pipe(switchMap(r => {
      return this.generateAndPrintPdf(r[0], r[1], r[2], r[3], r[4]);
    }));
  }

  private generateAndPrintPdf(reportBaseData: IAngularReportBaseData, reportLogoDataUrl: string, tableBody: ContentTable, reportTitle: string, reportLabels: IReportLabels): Observable<boolean> {
    const blob$ = this.generatePdfBlob(reportBaseData, reportLogoDataUrl, tableBody, reportTitle, reportLabels);
    return blob$.pipe(switchMap((blob: Blob) => {
      return this.pdfPrintService.printPdf(blob);
    }));
  }

  private generatePdfBlob(reportBaseData: IAngularReportBaseData, reportLogoDataUrl: string, tableBody: ContentTable, reportTitle: string, reportLabels: IReportLabels): Observable<Blob> {
    const pdf = this.generatePdf(reportBaseData, reportLogoDataUrl, tableBody, reportTitle, reportLabels);
    const boundGetBlob = pdf.getBlob.bind(pdf);
    const blob$ = bindCallback<Blob>(boundGetBlob)();
    return blob$;
  }

  private generatePdf(reportBaseData: IAngularReportBaseData, reportLogoDataUrl: string, tableBody: ContentTable, reportTitle: string, reportLabels: IReportLabels): pdfMake.TCreatedPdf {
      const documentDefinition = this.getDocumentDefinition(reportBaseData, reportLogoDataUrl, tableBody, reportTitle, reportLabels);
      const pdf = this.pdfMakeService.createPdf(documentDefinition);
      return pdf;
  }

  private getPageOrientation(reportTitle: string): PageOrientation {
    if (reportTitle.match(ReportConstants.Xr2InventoryReport)) {
      return ReportConstants.ReportLandscapePageOrientation; //can be customized for all landscape mode types
    } else {
      return ReportConstants.ReportPortraitPageOrientation;
    }
  }

  private getReportTitleFontSize(reportTitle: string): number {
    if (reportTitle.match(ReportConstants.Xr2InventoryReport)) {
      return ReportConstants.ReportHeaderSmallFontSize; //small report font size only for XR2 inventory
    } else {
      return ReportConstants.ReportHeaderLegacyFontSize;
    }
  }

  private getReportBodyFontSize(reportTitle: string): number {
    if (reportTitle.match(ReportConstants.Xr2InventoryReport)) {
      return ReportConstants.ReportBodySmallFontSize; //small report font size only for XR2 inventory
    } else {
      return ReportConstants.ReportBodyLegacyFontSize;
    }
  }


  private getReportHeaderCanvasDimension(reportTitle: string): number {
    if (reportTitle.match(ReportConstants.Xr2InventoryReport)) {
      return ReportConstants.ReportLandscapeCanvasDimension; //this is for landscape mode paging
    } else {
      return ReportConstants.ReportPortraitCanvasDimension; //this is for portrait mode paging
    }
  }

  //header columns are different for XR2Inventory, Unfilled types rest would be same as like now
  private getHeaderTable(reportTitle: string,reportBaseData: IAngularReportBaseData,reportLabels: IReportLabels): Table {
    if (reportTitle.match(ReportConstants.Xr2InventoryReport)) {
      return this.getXR2InvHeaderData( reportTitle,reportBaseData,reportLabels );
    } else if (reportTitle.match(ReportConstants.UnfilledReport)) {
      return this.getUnFilledHeaderData( reportTitle,reportBaseData,reportLabels );
    } else {
      return this.getLegacyHeaderData( reportTitle,reportBaseData,reportLabels );
    }
  }

  private getXR2InvHeaderData(reportTitle: string,reportBaseData: IAngularReportBaseData,reportLabels: IReportLabels): Table {
    return {
      // headers are automatically repeated if the table spans over multiple pages
      // you can declare how many rows should be treated as headers
      headerRows: 0,
      widths: [50, 75, 75, 160, 150, 50, "*"],
      body: [ ["", "", "", "", "", "", ""],
        ["",reportLabels.REPORT_LABEL_OMNI_ID,reportBaseData.OmniId,"","",reportLabels.REPORT_LABEL_PRINTED,reportBaseData.FormattedDateTime,],
        ["",reportLabels.REPORT_LABEL_XR2_DEVICE_ID,reportBaseData.DeviceDescriptionName,"","","","",],
      ],
    };
  }

  private getUnFilledHeaderData(reportTitle: string,reportBaseData: IAngularReportBaseData,reportLabels: IReportLabels): Table {
    return {
      // headers are automatically repeated if the table spans over multiple pages
      // you can declare how many rows should be treated as headers
      headerRows: 0,
      widths: [50, 75, 150, 50, "*"],
      body: [ ["",reportLabels.UNFILLED_REPORT_LABEL_ORDER_ID,reportBaseData.OrderId,reportLabels.REPORT_LABEL_PRINTED,reportBaseData.FormattedDateTime,],
        ["",reportLabels.UNFILLED_REPORT_LABEL_PRIORITYCODE,reportBaseData.PriorityCode,"","",],
        ["", "", "", "", ""],
        ["",reportLabels.REPORT_LABEL_OMNI_NAME,reportBaseData.OmniName,"","",],
      ],
    };
  }

  private getLegacyHeaderData(reportTitle: string,reportBaseData: IAngularReportBaseData,reportLabels: IReportLabels): Table {
    return {
      // headers are automatically repeated if the table spans over multiple pages
      // you can declare how many rows should be treated as headers
      headerRows: 0,
      widths: [50, 75, 150, 50, "*"],
      body: [ ["", "", "", "", ""],
        ["",reportLabels.REPORT_LABEL_OMNI_ID, reportBaseData.OmniId,reportLabels.REPORT_LABEL_PRINTED,reportBaseData.FormattedDateTime,],
        ["",reportLabels.REPORT_LABEL_OMNI_NAME,reportBaseData.OmniName,"","",],
      ],
    };
  }

  private getDocumentDefinition(reportBaseData: IAngularReportBaseData, reportLogo: any, tableBody: ContentTable, reportTitle: string, reportLabels: IReportLabels): TDocumentDefinitions {
    return {
      pageOrientation: this.getPageOrientation(reportTitle),
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
            { text: reportTitle, alignment: 'right', style: 'header', fontSize: this.getReportTitleFontSize(reportTitle), bold: true }
          ]
        },
        // line
        { canvas: [{ type: 'line', x1: 0, y1: 5, x2: this.getReportHeaderCanvasDimension(reportTitle), y2: 5, lineWidth: 1 }] },
        // report base data
        {
          layout: 'noBorders', // optional
          fontSize: this.getReportBodyFontSize(reportTitle),
          table: this.getHeaderTable(reportTitle, reportBaseData, reportLabels),
        },
        // line
        { canvas: [{ type: 'line', x1: 0, y1: 5, x2: this.getReportHeaderCanvasDimension(reportTitle), y2: 5, lineWidth: 1 }] },
        // blank line
        { text: '   ', alignment: 'center', fontSize: 12, bold: true, lineHeight: 1.25 },
        // report contents
        tableBody,
      ]
    };
  }
}
