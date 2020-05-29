import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { IItemManagement } from '../data-contracts/i-item-management';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemManagementService {

  constructor(
    private httpClient: HttpClient,
    private ocapUrlBuilderService: OcapUrlBuilderService,
    private ocapHttpHeadersService: OcapHttpHeadersService
  ) { }

  public get(): Observable<IItemManagement[]> {
    const url = this.ocapUrlBuilderService.buildUrl(`/api/ItemManagement`);
    const serviceHeaders = this.ocapHttpHeadersService.getHeaders();
    const result = this.httpClient.get<IItemManagement[]>(url, {
      headers: serviceHeaders
    });

    return result;
  }
}
