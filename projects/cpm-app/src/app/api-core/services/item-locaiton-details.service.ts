import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { IItemLocationDetail } from '../data-contracts/i-item-location-detail';

@Injectable({
  providedIn: 'root'
})
export class ItemLocaitonDetailsService {

  constructor(
    private httpClient: HttpClient,
    private ocapUrlBuilderService: OcapUrlBuilderService,
    private ocapHttpHeadersService: OcapHttpHeadersService
  ) { }

  get(itemId: string): Observable<IItemLocationDetail[]> {
    let url = this.ocapUrlBuilderService.buildUrl(`/api/standard/itemLocationDetails?itemId=${itemId}`);
    return this.httpClient.get<IItemLocationDetail[]>(url, { headers: this.ocapHttpHeadersService.getHeaders() });
  }

  getInternalTransfer(itemId: string): Observable<IItemLocationDetail[]> {
    let url = this.ocapUrlBuilderService.buildUrl(`/api/standard/itemLocationDetails/InternalTransfers?itemId=${itemId}`);
    return this.httpClient.get<IItemLocationDetail[]>(url, { headers: this.ocapHttpHeadersService.getHeaders() });
  }
}
