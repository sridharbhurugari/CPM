import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';

@Injectable({
  providedIn: 'root'
})
export class ItemManagementService {

  constructor(
    private httpClient: HttpClient,
    private ocapUrlBuilderService: OcapUrlBuilderService,
    private ocapHttpHeadersService: OcapHttpHeadersService
  ) { }

  get(): Observable<IPickRouteDetail> {
    const url = this.ocapUrlBuilderService.buildUrl(`/api/pickRoutes/${pickRouteId}`);
    const serviceHeaders = this.ocapHttpHeadersService.getHeaders();
    return this.httpClient.get<IPickRouteDetail>(url, {
      headers: serviceHeaders
    });
  }
}
