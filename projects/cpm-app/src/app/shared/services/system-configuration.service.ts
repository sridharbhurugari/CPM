import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { OcapUrlBuilderService } from './ocap-url-builder.service';
import { OcapHttpHeadersService } from './ocap-http-headers.service';
import { IConfigurationValue } from '../interfaces/i-configuration-value';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SystemConfigurationService {

  constructor(
    private httpClient: HttpClient,
    private ocapUrlBuilderService: OcapUrlBuilderService,
    private ocapHttpHeadersService: OcapHttpHeadersService
  ) { }

  GetConfigurationValues(): Observable<IConfigurationValue[]> {
    const url = this.ocapUrlBuilderService.buildUrl('/api/configuration/GetConfigurationValues');
    return this.httpClient.get<IConfigurationValue[]>(url, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }

  Get(): Observable<IConfigurationValue> {
    const url = this.ocapUrlBuilderService.buildUrl('/api/configuration/');
    const params = new HttpParams();
    params.set('category', 'HARDWARE');
    params.set('subCategory', 'Hardware Access Request Timeout In Seconds');
    return this.httpClient.get<IConfigurationValue>(url, {
      headers: this.ocapHttpHeadersService.getHeaders(), params }
      );
  }

}
