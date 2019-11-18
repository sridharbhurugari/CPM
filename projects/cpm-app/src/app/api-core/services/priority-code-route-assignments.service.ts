import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { HttpClient } from '@angular/common/http';
import { IPickRouteDevices } from '../data-contracts/i-pickroute-devices';
import { IDeviceSequenceOrder } from '../data-contracts/i-device-sequenceorder';

@Injectable({
  providedIn: 'root'
})
export class PriorityCodeRouteAssignmentsService {

  constructor(
    private httpClient: HttpClient,
    private ocapUrlBuilderService: OcapUrlBuilderService,
    private ocapHttpHeadersService: OcapHttpHeadersService
  ) { }

    getRoutes(): Observable<IPickRouteDevices[]> {
      const url = this.ocapUrlBuilderService.buildUrl('/api/PickRoutes');

      return this.httpClient.get<IPickRouteDevices[]>(url, {
        headers: this.ocapHttpHeadersService.getHeaders()
      });
  /*

      let device1: IDeviceSequenceOrder;
      device1 = new IDeviceSequenceOrder({
       SequenceOrder: 1,
       DeviceId: '12',
       DeviceDescription: 'my Device'
     });

      var pickRoute: IPickRouteDevices[];
      pickRoute = [
        new IPickRouteDevices({PickRouteId: 123, RouteDescription: 'hi', PickRouteDevices: [device1]})
];
      return of(pickRoute);
      */
    }
}
