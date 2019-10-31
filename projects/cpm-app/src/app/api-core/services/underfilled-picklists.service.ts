import { Injectable } from '@angular/core';
import { IUnderfilledPicklist } from '../data-contracts/i-underfilled-picklist';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';

@Injectable({
  providedIn: 'root'
})
export class UnderfilledPicklistsService {

  constructor(
    private httpClient: HttpClient,
    private ocapUrlBuilderService: OcapUrlBuilderService,
    private ocapHttpHeadersService: OcapHttpHeadersService
  ) { }

  public get(): Observable<IUnderfilledPicklist[]>{
    var url = this.ocapUrlBuilderService.buildUrl('/api/picklists/underfilled');
    return this.httpClient.get<IUnderfilledPicklist[]>(url, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }

  public getForOrder(orderId: string) : Observable<IUnderfilledPicklist>{
    var encodedOrderId = encodeURIComponent(orderId);
    var url = this.ocapUrlBuilderService.buildUrl(`/api/picklists/underfilled/order?orderId=${encodedOrderId}`);
    return this.httpClient.get<IUnderfilledPicklist>(url, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }
}
