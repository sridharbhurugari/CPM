import { Injectable } from '@angular/core';
import { IDeviceReplenishmentNeed } from '../data-contracts/i-device-replenishment-need';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { IItemReplenishmentNeed } from '../data-contracts/i-item-replenishment-need';
import { IInterDeviceTransferPickRequest } from '../data-contracts/i-inter-device-transfer-pick-request';
import { IItemReplenishmentOnDemand } from '../data-contracts/i-item-replenishment-ondemand';

@Injectable({
  providedIn: 'root'
})
export class DeviceReplenishmentNeedsService {

  constructor(
    private httpClient: HttpClient,
    private ocapUrlBuilderService: OcapUrlBuilderService,
    private ocapHttpHeadersService: OcapHttpHeadersService,
  ) { }

  get(): Observable<IDeviceReplenishmentNeed[]> {
    const url = this.ocapUrlBuilderService.buildUrl('/api/InterDeviceTransfer');
    return this.httpClient.get<IDeviceReplenishmentNeed[]>(url, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }

  getDeviceItemNeeds(deviceId: number): Observable<IItemReplenishmentNeed[]> {
    const url = this.ocapUrlBuilderService.buildUrl(`/api/InterDeviceTransfer/${deviceId}`);
    return this.httpClient.get<IItemReplenishmentNeed[]>(url, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }

  getDeviceNeedsForItem(deviceId: number, itemId: string, orderId: string): Observable<IItemReplenishmentNeed[]> {
    const url = this.ocapUrlBuilderService.buildUrl(`/api/InterDeviceTransfer/${deviceId}?itemId=${itemId}&orderId=${orderId}`);
    return this.httpClient.get<IItemReplenishmentNeed[]>(url, {
      params: { itemId },
      headers: this.ocapHttpHeadersService.getHeaders(),
    });
  }

  getDeviceAssignedItems(deviceId: number): Observable<IItemReplenishmentOnDemand[]> {
    const url = this.ocapUrlBuilderService.buildUrl(`/api/InterDeviceTransfer/${deviceId}/OnDemand`);
    return this.httpClient.get<IItemReplenishmentOnDemand[]>(url, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }

  pickDeviceItemNeeds(deviceId: number, pickInfo: IInterDeviceTransferPickRequest[]): Observable<any> {
    const url = this.ocapUrlBuilderService.buildUrl(`/api/InterDeviceTransfer/${deviceId}/picklists`);
    return this.httpClient.post(url, pickInfo, {
      headers: this.ocapHttpHeadersService.getHeaders(),
    });
  }
}
