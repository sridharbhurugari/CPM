import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { Observable } from 'rxjs';
import { IGuidedCycleCount } from '../data-contracts/i-guided-cycle-count';
import { deviceCycleCountItemUpdate } from '../data-contracts/guided-cycle-count-update';
import { GuidedCycleCountPrintLabel } from '../data-contracts/guided-cycle-count-print-label';
import { IDeviceConfiguration } from '../data-contracts/i-device-configuration';
import { IGuidedCycleCountUpdate } from '../data-contracts/i-guided-cycle-count-update';


@Injectable({
  providedIn: 'root'
})
export class GuidedCycleCountService {
  constructor(
    private httpClient: HttpClient,
    private ocapUrlBuilderService: OcapUrlBuilderService,
    private ocapHttpHeadersService: OcapHttpHeadersService
  ) { }

  public get(deviceId: string): Observable<IGuidedCycleCount[]> {
    var url = this.ocapUrlBuilderService.buildUrl(`/api/devices/${deviceId}/itemLocations/cycleCount`);
    return this.httpClient.get<IGuidedCycleCount[]>(url, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }

  public getConcurrencyItem(deviceLocationId: string, itemId: string): Observable<IGuidedCycleCountUpdate> {
    var url = this.ocapUrlBuilderService.buildUrl(`/api/devices/itemLocations/getconcurrencyitem`);
    const params = { deviceLocationID: deviceLocationId, itemID: itemId };
    return this.httpClient.get<IGuidedCycleCountUpdate>(url, {
      headers: this.ocapHttpHeadersService.getHeaders(), params
    });
  }
  public post(deviceId: string, item: deviceCycleCountItemUpdate): Observable<number> {
    var url = this.ocapUrlBuilderService.buildUrl(`/api/devices/${deviceId}/itemLocations/cycleCount/update`);
    return this.httpClient.post<number>(url, item, {
      headers: this.ocapHttpHeadersService.getHeaders(),
    });
  }

  public PrintLabel(deviceId: string, binData: GuidedCycleCountPrintLabel): Observable<boolean> {
    const url = this.ocapUrlBuilderService.buildUrl(`/api/devices/${deviceId}/itemLocations/cycleCount/PrintLabel`);
    return this.httpClient.post<boolean>(url, binData, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }

  public validscan(itemID: string, barcode: string): Observable<string> {
    const url = this.ocapUrlBuilderService.buildUrl(`/api/devices/itemLocations/ValidScanBarCode`);
    const params = { itemID: itemID, barCode: barcode };
    return this.httpClient.get<string>(url, {
      headers: this.ocapHttpHeadersService.getHeaders(), params
    });
  }

  public canoverridebarcode(): Observable<boolean> {
    const url = this.ocapUrlBuilderService.buildUrl(`/api/devices/itemLocations/CanOverrideBarcode`);
    return this.httpClient.get<boolean>(url, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }
} 
