import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IVerificationDataParameters } from '../data-contracts/i-verification-data-parameters';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { IVerifiableItem } from '../data-contracts/i-verifiable-item';
import { IVerificationDashboardData } from '../data-contracts/i-verification-dashboard-data';
import { IVerificationDestinationDetailViewData } from "../data-contracts/i-verification-destination-detail-view-data";
import { IVerificationDestinationViewData } from '../data-contracts/i-verification-destination-view-data';
import { IVerificationOrderItem } from '../data-contracts/i-verification-order-item';
import { IPickPriority } from '../data-contracts/i-pick-priority';

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

  getVerificationDestinations(params: IVerificationDataParameters): Observable<IVerificationDestinationViewData> {
    const url = this.ocapUrlBuilderService.buildUrl(`/api/targetedpickverification/destinations`);
    return this.httpClient.post<IVerificationDestinationViewData>(url, params, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }

  getVerificationDashboardData(params: IVerificationDataParameters):  Observable<IVerificationDashboardData> {
    const url = this.ocapUrlBuilderService.buildUrl( `/api/targetedpickverification/dashboard`);
    return this.httpClient.post<IVerificationDashboardData>(url, params, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }

  getVerificationDestinationDetails(destinationId: string, orderId: string, deviceId: number): Observable<IVerificationDestinationDetailViewData> {
    const url = this.ocapUrlBuilderService.buildUrl(`/api/targetedpickverification/destination/${destinationId}/${orderId}/${deviceId}`);
    return this.httpClient.get<IVerificationDestinationDetailViewData>(url, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }

  getVerificationRejectReasons(): Observable<string[]> {
    var url = this.ocapUrlBuilderService.buildUrl('/api/targetedpickverification/rejectreasons');
    return this.httpClient.get<string[]>(url, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }

  getPickPriority(orderId: string): Observable<IPickPriority> {
    var url = this.ocapUrlBuilderService.buildUrl(`/api/targetedpickverification/pickpriority/${orderId}`);
    return this.httpClient.get<IPickPriority>(url, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }

  saveVerification(verifiableItems: Array<IVerifiableItem>): Observable<boolean> {
    var url = this.ocapUrlBuilderService.buildUrl('/api/targetedpickverification/save');
    return this.httpClient.post<boolean>(url, verifiableItems, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }
}
