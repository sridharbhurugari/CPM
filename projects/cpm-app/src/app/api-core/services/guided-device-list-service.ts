import { Injectable, RootRenderer } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { IGuidedDeviceList } from '../data-contracts/i-guided-device-list';
import { GuidedDeviceList } from '../../core/model/guided-device-list';
import { IDeviceConfiguration } from '../data-contracts/i-device-configuration';

@Injectable({
  providedIn: 'root'
})
export class GuidedDeviceListService {
  constructor(
    private httpClient: HttpClient,
    private ocapUrlBuilderService: OcapUrlBuilderService,
    private ocapHttpHeadersService: OcapHttpHeadersService
  ) { }

  public get(): Observable<IGuidedDeviceList[]>{
    var url = this.ocapUrlBuilderService.buildUrl('/api/devices/itemLocations/cycleCountSummaries');
    return this.httpClient.get<IGuidedDeviceList[]>(url, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }

  public getDeviceDefaultOwner(deviceId: number): Observable<IDeviceConfiguration[]> {
    var url = this.ocapUrlBuilderService.buildUrl(`/api/devices/${deviceId}/configuration`);
    return this.httpClient.get<IDeviceConfiguration[]>(url, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }

}
