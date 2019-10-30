import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IPriorityCodePickRoute } from '../data-contracts/i-priority-code-pick-route';
import { OcapHttpClientService } from 'oal-core';

@Injectable({
  providedIn: 'root'
})
export class PriorityCodePickRoutesService {

  constructor(
    private ocapHttpClient: OcapHttpClientService
  ) { }

  get(): Observable<IPriorityCodePickRoute[]> {
    return this.ocapHttpClient.fetch<IPriorityCodePickRoute[]>({
      endpoint: '/api/priorityCodePickRoutes'
    });
  }
}
