import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { HttpClient } from '@angular/common/http';
import { IXr2ExceptionsItem } from '../data-contracts/i-xr2-exception-item';

@Injectable({
  providedIn: 'root'
})
export class Xr2ExceptionsService {

  constructor(
    private httpClient: HttpClient,
    private ocapUrlBuilderService: OcapUrlBuilderService,
    private ocapHttpHeadersService: OcapHttpHeadersService
    ) { }

  get(): Observable<IXr2ExceptionsItem[]> {
    const url = this.ocapUrlBuilderService.buildUrl(`/api/restocktrayviews/exceptions`);
    return this.httpClient.get<IXr2ExceptionsItem[]>(url, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }
  gettraytypes(): Observable<string[]> {
    const url = this.ocapUrlBuilderService.buildUrl(`/api/restocktrayviews/traytypes`);
    return this.httpClient.get<string[]>(url, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }
}
