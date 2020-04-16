import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
import { PdfPrintService } from '../../api-core/services/pdf-print-service'
import { AngularReportBaseData } from '../data-contracts/angular-report-base-data';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class PdfGridReportService
{
  private tableBody: any[];
  private reportBaseData: AngularReportBaseData;
  private reportTitle: string;

  constructor(
    private pdfPrintService: PdfPrintService) {
  }

  async generatePdf(tableBody: any[], reportTitle: string) {
    console.log(pdfMake);
    this.tableBody = tableBody;
    this.reportTitle = reportTitle;
    const self = this;
    this.pdfPrintService.getReportBaseData().subscribe((reportBaseData) => {
      self.reportBaseData = reportBaseData;
      self.generatePdfInternal();
    }
    );
  }

  private async generatePdfInternal() {
    const documentDefinition = await this.getDocumentDefinition();
    const self = this;
    pdfMake.createPdf(documentDefinition).getBlob((blob: Blob) => {
      self.pdfPrintService.printPdf(blob).subscribe(
        res => {
          console.log(res);
        }
      );
    });
  }

  private async getDocumentDefinition() {
    return {
          footer: (currentPage: number, pageCount: number) => { return [
          {
              columns: [
                  { text: this.reportBaseData.SiteDescription, alignment: 'left', fontSize: 8, margin: 5 },
                  { text:  this.reportBaseData.CombinedAddress, alignment: 'center', fontSize: 8, margin: 5 },
                  { text: currentPage.toString() + '/' + pageCount, alignment: 'right', fontSize: 8, margin: 5  }
            ]
          }]},
          header: (currentPage: number, pageCount: number) => { return [
          {
              columns: [
                  { text: '', alignment: 'left', fontSize: 8, margin: 5 },
                  { text: '', alignment: 'center', fontSize: 8, margin: 5 },
                  { text: '', alignment: 'right', fontSize: 8, margin: 5  }
            ]
          }]},
      content: [
          {
            columns: [
                { image: await this.getBase64ImageFromURL('https://localhost:40407/web/cpm-app/assets/img/reportlogo.png'),
                  width: 82,
                  height: 18
                },
                { text: this.reportTitle, alignment: 'right', style: 'header', fontSize: 20, bold: true }
            ]
          },
          { canvas: [ { type: 'line', x1: 0, y1: 5, x2: 595-2*40, y2: 5, lineWidth: 1 } ] },
          {
              layout: 'noBorders', // optional
              table: {
                // headers are automatically repeated if the table spans over multiple pages
                // you can declare how many rows should be treated as headers
                headerRows: 0,
                widths: [ 50, 75, 150, 50, '*' ],
                body: [
                  [ '', '', '', '', '' ],
                  [ '', 'Omni Site ID:', this.reportBaseData.OmniId, 'Printed:', this.reportBaseData.FormattedDateTime ],
                  [ '', 'Omni Name:', this.reportBaseData.OmniName, '', '' ],
                ]
              }
            },
            { canvas: [ { type: 'line', x1: 0, y1: 5, x2: 515, y2: 5, lineWidth: 1 } ] },
            { text: '   ', alignment: 'center', fontSize: 12, bold: true, lineHeight: 1.25 },
            {
              layout: 'lightHorizontalLines', // optional
              table: {
                    // headers are automatically repeated if the table spans over multiple pages
                    // you can declare how many rows should be treated as headers
                    headerRows: 1,
                    widths: [ '*', '*', '*', '*' ],
                    body: this.buidMainTableBody()
                }
            },
      ]
    };
  }

  private async getBase64ImageFromURL(url) {
    return new Promise((resolve, reject) => {
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
    });
  }

  private buidMainTableBody() {
    return this.tableBody;
  }
}
