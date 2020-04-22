import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';

@Injectable({
  providedIn: 'root'
})
export class OcsStatusService {

  constructor(
    private httpClient: HttpClient,
    private ocapUrlBuilderService: OcapUrlBuilderService,
    private ocapHttpHeadersService: OcapHttpHeadersService

  ) { }

  public requestStatus() {
    const url = this.ocapUrlBuilderService.buildUrl('/api/ocsService/status');
    const serviceHeaders = this.ocapHttpHeadersService.getHeaders();
    return this.httpClient.get(url, { headers: serviceHeaders });
  }
}
