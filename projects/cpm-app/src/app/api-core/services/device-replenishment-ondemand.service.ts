import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { IInterDeviceTransferPickRequest } from '../data-contracts/i-inter-device-transfer-pick-request';
import { IItemReplenishmentOnDemand } from '../data-contracts/i-item-replenishment-ondemand';

@Injectable({
  providedIn: 'root'
})
export class DeviceReplenishmentOnDemandService {

  constructor(
    private httpClient: HttpClient,
    private ocapUrlBuilderService: OcapUrlBuilderService,
    private ocapHttpHeadersService: OcapHttpHeadersService,
  ) { }

  getDeviceAssignedItems(deviceId: number): Observable<IItemReplenishmentOnDemand[]> {
    const url = this.ocapUrlBuilderService.buildUrl(`/api/InterDeviceTransfer/${deviceId}/OnDemand`);
    return this.httpClient.get<IItemReplenishmentOnDemand[]>(url, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }

  pickDeviceItemNeeds(deviceId: number, items: IInterDeviceTransferPickRequest[]): Observable<any> {
    const url = this.ocapUrlBuilderService.buildUrl('/api/InterDeviceTransfer/${deviceId}/OnDemand');
    return this.httpClient.post(url, items, {
      headers: this.ocapHttpHeadersService.getHeaders(),
    });
  }
}
