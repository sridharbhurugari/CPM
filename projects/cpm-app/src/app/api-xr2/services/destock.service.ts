import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { HttpClient } from '@angular/common/http';
import { IDestockTypeInfo } from '../data-contracts/i-destock-type-info';

@Injectable({
  providedIn: 'root'
})
export class DestockService {

  constructor(
    private httpClient: HttpClient,
    private ocapUrlBuilderService: OcapUrlBuilderService,
    private ocapHttpHeadersService: OcapHttpHeadersService
    ) { }

  public get(xr2DeviceId: number): Observable<IDestockTypeInfo[]> {
    const url = this.ocapUrlBuilderService.buildUrl(`/api/destock`);
    const params = { xr2DeviceId: xr2DeviceId.toString() };

    return this.httpClient.get<IDestockTypeInfo[]>( url, {
      headers: this.ocapHttpHeadersService.getHeaders(), params
    });
  }
}
