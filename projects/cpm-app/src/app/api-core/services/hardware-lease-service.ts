import { Injectable, RootRenderer } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { LeaseVerificationRequest } from '../data-contracts/lease-verification-request';
import { LeaseVerificationResult } from '../data-contracts/lease-verification-result'
import { IDeviceConfiguration } from '../data-contracts/i-device-configuration';

@Injectable({
  providedIn: 'root'
})
export class HardwareLeaseService {
  constructor(
    private httpClient: HttpClient,
    private ocapUrlBuilderService: OcapUrlBuilderService,
    private ocapHttpHeadersService: OcapHttpHeadersService
  ) { }

  public HasDeviceLease(deviceId: number): Observable<LeaseVerificationResult> {
    console.log(deviceId);
    const leaseVerificationReq = new LeaseVerificationRequest();
    leaseVerificationReq.DeviceId = deviceId;
    const url = this.ocapUrlBuilderService.buildUrl(`/api/hardwareLease/VerifyLease`);
    return this.httpClient.post<LeaseVerificationResult>(url, leaseVerificationReq, {
        headers: this.ocapHttpHeadersService.getHeaders(),
      });
    }

  public RequestDeviceLease(deviceId: number): Observable<boolean> {
    console.log(deviceId);
    const url = this.ocapUrlBuilderService.buildUrl(`/api/hardwareLease/requestLease/${deviceId}`);
    return this.httpClient.get<boolean>(url, {
        headers: this.ocapHttpHeadersService.getHeaders(),
      });
    }

  public getDeviceDefaultOwner(deviceId: number): Observable<IDeviceConfiguration[]> {
    const url = this.ocapUrlBuilderService.buildUrl(`/api/devices/${deviceId}/configuration`);
    return this.httpClient.get<IDeviceConfiguration[]>(url, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }
}
