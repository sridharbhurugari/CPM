import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { IAngularReportBaseData } from '../data-contracts/i-angular-report-base-data';
import { SystemConfigurationService } from '../../shared/services/system-configuration.service';
import { concatMap } from 'rxjs/operators';
import { OcapHttpConfigurationService } from '../../shared/services/ocap-http-configuration.service';

@Injectable({
  providedIn: 'root'
})
export class PdfPrintService {
  constructor(
    private httpClient: HttpClient,
    private ocapUrlBuilderService: OcapUrlBuilderService,
    private ocapHttpHeadersService: OcapHttpHeadersService,
    private ocapHttpConfigurationService: OcapHttpConfigurationService,
    private systemConfigurationService: SystemConfigurationService
  ) { }

  printPdf(fileBlob: Blob): Observable<boolean> {
    try {
      const clientId = this.ocapHttpConfigurationService.get().clientId;
      const formData: FormData = new FormData();
      formData.append('file', fileBlob);
      const url = this.ocapUrlBuilderService.buildUrl('/api/angularPrint/print');
      const headers = this.ocapHttpHeadersService.getHeaders();
      
      return this.systemConfigurationService.GetConfigurationValueForWorkstation('PRINTING', 'FORM_PRINTER', clientId).pipe(concatMap((result) => {
        const params = {printerName: result.Value};
        return this.httpClient.post<boolean>(url, formData, { headers, params });
      }));
    } catch (e) {
      console.log('printPdf ERROR', e);
      return of(false);
    }
  }

  getReportBaseData(): Observable<IAngularReportBaseData> {
    const url = this.ocapUrlBuilderService.buildUrl('/api/angularPrint/getReportData');
    const headers = this.ocapHttpHeadersService.getHeaders();
    return this.httpClient.get<IAngularReportBaseData>(url, { headers });
  }
}
