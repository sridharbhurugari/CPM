import { Injectable } from '@angular/core';
import { IPicklistQueueItem } from '../data-contracts/i-picklist-queue-item';
import { Observable, of } from 'rxjs';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { HttpClient } from '@angular/common/http';
import { GlobalDispenseSyncRequest } from '../data-contracts/global-dispense-sync-request';
import { catchError } from 'rxjs/operators';
import { PickListLineDetail } from '../data-contracts/pick-list-line-detail';

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

  sendToRobot(deviceId: number, globalDispenseSyncRequest: GlobalDispenseSyncRequest) {
    const url = this.ocapUrlBuilderService.buildUrl('/api/xr2picklistsqueues/' + deviceId + '/SendToRobot');
    return this.httpClient.post(url, globalDispenseSyncRequest, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }

  printLabels(deviceId: number, picklistLineDetails: Array<PickListLineDetail>) {
    const url = this.ocapUrlBuilderService.buildUrl('/api/xr2picklistsqueues/' + deviceId + '/PrintLabels');
    return this.httpClient.post(url, picklistLineDetails, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }

}