import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { IDevice } from '../data-contracts/i-device';
import { HttpClient } from '@angular/common/http';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';

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
}
