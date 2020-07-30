import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { HttpClient } from '@angular/common/http';
import { IXr2DevicesList } from '../data-contracts/i-xr2-devices-list';
import { IXr2EventsItem } from '../data-contracts/i-xr2-events-item';
import { IGuidedManualCycleCountItems } from '../../api-core/data-contracts/i-guided-manual-cycle-count-items';

@Injectable({
  providedIn: 'root'
})
export class Xr2EventsService {

  constructor(
    private httpClient: HttpClient,
    private ocapUrlBuilderService: OcapUrlBuilderService,
    private ocapHttpHeadersService: OcapHttpHeadersService
    ) { }

 public getEvents(deviceId: number,startDate: string, endDate: string): Observable<IXr2EventsItem[]> {

    let url = this.ocapUrlBuilderService.buildUrl(`/api/settings/xr2events`);
    const params = {deviceId: deviceId && deviceId.toString(),startDate: startDate,endDate: endDate };
    return this.httpClient.get<IXr2EventsItem[]>(url, {
      headers: this.ocapHttpHeadersService.getHeaders(), params
    });
  }
  
  public getxr2devices(): Observable<IXr2DevicesList[]> {
    const url = this.ocapUrlBuilderService.buildUrl(`/api/settings/xr2devices`);
    return this.httpClient.get<IXr2DevicesList[]>(url, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }
}
