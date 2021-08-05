import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { HttpClient } from '@angular/common/http';
import { IXr2ExceptionsItem } from '../data-contracts/i-xr2-exception-item';
import { IRestockTray } from '../data-contracts/i-restock-tray';
import { ITrayType } from '../data-contracts/i-tray-type';
import { NonstandardJsonArray } from '../../shared/events/i-nonstandard-json-array';

@Injectable({
  providedIn: 'root'
})
export class Xr2RestockTrayService {

  constructor(
    private httpClient: HttpClient,
    private ocapUrlBuilderService: OcapUrlBuilderService,
    private ocapHttpHeadersService: OcapHttpHeadersService
    ) { }

  getRestockTrayById(trayId: string): Observable<IRestockTray> {
    const url = this.ocapUrlBuilderService.buildUrl(`/api/restocktray/trayId/` + trayId);
    return this.httpClient.get<IRestockTray>(url, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }

  getTrayTypes(): Observable<NonstandardJsonArray<ITrayType>>{
    const url = this.ocapUrlBuilderService.buildUrl(`/api/traytype/traytypes`);
    return this.httpClient.get<NonstandardJsonArray<ITrayType>>(url, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }
}
