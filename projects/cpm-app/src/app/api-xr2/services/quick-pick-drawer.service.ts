import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { HttpClient } from '@angular/common/http';
import { QuickPickDrawerData } from '../../xr2/model/quick-pick-drawer-data';
import { QuickPickPrintRequest } from '../../xr2/model/quick-pick-print-request';

@Injectable({
  providedIn: 'root'
})
export class Xr2QuickPickDrawerService {

  constructor(
    private httpClient: HttpClient,
    private ocapUrlBuilderService: OcapUrlBuilderService,
    private ocapHttpHeadersService: OcapHttpHeadersService
    ) { }

  getAllDrawers(deviceId: string): Observable<QuickPickDrawerData[]> {
    const url = this.ocapUrlBuilderService.buildUrl(`/api/quickpick/alldrawers/` + deviceId);
    return this.httpClient.get<QuickPickDrawerData[]>(url, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }

  printLabel(deviceId: string, printRequest: QuickPickPrintRequest): void {
    const url = this.ocapUrlBuilderService.buildUrl(`/api/quickpick/printdrawer/` + deviceId);
    this.httpClient.post(url, printRequest, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }
}
