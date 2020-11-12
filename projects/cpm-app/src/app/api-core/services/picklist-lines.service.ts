import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable, of } from 'rxjs';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { IPicklistLine } from '../data-contracts/i-picklist-line';
import { IPicklistLineFillData } from '../data-contracts/i-picklist-line-fill-data';

@Injectable({
  providedIn: 'root'
})
export class PicklistLinesService {

  constructor(
    private httpClient: HttpClient,
    private ocapUrlBuilderService: OcapUrlBuilderService,
    private ocapHttpHeadersService: OcapHttpHeadersService
  ) { }

  get(picklistLineId: Guid): Observable<IPicklistLine> {
    const url = this.ocapUrlBuilderService.buildUrl(`/api/picklistLines/${picklistLineId}`);
    return this.httpClient.get<IPicklistLine>(url, { headers: this.ocapHttpHeadersService.getHeaders() });
  }

  completePick(pickItems: IPicklistLineFillData): Observable<boolean> {
    const url = this.ocapUrlBuilderService.buildUrl(`api/picklistLines/picklistLineFills`);
    const headers = this.ocapHttpHeadersService.getHeaders();
    return this.httpClient.put<boolean>(url, pickItems, { headers: headers });
  }
}
