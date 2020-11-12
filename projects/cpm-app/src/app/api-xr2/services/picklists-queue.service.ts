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
import { IPicklistQueueGrouped } from '../data-contracts/i-picklist-queue-grouped';
import { PicklistQueueGrouped } from '../../xr2/model/picklist-queue-grouped';

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

  getGroupDetails(pickPriorityIdentity: string, deviceId: string): Observable<IPicklistQueueItem[]> {
    const url = this.ocapUrlBuilderService.buildUrl('/api/xr2picklistsqueue/grouped/' + pickPriorityIdentity + '/' + deviceId);

    return this.httpClient.get<IPicklistQueueItem[]>(url, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }

  getGrouped(): Observable<IPicklistQueueGrouped[]> {
    const url = this.ocapUrlBuilderService.buildUrl('/api/xr2picklistsqueuesgrouped');
    return this.httpClient.get<IPicklistQueueGrouped[]>(url, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }

  getGroupedFiltered(deviceId: number, pickPriorityIdentity: number): Observable<IPicklistQueueGrouped> {
    const url = this.ocapUrlBuilderService.buildUrl('/api/xr2picklistsqueuesgrouped/' + deviceId + '/' + pickPriorityIdentity);
    return this.httpClient.get<IPicklistQueueGrouped>(url, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }

  // TODO: Xr2- Clean up
  sendToRobot(deviceId: number, globalDispenseSyncRequest: GlobalDispenseSyncRequest) {
    console.log(globalDispenseSyncRequest);
    const url = this.ocapUrlBuilderService.buildUrl('/api/xr2picklistsqueues/' + deviceId + '/SendToRobot');
    return this.httpClient.post(url, globalDispenseSyncRequest, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }

  sendQueueItemsToRobot(globalDispenseSyncRequests: Array<GlobalDispenseSyncRequest>) {
    console.log(globalDispenseSyncRequests);
    const url = this.ocapUrlBuilderService.buildUrl('/api/xr2picklistsqueues/SendQueueItemsToRobot');
    return this.httpClient.post(url, globalDispenseSyncRequests, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }

  sendToRobotGrouped(picklistQueueGrouped: PicklistQueueGrouped) {
    const url = this.ocapUrlBuilderService.buildUrl('/api/xr2picklistsqueue/SendToRobotGrouped');
    return this.httpClient.post(url, picklistQueueGrouped, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }

  // TODO: Xr2- Clean up
  skip(deviceId: number, globalDispenseSyncRequest: GlobalDispenseSyncRequest) {
    const url = this.ocapUrlBuilderService.buildUrl('/api/xr2picklistsqueues/' + deviceId + '/Skip');
    return this.httpClient.post(url, globalDispenseSyncRequest, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }

  rerouteQueueItems(globalDispenseSyncRequest: Array<GlobalDispenseSyncRequest>) {
    const url = this.ocapUrlBuilderService.buildUrl('/api/xr2picklistsqueues/RerouteQueueItems');
    return this.httpClient.post(url, globalDispenseSyncRequest, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }

  // TODO: Xr2- Clean up
  printLabels(deviceId: number, robotPrintRequest: RobotPrintRequest) {
    const url = this.ocapUrlBuilderService.buildUrl('/api/xr2picklistsqueues/' + deviceId + '/PrintLabels');
    return this.httpClient.post(url, robotPrintRequest, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }

  printQueueItemsLabels(robotPrintRequests: Array<RobotPrintRequest>) {
    const url = this.ocapUrlBuilderService.buildUrl('/api/xr2picklistsqueues/PrintQueueItemsLabels');
    return this.httpClient.post(url, robotPrintRequests, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }
}
