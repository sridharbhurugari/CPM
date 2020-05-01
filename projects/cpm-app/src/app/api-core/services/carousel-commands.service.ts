import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { IDeviceOperationResult } from '../data-contracts/i-device-operation-result';
import { Observable } from 'rxjs';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root'
})
export class CarouselCommandsService {

  constructor(
    private httpClient: HttpClient,
    private ocapUrlBuilderService: OcapUrlBuilderService,
    private ocapHttpHeadersService: OcapHttpHeadersService
  ) { }

  moveToShelf(requestCorrelationId: Guid, deviceId: number, shelfNumber: number): Observable<IDeviceOperationResult> {
    let url = this.ocapUrlBuilderService.buildUrl('/api/carousel/go');
    let headers = this.ocapHttpHeadersService.getHeaders();
    let moveRequest = {
      RequestId: requestCorrelationId.toString(),
      DeviceId: deviceId,
      Shelf: shelfNumber,
    };

    return this.httpClient.post<IDeviceOperationResult>(url, moveRequest, {
      headers: headers
    });
  }

  clearLightbar(requestCorrelationId: Guid, deviceId: number): Observable<IDeviceOperationResult> {
    let url = this.ocapUrlBuilderService.buildUrl('/api/carousel/clearDisplay');
    let headers = this.ocapHttpHeadersService.getHeaders();
    let clearRequest = {
      RequestId: requestCorrelationId.toString(),
      DeviceId: deviceId,
    };

    return this.httpClient.post<IDeviceOperationResult>(url, clearRequest, {
      headers: headers
    });
  }

  displayLightbar(requestCorrelationId: Guid, deviceId: number, binNumber: number, slotNumber: number, itemDisplay: string, quantityDisplay: number, unitsDisplay: string): Observable<IDeviceOperationResult> {
    let url = this.ocapUrlBuilderService.buildUrl('/api/carousel/displayGuidanceText');
    let headers = this.ocapHttpHeadersService.getHeaders();
    let displayRequest = {
      RequestId: requestCorrelationId.toString(),
      DeviceId: deviceId,
      Bin: binNumber,
      Slot: slotNumber,
      Quantity: quantityDisplay,
      Description: itemDisplay,
      Units: unitsDisplay,
    };

    return this.httpClient.post<IDeviceOperationResult>(url, displayRequest, {
      headers: headers
    });
  }
}
