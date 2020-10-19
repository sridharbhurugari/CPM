import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { IDevice } from '../data-contracts/i-device';
import { HttpClient } from '@angular/common/http';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { SelectableDeviceInfo } from '../../shared/model/selectable-device-info';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {

  constructor(
    private httpClient: HttpClient,
    private ocapUrlBuilderService: OcapUrlBuilderService,
    private ocapHttpHeadersService: OcapHttpHeadersService
  ) { }

  get(): Observable<IDevice[]> {
    var url = this.ocapUrlBuilderService.buildUrl('/api/cpmDevices');
    var headers = this.ocapHttpHeadersService.getHeaders();
    return this.httpClient.get<IDevice[]>(url, {
      headers: headers
    });
  }

   getallxr2devices(): Observable<SelectableDeviceInfo[]> {
    var url = this.ocapUrlBuilderService.buildUrl('/api/xr2Devices');
    return this.httpClient.get<SelectableDeviceInfo[]>(url, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }
}
