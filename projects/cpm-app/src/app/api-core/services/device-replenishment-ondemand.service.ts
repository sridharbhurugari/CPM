import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { IInterDeviceTransferPickRequest } from '../data-contracts/i-inter-device-transfer-pick-request';
import { IItemReplenishmentOnDemand } from '../data-contracts/i-item-replenishment-ondemand';
import { IItemReplenishmentOnDemandItemLocations } from '../data-contracts/i-item-replenishment-ondemand-item-locations';
import { IInterDeviceTransferOnDemandPickRequest } from '../data-contracts/i-inter-device-transfer-ondemand-pick-request';

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

  getAvailableItemLocations(deviceId: number, itemId: string): Observable<IItemReplenishmentOnDemandItemLocations[]> {
    const url = this.ocapUrlBuilderService.buildUrl(`/api/InterDeviceTransfer/${deviceId}/OnDemand/AvailableLocations/${itemId}`);
    return this.httpClient.get<IItemReplenishmentOnDemandItemLocations[]>(url, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }

  pickDeviceItemNeeds(deviceId: number, pickInfo: IInterDeviceTransferOnDemandPickRequest): Observable<any> {
    const url = this.ocapUrlBuilderService.buildUrl(`/api/InterDeviceTransfer/${deviceId}/OnDemand`);
    return this.httpClient.post(url, pickInfo, {
      headers: this.ocapHttpHeadersService.getHeaders(),
    });
  }
}
