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
    const url = this.ocapUrlBuilderService.buildUrl(`/api/pickRoutes/${pickRouteId}`);
    const serviceHeaders = this.ocapHttpHeadersService.getHeaders();
    return this.httpClient.get<IPickRouteDetail>(url, {
      headers: serviceHeaders
    });
  }

  save(pickRouteGuid: string, pickRouteDescription: string, deviceSequence: IDeviceSequenceOrder[]) {
    const deviceSequenceDataContracts = deviceSequence.map(x => {
      return { DeviceId: x.DeviceId, Sequence: x.SequenceOrder, DeviceOutput: x.DeviceOutput };
    });
    const body = {
      PickRouteGuid: pickRouteGuid,
      Description: pickRouteDescription,
      DeviceSequence: deviceSequenceDataContracts
    };
    const url = this.ocapUrlBuilderService.buildUrl(`/api/pickRoutes`);
    const serviceHeaders = this.ocapHttpHeadersService.getHeaders();
    return this.httpClient.put(url, body, { headers: serviceHeaders });
  }

  saveAs(pickRouteDescription: string, deviceSequence: IDeviceSequenceOrder[]) {
    const deviceSequenceDataContracts = deviceSequence.map(x => {
      return { DeviceId: x.DeviceId, Sequence: x.SequenceOrder, DeviceOutput: x.DeviceOutput };
    });
    const body = {
      Description:  pickRouteDescription,
      DeviceSequence: deviceSequenceDataContracts
    };
    const url = this.ocapUrlBuilderService.buildUrl(`/api/pickRoutes`);
    const serviceHeaders = this.ocapHttpHeadersService.getHeaders();
    return this.httpClient.post(url, body, { headers: serviceHeaders });
  }

  delete(pickRouteGuid: string) {
    var url = this.ocapUrlBuilderService.buildUrl(`/api/pickRoutes/${pickRouteGuid}`);
    var headers = this.ocapHttpHeadersService.getHeaders();
    return this.httpClient.delete(url, { headers: headers });
  }

  reset(picklistLineIds: string) {
    const url = this.ocapUrlBuilderService.buildUrl(`api/pickRoutes/Reset`);
    const serviceHeaders = this.ocapHttpHeadersService.getHeaders();
    const data = {
      PicklistLineIds: picklistLineIds
    };
    return this.httpClient.post(url, data, { headers: serviceHeaders });
  }

}
