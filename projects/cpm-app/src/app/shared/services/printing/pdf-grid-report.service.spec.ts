import { TestBed } from '@angular/core/testing';
import { PdfGridReportService } from './pdf-grid-report-service';
import { PdfPrintService } from '../../../api-core/services/pdf-print-service';
import { OcapUrlBuilderService } from '../ocap-url-builder.service';
import { PdfMakeService } from './pdf-make.service';
import { TranslateService } from '@ngx-translate/core';
import { ImageDataService } from '../images/image-data.service';
import { TCreatedPdf } from 'pdfmake/build/pdfmake';
import { of } from 'rxjs';
import { IAngularReportBaseData } from '../../../api-core/data-contracts/i-angular-report-base-data';
import { IReportLabels } from './i-report-labels';
import { ContentTable } from 'pdfmake/interfaces';

describe('PdfGridReportService', () => {
  let service: PdfGridReportService;
  let pdfPrintService: Partial<PdfPrintService>;
  beforeEach(() => {
    let reportBaseData: IAngularReportBaseData = {
      Address1: 'a',
      Address2: 'b',
      Address3: 'c',
      CombinedAddress: 'a b c',
      FormPrinterName: 'printer',
      FormattedDateTime: '24 May 2020',
      OmniId: 'someOmni',
      OmniName: 'some omni',
      SiteDescription: 'some site'
    };
    pdfPrintService = { 
      printPdf: jasmine.createSpy('printPdf').and.returnValue(of(true)),
      getReportBaseData: () => of(reportBaseData)
    };
    let translatedReportLabels: IReportLabels = {
      REPORT_LABEL_OMNI_ID: 'omni id:',
      REPORT_LABEL_OMNI_NAME: 'omni name:',
      REPORT_LABEL_PRINTED: 'printed:'
    }
    let pdfResult: Partial<TCreatedPdf> = {
      getBlob: (cb: Function) => cb(new Blob())
    };
    TestBed.configureTestingModule({
      providers: [
        { provide: PdfPrintService, useValue: pdfPrintService },
        { provide: OcapUrlBuilderService, useValue: { buildUrl: () => '' } },
        { provide: PdfMakeService, useValue: { createPdf: () => pdfResult } },
        { provide: TranslateService, useValue: { get: () => of(translatedReportLabels) } },
        { provide: ImageDataService, useValue: { getBase64ImageFromUrl: () => of('') } },
      ]
    });
    service = TestBed.get(PdfGridReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('printWithBaseData', () => {
    it('should call PdfPrintService.printPdf', (done) => {
      let table: ContentTable = null;
      service.print(of(table), of('')).subscribe(x => {
        expect(x).toBeTruthy();
        done();
      });
    });
  })
});
