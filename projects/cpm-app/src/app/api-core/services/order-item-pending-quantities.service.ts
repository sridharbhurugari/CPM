import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { IOrderItemPendingQuantity } from '../data-contracts/i-order-item-pending-quantity';

@Injectable({
  providedIn: 'root'
})
export class OrderItemPendingQuantitiesService {
  private readonly _path: string = '/api/OrderItemPendingQuantities';

  constructor(
    private httpClient: HttpClient,
    private ocapUrlBuilderService: OcapUrlBuilderService,
    private ocapHttpHeadersService: OcapHttpHeadersService
  ) { }

  get(orderId: string, itemId: string): Observable<IOrderItemPendingQuantity> {
    let url = this.ocapUrlBuilderService.buildUrl(`${this._path}?orderId=${orderId}&itemId=${itemId}`);
    return this.httpClient.get<IOrderItemPendingQuantity>(url, { headers: this.ocapHttpHeadersService.getHeaders() });
  }
}
