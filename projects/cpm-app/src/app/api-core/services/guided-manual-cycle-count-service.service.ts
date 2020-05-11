import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { Observable } from 'rxjs';
import { GuidedManualCycleCountItemid } from '../data-contracts/guided-manual-cycle-count-itemid'
import { deviceCycleCountItemUpdate } from '../data-contracts/guided-cycle-count-update';
import {IGuidedManualCycleCountItems } from '../data-contracts/i-guided-manual-cycle-count-items'

@Injectable({
  providedIn: 'root'
})
export class GuidedManualCycleCountServiceService {

  constructor( private httpClient: HttpClient,
    private ocapUrlBuilderService: OcapUrlBuilderService,
    private ocapHttpHeadersService: OcapHttpHeadersService
    ) { }

    public get(itemid: string): Observable<GuidedManualCycleCountItemid[]>{
      var url = this.ocapUrlBuilderService.buildUrl(`/api/devices/itemLocations/cycleCount/${itemid}`);
      return this.httpClient.get<GuidedManualCycleCountItemid[]>(url, {
        headers: this.ocapHttpHeadersService.getHeaders()
      });
    }

    public post(deviceId: string,item: deviceCycleCountItemUpdate): Observable<boolean>{
      var url = this.ocapUrlBuilderService.buildUrl(`/api/devices/${deviceId}/itemLocations/cycleCount/update`);
        return this.httpClient.post<boolean>(url, item, {
          headers: this.ocapHttpHeadersService.getHeaders(),
        });
      }
      public getSearchItems(searchString: string): Observable<IGuidedManualCycleCountItems[]>{
        var url = this.ocapUrlBuilderService.buildUrl('/api/devices/itemLocations/cycleCountSearchItems');
        const params = {searchString: searchString };
        return this.httpClient.get<IGuidedManualCycleCountItems[]>(url, {
          headers: this.ocapHttpHeadersService.getHeaders(),params
        });
      }
}
