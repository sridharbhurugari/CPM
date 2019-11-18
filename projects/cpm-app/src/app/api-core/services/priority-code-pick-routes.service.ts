import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IPriorityCodePickRoute } from '../data-contracts/i-priority-code-pick-route';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PriorityCodePickRoutesService {

  constructor(
    private httpClient: HttpClient,
    private ocapUrlBuilderService: OcapUrlBuilderService,
    private ocapHttpHeadersService: OcapHttpHeadersService
  ) { }

  get(): Observable<IPriorityCodePickRoute[]> {
    var url = this.ocapUrlBuilderService.buildUrl('/api/priorityCodePickRoutes');
    return this.httpClient.get<IPriorityCodePickRoute[]>(url, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }

  getPriority(pickRouteId: number): Observable<IPriorityCodePickRoute> {
    var url = this.ocapUrlBuilderService.buildUrl(`/api/priorityCodePickRoutes/${pickRouteId}`);
    return this.httpClient.get<IPriorityCodePickRoute>(url, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }
}
