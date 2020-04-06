import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IPriorityCodePickRoute } from '../data-contracts/i-priority-code-pick-route';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { HttpClient } from '@angular/common/http';
import { IPriorityCodePickRouteEdit } from '../data-contracts/i-priority-code-pickroute-edit';

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

  getPriority(priorityCodePickRouteId: number): Observable<IPriorityCodePickRoute> {
    var url = this.ocapUrlBuilderService.buildUrl(`/api/priorityCodePickRoutes/${priorityCodePickRouteId}`);
    return this.httpClient.get<IPriorityCodePickRoute>(url, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }

  save(priorityCodePickRouteChange: IPriorityCodePickRouteEdit): Observable<IPriorityCodePickRoute> {
    let url = this.ocapUrlBuilderService.buildUrl(`/api/priorityCodePickRoutes/${priorityCodePickRouteChange}`);
    return this.httpClient.get<IPriorityCodePickRoute>(url, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }
}
