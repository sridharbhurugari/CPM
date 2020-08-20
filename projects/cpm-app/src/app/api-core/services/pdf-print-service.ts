import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { AngularReportBaseData } from '../data-contracts/angular-report-base-data';

@Injectable({
  providedIn: 'root'
})
export class PdfPrintService {
  constructor(
    private httpClient: HttpClient,
    private ocapUrlBuilderService: OcapUrlBuilderService,
    private ocapHttpHeadersService: OcapHttpHeadersService
  ) { }

  printPdf(fileBlob: Blob): Observable<boolean> {
    const formData: FormData = new FormData();
    formData.append('file', fileBlob);
    const url = this.ocapUrlBuilderService.buildUrl('/api/angularPrint/print');
    const headers = this.ocapHttpHeadersService.getHeaders();
    return this.httpClient.post<boolean>(url, formData, { headers });
  }

  getReportBaseData(): Observable<AngularReportBaseData> {
    const url = this.ocapUrlBuilderService.buildUrl('/api/angularPrint/getReportData');
    const headers = this.ocapHttpHeadersService.getHeaders();
    return this.httpClient.get<AngularReportBaseData>(url, { headers });
  }
}
