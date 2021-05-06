import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { IItemAlias } from '../data-contracts/i-item-alias';

@Injectable({
  providedIn: 'root'
})
export class ItemDetailsService {

  constructor(
    private httpClient: HttpClient,
    private ocapUrlBuilderService: OcapUrlBuilderService,
    private ocapHttpHeadersService: OcapHttpHeadersService
  ) { }

  getAlias(itemId: string): Observable<IItemAlias> {
    let url = this.ocapUrlBuilderService.buildUrl(`/api/itemdetails/alias/${itemId}`);
    return this.httpClient.get<IItemAlias>(url, { headers: this.ocapHttpHeadersService.getHeaders() });
  }
}
