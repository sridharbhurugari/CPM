import { Injectable } from '@angular/core';
import { IUnderfilledPicklistLine } from '../data-contracts/i-underfilled-picklist-line';
import { Observable } from 'rxjs';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UnderfilledPicklistLinesService {

  constructor(private httpClient: HttpClient,
    private ocapUrlBuilderService: OcapUrlBuilderService,
    private ocapHttpHeadersService: OcapHttpHeadersService) { }

  public get(orderId: string): Observable<IUnderfilledPicklistLine[]>{
    var encodedOrderId = encodeURIComponent(orderId);
    var url = this.ocapUrlBuilderService.buildUrl(`/api/picklists/underfilled/picklistLines?orderId=${encodedOrderId}`);
    return this.httpClient.get<IUnderfilledPicklistLine[]>(url, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }

  /** ClosePicklistLines(List<Guid> picklistLineIds) */
  public close(picklistLineIds: string) {
    const url = this.ocapUrlBuilderService.buildUrl(`/api/picklists/underfilled/picklistLines/close/${picklistLineIds}`);
    const serviceHeaders = this.ocapHttpHeadersService.getHeaders();
    return this.httpClient.post(url, { headers: serviceHeaders });
  }

   public reset(picklistLineIds: string) {
     const url = this.ocapUrlBuilderService.buildUrl(`api/pickRoutes/Reset/${picklistLineIds}`);
     const serviceHeaders = this.ocapHttpHeadersService.getHeaders();
     return this.httpClient.post(url, { headers: serviceHeaders });
    }

}
