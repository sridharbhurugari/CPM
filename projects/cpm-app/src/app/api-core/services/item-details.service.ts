import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { IItemDetails } from '../data-contracts/i-item-details';

@Injectable({
  providedIn: 'root'
})
export class ItemDetailsService {

  constructor(
    private httpClient: HttpClient,
    private ocapUrlBuilderService: OcapUrlBuilderService,
    private ocapHttpHeadersService: OcapHttpHeadersService
  ) { }

  get(itemId: string): Observable<string> {
    let url = this.ocapUrlBuilderService.buildUrl(`/api/itemdetails/${itemId}`);
    return this.httpClient.get<string>(url, { headers: this.ocapHttpHeadersService.getHeaders() });
  }
}
