import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { HttpClient } from '@angular/common/http';
import { IPickRouteDevice } from '../data-contracts/i-pickroute-device';

@Injectable({
  providedIn: 'root'
})
export class PriorityCodeRouteAssignmentsService {

  constructor(
    private httpClient: HttpClient,
    private ocapUrlBuilderService: OcapUrlBuilderService,
    private ocapHttpHeadersService: OcapHttpHeadersService
  ) { }

    getRoutes(): Observable<IPickRouteDevice[]> {

      const url = this.ocapUrlBuilderService.buildUrl('/api/PickRoutes');

      return this.httpClient.get<IPickRouteDevice[]>(url, {
        headers: this.ocapHttpHeadersService.getHeaders()
      });
    }

    save(pickRouteGuid: string, priorityCode: string) {
        const body = {
          PriorityCode: priorityCode,
          PickRouteGuid: pickRouteGuid,
        };
        const url = this.ocapUrlBuilderService.buildUrl(`/api/priorityCodePickRoutes`);
        const headers = this.ocapHttpHeadersService.getHeaders();
        return this.httpClient.put(url, body, { headers });
      }

      getUserPermissions() : Observable<boolean> {
        const url = this.ocapUrlBuilderService.buildUrl(`/api/priorityCodePickRoutes/userPermissions`);
        return this.httpClient.get<boolean>(url ,{
          headers: this.ocapHttpHeadersService.getHeaders()
        });
       }
  }
