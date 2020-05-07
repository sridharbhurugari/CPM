import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { Observable } from 'rxjs';
import { IGuidedCycleCount } from '../data-contracts/i-guided-cycle-count';
import { deviceCycleCountItemUpdate } from '../data-contracts/guided-cycle-count-update';
import { GuidedCycleCountPrintLabel } from '../data-contracts/guided-cycle-count-print-label';
import { IDeviceConfiguration } from '../data-contracts/i-device-configuration';


@Injectable({
    providedIn: 'root'
  })
  export class GuidedCycleCountService {
    constructor(
      private httpClient: HttpClient,
      private ocapUrlBuilderService: OcapUrlBuilderService,
      private ocapHttpHeadersService: OcapHttpHeadersService
    ) { }

    public get(deviceId: string): Observable<IGuidedCycleCount[]>{
        var url = this.ocapUrlBuilderService.buildUrl(`/api/devices/${deviceId}/itemLocations/cycleCount`);
        return this.httpClient.get<IGuidedCycleCount[]>(url, {
          headers: this.ocapHttpHeadersService.getHeaders()
        });
      }
    

  public post(deviceId: string,item: deviceCycleCountItemUpdate): Observable<boolean>{
    var url = this.ocapUrlBuilderService.buildUrl(`/api/devices/${deviceId}/itemLocations/cycleCount/update`);
      return this.httpClient.post<boolean>(url, item, {
        headers: this.ocapHttpHeadersService.getHeaders(),
      });
    }

    public PrintLabel(deviceId: string, binData: GuidedCycleCountPrintLabel): Observable<boolean> {
      const url = this.ocapUrlBuilderService.buildUrl(`/api/devices/${deviceId}/itemLocations/cycleCount/PrintLabel`);
      return this.httpClient.post<boolean>(url, binData, {
        headers: this.ocapHttpHeadersService.getHeaders()
      });
    }

    public getDeviceConfiguration(deviceId: number): Observable<IDeviceConfiguration> {
      const url = this.ocapUrlBuilderService.buildUrl(`/api/devices/${deviceId}/configuration`);
      return this.httpClient.get<IDeviceConfiguration>(url, {
        headers: this.ocapHttpHeadersService.getHeaders()
      });
    }

  } 
