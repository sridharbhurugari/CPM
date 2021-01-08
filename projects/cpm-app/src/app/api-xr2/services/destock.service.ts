import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { HttpClient } from '@angular/common/http';
import { IDestockTypeInfo } from '../data-contracts/i-destock-type-info';
import { DestockTypeInfo } from '../../xr2/model/destock-type-info';

@Injectable({
  providedIn: 'root'
})
export class DestockService {

  constructor(
    private httpClient: HttpClient,
    private ocapUrlBuilderService: OcapUrlBuilderService,
    private ocapHttpHeadersService: OcapHttpHeadersService
    ) { }

  public get(xr2DeviceId: number): Observable<DestockTypeInfo[]> {
    const url = this.ocapUrlBuilderService.buildUrl(`/api/destock`);
    const params = { xr2DeviceId: xr2DeviceId.toString() };

    const results = this.httpClient.get<DestockTypeInfo[]>( url, {
      headers: this.ocapHttpHeadersService.getHeaders(), params
    });
    return results;
  }

  public print(deviceId: number, orderBoxBarcode: string, orderBoxBarcodeDisplay: string): Observable<object> {
    const url = this.ocapUrlBuilderService.buildUrl(`/api/destock/print`);
    var data = {
      DeviceId: deviceId,
      OrderBoxBarcode: orderBoxBarcode,
      OrderBoxBarcodeDisplay : orderBoxBarcodeDisplay
    };

    return this.httpClient.post(url, data, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }
}
