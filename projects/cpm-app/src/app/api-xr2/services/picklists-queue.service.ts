import { Injectable } from '@angular/core';
import { IPicklistQueueItem } from '../data-contracts/i-picklist-queue-item';
import { Observable, of } from 'rxjs';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PicklistsQueueService {

  constructor(
    private httpClient: HttpClient,
    private ocapUrlBuilderService: OcapUrlBuilderService,
    private ocapHttpHeadersService: OcapHttpHeadersService
    ) { }

  get(): Observable<IPicklistQueueItem[]> {
    const url = this.ocapUrlBuilderService.buildUrl('/api/xr2picklistsqueues');
    return this.httpClient.get<IPicklistQueueItem[]>(url, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });

  }
}
