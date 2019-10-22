import { Injectable } from '@angular/core';
import { OcapHttpClientService } from 'oal-core';
import { IUnderfilledPicklist } from '../data-contracts/i-underfilled-picklist';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnderfilledPicklistsService {

  constructor(private ocapHttpClient: OcapHttpClientService) { }

  public get(): Observable<IUnderfilledPicklist[]>{
    return this.ocapHttpClient.fetch({
      endpoint: '/api/picklists/underfilled'
    });
  }

  public getForOrder(orderId: string) : Observable<IUnderfilledPicklist>{
    var encodedOrderId = encodeURIComponent(orderId);
    return this.ocapHttpClient.fetch({
      endpoint: `/api/picklists/underfilled/order?orderId=${encodedOrderId}`
    });
  }
}
