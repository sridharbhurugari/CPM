import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable, of } from 'rxjs';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';

@Injectable({
  providedIn: 'root'
})
export class PicklistLineIdsService {

  constructor(
    private httpClient: HttpClient,
    private ocapUrlBuilderService: OcapUrlBuilderService,
    private ocapHttpHeadersService: OcapHttpHeadersService
  ) { }

  getLineIds(orderId: string): Observable<Guid[]> {
    let url = this.ocapUrlBuilderService.buildUrl(`/api/picklistLineIds/unfilled?orderId=${orderId}`);
    return this.httpClient.get<Guid[]>(url, { headers: this.ocapHttpHeadersService.getHeaders() });
  }
  
  getLineIdsForWorkstation(orderId: string, workstationId: string): Observable<Guid[]> {
    let url = this.ocapUrlBuilderService.buildUrl(`/api/picklistLineIds/unfilled?orderId=${orderId}&workstationId=${workstationId}`);
    return this.httpClient.get<Guid[]>(url, { headers: this.ocapHttpHeadersService.getHeaders() });
  }
}
