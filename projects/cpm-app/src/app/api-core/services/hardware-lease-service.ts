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
import { IDevice } from '../data-contracts/i-device';

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

  public RequestDeviceLease(deviceId: number): Observable<DeviceOperationResult> {
    console.log(deviceId);
    const requestHardwareLeaseRequest = new RequestHardwareLeaseRequest();
    requestHardwareLeaseRequest.DeviceId = deviceId;
    const url = this.ocapUrlBuilderService.buildUrl(`/api/hardwareLease/requestLease`);
    return this.httpClient.post<DeviceOperationResult>(url, requestHardwareLeaseRequest, {
        headers: this.ocapHttpHeadersService.getHeaders(),
      });
    }

  public getDeviceConfiguration(deviceId: number): Observable<IDeviceConfiguration> {
    const url = this.ocapUrlBuilderService.buildUrl(`/api/devices/${deviceId}/configuration`);
    return this.httpClient.get<IDeviceConfiguration>(url, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }

  get(): Observable<IDevice[]> {
    var url = this.ocapUrlBuilderService.buildUrl('/api/cpmDevices');
    var headers = this.ocapHttpHeadersService.getHeaders();
    return this.httpClient.get<IDevice[]>(url, {
      headers: headers
    });
  }
}
