import { TestBed } from '@angular/core/testing';
import { Xr2PdfGridReportService } from './xr2-pdf-grid-report-service';
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
  let service: Xr2PdfGridReportService;
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
      SiteDescription: 'some site',
      OrderId:'PHA24-0000000105',
      PriorityCode:'Area',
      DeviceDescriptionName:"sample description"
    };
    pdfPrintService = {
      printPdf: jasmine.createSpy('printPdf').and.returnValue(of(true)),
      getReportBaseData: () => of(reportBaseData)
    };
    let translatedReportLabels: IReportLabels = {
      REPORT_LABEL_OMNI_ID: 'omni id:',
      REPORT_LABEL_OMNI_NAME: 'omni name:',
      REPORT_LABEL_PRINTED: 'printed:',
      UNFILLED_REPORT_LABEL_ORDER_ID : 'Order Id',
      UNFILLED_REPORT_LABEL_PRIORITYCODE: 'Priority type',
      REPORT_LABEL_XR2_DEVICE_ID: 'xr2 name'
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
    service = TestBed.get(Xr2PdfGridReportService);
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
