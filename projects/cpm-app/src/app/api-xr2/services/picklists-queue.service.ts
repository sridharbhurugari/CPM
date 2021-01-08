import { Injectable } from '@angular/core';
import { IPicklistQueueItem } from '../data-contracts/i-picklist-queue-item';
import { Observable, of } from 'rxjs';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { HttpClient } from '@angular/common/http';
import { RobotPrintRequest } from '../data-contracts/robot-print-request';
import { IPicklistQueueGrouped } from '../data-contracts/i-picklist-queue-grouped';
import { PicklistQueueGrouped } from '../../xr2/model/picklist-queue-grouped';
import { IReleaseablePicklistQueueItem } from '../data-contracts/i-releaseable-picklist-queue-item';
import { IReroutablePicklistQueueItem } from '../data-contracts/i-reroutable-picklist-queue-item';

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

  sendQueueItemsToRobot(pickPriorityIdentity: string, picklistQueueItems: Array<IReleaseablePicklistQueueItem>) {
    console.log(picklistQueueItems);
    const url = this.ocapUrlBuilderService.buildUrl('/api/xr2picklistsqueues/SendQueueItemsToRobot/' + pickPriorityIdentity);
    return this.httpClient.post(url, picklistQueueItems, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }

  sendToRobotGrouped(picklistQueueGrouped: PicklistQueueGrouped) {
    const url = this.ocapUrlBuilderService.buildUrl('/api/xr2picklistsqueue/SendToRobotGrouped');
    return this.httpClient.post(url, picklistQueueGrouped, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }

  rerouteQueueItems(picklistQueueItems: Array<IReroutablePicklistQueueItem>) {
    const url = this.ocapUrlBuilderService.buildUrl('/api/xr2picklistsqueues/RerouteQueueItems');
    return this.httpClient.post(url, picklistQueueItems, {
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
