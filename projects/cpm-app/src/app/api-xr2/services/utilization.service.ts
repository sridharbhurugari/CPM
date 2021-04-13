import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilizationService {

  constructor(
    private httpClient: HttpClient,
    private ocapUrlBuilderService: OcapUrlBuilderService,
    private ocapHttpHeadersService: OcapHttpHeadersService
    ) { }

  public get(xr2DeviceId: number): Observable<number> {
    const url = this.ocapUrlBuilderService.buildUrl(`/api/utilization`);
    const params = { xr2DeviceId: xr2DeviceId.toString() };

    const results = this.httpClient.get<number>( url, {
      headers: this.ocapHttpHeadersService.getHeaders(), params
    });
    return results;
  }
}
