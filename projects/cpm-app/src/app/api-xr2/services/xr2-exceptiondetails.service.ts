import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { HttpClient } from '@angular/common/http';
import { IXr2ExceptionDetailsItem } from '../data-contracts/i-xr2-exception-details-item';
import { IXr2ExceptionsItem } from '../data-contracts/i-xr2-exception-item';
import {Parameter} from '../../shared/model/parameter.model';
@Injectable({
  providedIn: 'root'
})
export class Xr2ExceptionDetailsService {

  constructor(
    private httpClient: HttpClient,
    private ocapUrlBuilderService: OcapUrlBuilderService,
    private ocapHttpHeadersService: OcapHttpHeadersService
    ) { }

  get(item:IXr2ExceptionsItem): Observable<IXr2ExceptionDetailsItem[]> {
    const url = this.ocapUrlBuilderService.buildUrl(`/api/restocktrayviews/exceptiondetails`);
    const params = {trayID: item.TrayID, deviceID: item.DeviceID,completedDateTime:item.CompletedDateTime};
    return this.httpClient.get<IXr2ExceptionDetailsItem[]>(url ,{
      headers: this.ocapHttpHeadersService.getHeaders(),params
    });
  }
}
