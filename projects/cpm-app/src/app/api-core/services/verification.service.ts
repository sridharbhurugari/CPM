import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { IVerificationDestinationItem } from '../data-contracts/i-verification-destination-item';
import { IVerificationOrderItem } from '../data-contracts/i-verification-order-item';

@Injectable({
  providedIn: 'root'
})
export class VerificationService {

  constructor(
    private httpClient: HttpClient,
    private ocapUrlBuilderService: OcapUrlBuilderService,
    private ocapHttpHeadersService: OcapHttpHeadersService
    ) { }

  getVerificationOrders(): Observable<IVerificationOrderItem[]> {
    const url = this.ocapUrlBuilderService.buildUrl('/api/targetedpickverification/orders');
    return this.httpClient.get<IVerificationOrderItem[]>(url, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }

  getDestinationOrders(orderId: string): Observable<IVerificationDestinationItem[]> {
    const url = this.ocapUrlBuilderService.buildUrl(`/api/targetedpickverification/destinations/${orderId}`);
    return this.httpClient.get<IVerificationDestinationItem[]>(url, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }
}
