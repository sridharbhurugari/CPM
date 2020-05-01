import { Injectable, RootRenderer } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { LeaseVerificationRequest } from '../data-contracts/lease-verification-request';
import { LeaseVerificationResult } from '../data-contracts/lease-verification-result'
import { IDeviceConfiguration } from '../data-contracts/i-device-configuration';
import { RequestHardwareLeaseRequest } from '../data-contracts/request-hardware-lease-request';
import { DeviceOperationResult } from '../data-contracts/device-operation-result';
import { IDeviceOperationResult } from '../data-contracts/i-device-operation-result';
import { Guid } from 'guid-typescript';

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
    const leaseVerificationReq = new LeaseVerificationRequest();
    leaseVerificationReq.DeviceId = deviceId;
    const url = this.ocapUrlBuilderService.buildUrl(`/api/hardwareLease/VerifyLease`);
    return this.httpClient.post<LeaseVerificationResult>(url, leaseVerificationReq, {
        headers: this.ocapHttpHeadersService.getHeaders(),
      });
    }

  public RequestDeviceLease(deviceId: number): Observable<DeviceOperationResult> {
    console.log(deviceId);
    const requestHardwareLeaseRequest = new RequestHardwareLeaseRequest();
    requestHardwareLeaseRequest.DeviceId = deviceId;
    const url = this.ocapUrlBuilderService.buildUrl(`/api/hardwareLease/requestLease`);
    return this.httpClient.post<DeviceOperationResult>(url, requestHardwareLeaseRequest, {
        headers: this.ocapHttpHeadersService.getHeaders(),
    });
  }

    public RequestDeviceLeaseCorrelate(requestCorrelationId: Guid, deviceId: number): Observable<IDeviceOperationResult> {
      const url = this.ocapUrlBuilderService.buildUrl(`/api/hardwareLease/requestLease`);
      const request = {
        RequestId: requestCorrelationId.toString(),
        DeviceId: deviceId,
      }
      return this.httpClient.post<IDeviceOperationResult>(url, request, {
        headers: this.ocapHttpHeadersService.getHeaders(),
      });
    }

  public getDeviceConfiguration(deviceId: number): Observable<IDeviceConfiguration> {
    const url = this.ocapUrlBuilderService.buildUrl(`/api/devices/${deviceId}/configuration`);
    return this.httpClient.get<IDeviceConfiguration>(url, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }
}
