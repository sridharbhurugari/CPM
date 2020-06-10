import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { HttpClient } from '@angular/common/http';
import { QuickPickQueueItem } from '../../xr2/model/quick-pick-queue-item';

@Injectable({
  providedIn: 'root'
})
export class Xr2QuickPickQueueService {

  constructor(
    private httpClient: HttpClient,
    private ocapUrlBuilderService: OcapUrlBuilderService,
    private ocapHttpHeadersService: OcapHttpHeadersService
    ) { }

  get(deviceId: number): Observable<QuickPickQueueItem[]> {
    const url = this.ocapUrlBuilderService.buildUrl(`/api/quickpickqueue/` + deviceId);
    return this.httpClient.get<QuickPickQueueItem[]>(url, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }
}
