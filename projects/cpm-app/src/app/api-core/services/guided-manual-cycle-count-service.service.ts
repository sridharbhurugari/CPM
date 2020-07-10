import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { Observable } from 'rxjs';
import { GuidedManualCycleCountItemid } from '../data-contracts/guided-manual-cycle-count-itemid'
import { deviceCycleCountItemUpdate } from '../data-contracts/guided-cycle-count-update';
import {IGuidedManualCycleCountItems } from '../data-contracts/i-guided-manual-cycle-count-items'
import { GuidedCycleCountPrintLabel } from '../data-contracts/guided-cycle-count-print-label';
import {IGuidedManualCycleCountScanItem} from '../data-contracts/IGuidedMaualCycleCountScanItem';
@Injectable({
  providedIn: 'root'
})
export class GuidedManualCycleCountServiceService {

  constructor( private httpClient: HttpClient,
    private ocapUrlBuilderService: OcapUrlBuilderService,
    private ocapHttpHeadersService: OcapHttpHeadersService
    ) { }

    public get(itemid: string): Observable<GuidedManualCycleCountItemid[]>{
      let url = this.ocapUrlBuilderService.buildUrl(`/api/devices/itemLocations/cycleCount/${itemid}`);
      return this.httpClient.get<GuidedManualCycleCountItemid[]>(url, {
        headers: this.ocapHttpHeadersService.getHeaders()
      });
    }

    public post(deviceId: string,item: deviceCycleCountItemUpdate): Observable<boolean>{
      let url = this.ocapUrlBuilderService.buildUrl(`/api/devices/${deviceId}/itemLocations/cycleCount/update`);
        return this.httpClient.post<boolean>(url, item, {
          headers: this.ocapHttpHeadersService.getHeaders(),
        });
      }
      public getSearchItems(searchString: string): Observable<IGuidedManualCycleCountItems[]>{
        let url = this.ocapUrlBuilderService.buildUrl('/api/devices/itemLocations/cycleCountSearchItems');
        const params = {searchString: searchString };
        return this.httpClient.get<IGuidedManualCycleCountItems[]>(url, {
          headers: this.ocapHttpHeadersService.getHeaders(),params
        });
      }
      public PrintLabel(deviceId: string, binData: GuidedCycleCountPrintLabel): Observable<boolean> {
        const url = this.ocapUrlBuilderService.buildUrl(`/api/devices/${deviceId}/itemLocations/cycleCount/PrintLabel`);
        return this.httpClient.post<boolean>(url, binData, {
          headers: this.ocapHttpHeadersService.getHeaders()
        });
      }
      public getScanItem(scanitem:string):Observable<IGuidedManualCycleCountScanItem[]>{
        let url = this.ocapUrlBuilderService.buildUrl(`/api/guidedcyclecount/manualcyclecount/${scanitem}`);
      return this.httpClient.get<IGuidedManualCycleCountScanItem[]>(url, {
        headers: this.ocapHttpHeadersService.getHeaders()
      });
      }
}
