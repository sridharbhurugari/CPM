import { Injectable } from '@angular/core';
import { IPicklistQueueItem } from '../data-contracts/i-picklist-queue-item';
import { Observable, of } from 'rxjs';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { HttpClient } from '@angular/common/http';
import { GlobalDispenseSyncRequest } from '../data-contracts/global-dispense-sync-request';
import { catchError } from 'rxjs/operators';
import { RobotPrintRequest } from '../data-contracts/robot-print-request';
import { ReroutePickListLine } from '../data-contracts/reroute-pick-list-line';

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

  printLabels(deviceId: number, robotPrintRequest: RobotPrintRequest) {
    const url = this.ocapUrlBuilderService.buildUrl('/api/xr2picklistsqueues/' + deviceId + '/PrintLabels');
    return this.httpClient.post(url, robotPrintRequest, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }

  reroute(reroutePickListLine: ReroutePickListLine) {
    const url = this.ocapUrlBuilderService.buildUrl('/api/xr2picklistsqueues/Reroute');
    return this.httpClient.post(url, reroutePickListLine, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }
}
