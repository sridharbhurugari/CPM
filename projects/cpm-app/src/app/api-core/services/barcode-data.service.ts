import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { IBarcodeData } from '../data-contracts/i-barcode-data';

@Injectable({
  providedIn: 'root'
})
export class BarcodeDataService {
  private readonly _path: string = '/api/barcodeData';

  constructor(
    private httpClient: HttpClient,
    private ocapUrlBuilderService: OcapUrlBuilderService,
    private ocapHttpHeadersService: OcapHttpHeadersService,
  ) { }

  getData(rawBarcode: string): Observable<IBarcodeData> {
    var url = this.ocapUrlBuilderService.buildUrl(`${this._path}?rawBarcode=${rawBarcode}`);
    return this.httpClient.get<IBarcodeData>(url, {
      headers: this.ocapHttpHeadersService.getHeaders(),
    });
  }
}
