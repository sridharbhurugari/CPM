import { Injectable } from '@angular/core';
import { IDeviceReplenishmentNeed } from '../data-contracts/i-device-replenishment-need';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { IItemReplenishmentNeed } from '../data-contracts/i-item-replenishment-need';
import { IItemNeedsOperationResult } from '../data-contracts/i-item-needs-operation-result';
import { INeedsItemQuantity } from '../../shared/events/i-needs-item-quantity';

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

  pickDeviceItemNeeds(deviceId: number, items: IItemReplenishmentNeed[]): Observable<IItemNeedsOperationResult[]> {
    const body = {
      DeviceId: deviceId,
      Items: items,
    };
    const url = this.ocapUrlBuilderService.buildUrl(`/api/InterDeviceTransfer/PickQueue`);
    return this.httpClient.put<IItemNeedsOperationResult[]>(url, body, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }
}
