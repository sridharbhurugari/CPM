import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IXr2Stocklist } from '../../api-core/data-contracts/i-xr2-stocklist';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {

  constructor(
    private httpClient: HttpClient,
    private ocapUrlBuilderService: OcapUrlBuilderService,
    private ocapHttpHeadersService: OcapHttpHeadersService
    ) { }

  getInvoiceItems(): Observable<IXr2Stocklist[]> {
    const url = this.ocapUrlBuilderService.buildUrl('/api/xr2stocklist');
    return this.httpClient.get<IXr2Stocklist[]>(url, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }

  deleteInvoice(invoice: IXr2Stocklist): Observable<boolean> {
    const url = this.ocapUrlBuilderService.buildUrl('/api/xr2stocklist/delete');
    const request = {
      ItemId: invoice.ItemId,
      DeviceId: invoice.DeviceId
    }
    return this.httpClient.post<boolean>(url, request, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }
}
