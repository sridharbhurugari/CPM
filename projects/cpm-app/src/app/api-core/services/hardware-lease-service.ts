import { Injectable, RootRenderer } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HardwareLeaseService {
  constructor(
    private httpClient: HttpClient,
    private ocapUrlBuilderService: OcapUrlBuilderService,
    private ocapHttpHeadersService: OcapHttpHeadersService
  ) { }

  public HasDeviceLease(deviceId: string): Observable<boolean> {
    console.log(deviceId);
    const url = this.ocapUrlBuilderService.buildUrl(`/api/devices/deviceHasLease/${deviceId}`);
    return this.httpClient.get<boolean>(url, {
        headers: this.ocapHttpHeadersService.getHeaders(),
      });
    }

  public RequestDeviceLease(deviceId: string): Observable<boolean> {
    console.log(deviceId);
    const url = this.ocapUrlBuilderService.buildUrl(`/api/devices/requestLease/${deviceId}`);
    return this.httpClient.get<boolean>(url, {
        headers: this.ocapHttpHeadersService.getHeaders(),
      });
    }
}
