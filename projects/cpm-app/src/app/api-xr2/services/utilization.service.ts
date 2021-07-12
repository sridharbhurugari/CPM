import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { HttpClient } from '@angular/common/http';
import { IXR2InventoryLists } from '../../api-core/data-contracts/i-xr2-inventory-lists';

@Injectable({
  providedIn: 'root'
})
export class UtilizationService {

  constructor(
    private httpClient: HttpClient,
    private ocapUrlBuilderService: OcapUrlBuilderService,
    private ocapHttpHeadersService: OcapHttpHeadersService
    ) { }

  public get(xr2DeviceId: number): Observable<number> {
    const url = this.ocapUrlBuilderService.buildUrl(`/api/PocketUtilization`);
    const params = { xr2DeviceId: xr2DeviceId.toString() };

    const results = this.httpClient.get<number>( url, {
      headers: this.ocapHttpHeadersService.getHeaders(), params
    });
    return results;
  }

  public getXR2ReportData(deviceId: number): Observable<IXR2InventoryLists[]> {
    const url = this.ocapUrlBuilderService.buildUrl(`/api/PocketUtilization/XR2InventoryReport`);
    const serviceHeaders = this.ocapHttpHeadersService.getHeaders();
    const params = { deviceId: deviceId.toString() };
    
    const result = this.httpClient.get<IXR2InventoryLists[]>(url, {
      headers: serviceHeaders, params
    });

    return result;

  }
}
