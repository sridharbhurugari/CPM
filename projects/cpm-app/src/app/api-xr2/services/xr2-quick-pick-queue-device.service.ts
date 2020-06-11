import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { HttpClient } from '@angular/common/http';
import { SelectableDeviceInfo } from '../../shared/model/selectable-device-info';

@Injectable({
  providedIn: 'root'
})
export class Xr2QuickPickQueueDeviceService {

  constructor(
    private httpClient: HttpClient,
    private ocapUrlBuilderService: OcapUrlBuilderService,
    private ocapHttpHeadersService: OcapHttpHeadersService
    ) { }

  get(): Observable<SelectableDeviceInfo[]> {
    const url = this.ocapUrlBuilderService.buildUrl(`/api/quickpickqueue/activedevices`);
    return this.httpClient.get<SelectableDeviceInfo[]>(url, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }
}
