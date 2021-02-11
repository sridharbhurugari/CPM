import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { IVerifiableItem } from '../data-contracts/i-verifiable-item';
import { IVerificationDashboardData } from '../data-contracts/i-verification-dashboard-data';
import { IVerificationDestinationDetailViewData } from "../data-contracts/i-verification-destination-detail-view-data";
import { IVerificationDestinationViewData } from '../data-contracts/i-verification-destination-view-data';
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

  getVerificationDestinations(deviceId: string, orderId: string): Observable<IVerificationDestinationViewData> {
    const url = this.ocapUrlBuilderService.buildUrl(`/api/targetedpickverification/destinations/${deviceId}/${orderId}`);
    return this.httpClient.get<IVerificationDestinationViewData>(url, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }

  getVerificationDashboardData(deviceId: string, orderId: string):  Observable<IVerificationDashboardData> {
    const url = this.ocapUrlBuilderService.buildUrl(`/api/targetedpickverification/dashboard/${deviceId}/${orderId}`);
    return this.httpClient.get<IVerificationDashboardData>(url, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }

  getVerificationDestinationDetails(destinationId: string, orderId: string, deviceId: number): Observable<IVerificationDestinationDetailViewData> {
    console.log('verificationservice get')
    const url = this.ocapUrlBuilderService.buildUrl(`/api/targetedpickverification/destination/${destinationId}/${orderId}/${deviceId}`);
    return this.httpClient.get<IVerificationDestinationDetailViewData>(url, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }

  saveVerification(verifiableItem: Array<IVerifiableItem>): Observable<boolean> {
    var url = this.ocapUrlBuilderService.buildUrl('/api/targetedpickverification/save');
    return this.httpClient.post<boolean>(url, verifiableItem, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }

  getVerificationRejectReasons(): Observable<string[]> {
    var url = this.ocapUrlBuilderService.buildUrl('/api/targetedpickverification/rejectreasons');
    return this.httpClient.get<string[]>(url, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }
}
