import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';

@Injectable({
  providedIn: 'root'
})
export class ResetPickRoutesService {

  constructor(
    private httpClient: HttpClient,
    private ocapUrlBuilderService: OcapUrlBuilderService,
    private ocapHttpHeadersService: OcapHttpHeadersService
  ) { }

  reset(picklistLineIds: string[]) {
    const url = this.ocapUrlBuilderService.buildUrl(`/api/ResetPickRoute`);
    const serviceHeaders = this.ocapHttpHeadersService.getHeaders();
    const data = {
      PicklistLineIds: picklistLineIds
    };
    return this.httpClient.post(url, data, { headers: serviceHeaders });
  }
}
