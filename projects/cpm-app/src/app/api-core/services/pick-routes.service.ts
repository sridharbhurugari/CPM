import { Injectable } from '@angular/core';
import { IPickRouteDetail } from '../data-contracts/i-pickroute-detail';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { IDeviceSequenceOrder } from '../data-contracts/i-device-sequenceorder';

@Injectable({
  providedIn: 'root'
})
export class PickRoutesService {

  constructor(
    private httpClient: HttpClient,
    private ocapUrlBuilderService: OcapUrlBuilderService,
    private ocapHttpHeadersService: OcapHttpHeadersService
  ) { }

  get(pickRouteId: string): Observable<IPickRouteDetail> {
    var url = this.ocapUrlBuilderService.buildUrl(`/api/pickRoutes/${pickRouteId}`);
    var headers = this.ocapHttpHeadersService.getHeaders();
    return this.httpClient.get<IPickRouteDetail>(url, {
      headers: headers
    });
  }

  save(pickRouteGuid: string, pickRouteDescription: string, deviceSequence: IDeviceSequenceOrder[]) {
    var deviceSequenceDataContracts = deviceSequence.map(x => {
      return { DeviceId: x.DeviceId, Sequence: x.SequenceOrder };
    });
    var body = {
      PickRouteGuid: pickRouteGuid,
      Description: pickRouteDescription,
      DeviceSequence: deviceSequenceDataContracts
    };
    var url = this.ocapUrlBuilderService.buildUrl(`/api/pickRoutes`);
    var headers = this.ocapHttpHeadersService.getHeaders();
    return this.httpClient.put(url, body, { headers: headers });
  }

  saveAs(pickRouteDescription: string, deviceSequence: IDeviceSequenceOrder[]) {
    var deviceSequenceDataContracts = deviceSequence.map(x => {
      return { DeviceId: x.DeviceId, Sequence: x.SequenceOrder };
    });
    var body = {
      Description:  pickRouteDescription,
      DeviceSequence: deviceSequenceDataContracts
    };
    var url = this.ocapUrlBuilderService.buildUrl(`/api/pickRoutes`);
    var headers = this.ocapHttpHeadersService.getHeaders();
    return this.httpClient.post(url, body, { headers: headers });
  }

  delete(pickRouteGuid: string) {
    var url = this.ocapUrlBuilderService.buildUrl(`/api/pickRoutes/${pickRouteGuid}`);
    var headers = this.ocapHttpHeadersService.getHeaders();
    return this.httpClient.delete(url, { headers: headers });
  }
}
