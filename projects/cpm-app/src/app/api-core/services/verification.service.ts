import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VerificationDestinationDetail } from '../../shared/model/verification-destination-detail';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { IVerificationDashboardData } from '../data-contracts/i-verification-dashboard-data';
import { IVerificationDestinationDetail } from '../data-contracts/i-verification-destination-detail';
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

  getVerificationDestinations(deviceId: string, orderId: string): Observable<IVerificationDestinationItem[]> {
    const url = this.ocapUrlBuilderService.buildUrl(`/api/targetedpickverification/destinations/${deviceId}/${orderId}`);
    return this.httpClient.get<IVerificationDestinationItem[]>(url, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }

  getVerificationDashboardData(deviceId: string, orderId: string):  Observable<IVerificationDashboardData> {
    const url = this.ocapUrlBuilderService.buildUrl(`/api/targetedpickverification/dashboard/${deviceId}/${orderId}`);
    return this.httpClient.get<IVerificationDashboardData>(url, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }

  getVerificationDestinationDetails(destinationId: string, orderId: string, deviceId: number): Observable<IVerificationDestinationDetail[]> {
    console.log('verificationservice get')
    const url = this.ocapUrlBuilderService.buildUrl(`/api/targetedpickverification/destination/${destinationId}/${orderId}/${deviceId}`);
    return this.httpClient.get<IVerificationDestinationDetail[]>(url, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }

  approveVerification(verificationDestinationDetail: VerificationDestinationDetail){
    var url = this.ocapUrlBuilderService.buildUrl(`/api/targetedpickverification/approve/${verificationDestinationDetail.OrderId}/2/${verificationDestinationDetail.ItemId}`);
    console.log('approveVerification in service');
    console.log(verificationDestinationDetail);

    return this.httpClient.post(url, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }

  rejectVerification(verificationDestinationDetail: VerificationDestinationDetail){
    var url = this.ocapUrlBuilderService.buildUrl(`/api/targetedpickverification/reject`);
    return this.httpClient.post<boolean>(url, verificationDestinationDetail, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }
}
