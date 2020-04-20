import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  GetConfigurationValues(category: string, subCategory: string): Observable<IConfigurationValue> {
    const url = this.ocapUrlBuilderService.buildUrl('/api/configuration/Get');
    const params = {category, subCategory};
    return this.httpClient.get<IConfigurationValue>(url, {
      headers: this.ocapHttpHeadersService.getHeaders(), params }
      );
  }
}
