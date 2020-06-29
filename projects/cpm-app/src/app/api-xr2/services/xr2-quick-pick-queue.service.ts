import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { HttpClient } from '@angular/common/http';
import { QuickPickQueueItem } from '../../xr2/model/quick-pick-queue-item';
import { IQuickPickQueueItem } from '../data-contracts/i-quick-pick-queue-item';

@Injectable({
  providedIn: 'root'
})
export class Xr2QuickPickQueueService {

  constructor(
    private httpClient: HttpClient,
    private ocapUrlBuilderService: OcapUrlBuilderService,
    private ocapHttpHeadersService: OcapHttpHeadersService
    ) { }

  get(deviceId: string): Observable<QuickPickQueueItem[]> {
    const url = this.ocapUrlBuilderService.buildUrl(`/api/quickpickqueue/` + deviceId);
    return this.httpClient.get<QuickPickQueueItem[]>(url, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }

  reroute(quickPickQueueItem: IQuickPickQueueItem): Observable<boolean> {
    const url = this.ocapUrlBuilderService.buildUrl(`/api/quickpickqueue/reroute`);
    return this.httpClient.post<boolean>(url, quickPickQueueItem, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }
}
