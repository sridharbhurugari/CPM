import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';

@Injectable({
  providedIn: 'root'
})
export class InventoryManagementService {

  constructor(    
    private httpClient: HttpClient,
    private ocapUrlBuilderService: OcapUrlBuilderService,
    private ocapHttpHeadersService: OcapHttpHeadersService
) { }

public getHighPriorityPickRequestCount(): Observable<number> {
  const url = this.ocapUrlBuilderService.buildUrl(`/api/InventoryManagement/GetHighPriorityPickRequestCount`);
  const result = this.httpClient.get<number>(url, {
    headers: this.ocapHttpHeadersService.getHeaders()
  });

  return result;
}

}
