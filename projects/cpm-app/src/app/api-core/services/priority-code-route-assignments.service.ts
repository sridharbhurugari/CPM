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
  }

