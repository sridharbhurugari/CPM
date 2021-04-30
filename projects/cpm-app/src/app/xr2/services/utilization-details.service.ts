import { Injectable } from '@angular/core';
import { IErroredMedicationInfoDetail } from '../../api-xr2/data-contracts/i-utilization-errored-medication-info-detail';
import { Observable } from 'rxjs';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilizationDeailsService {

  constructor(private httpClient: HttpClient,
    private ocapUrlBuilderService: OcapUrlBuilderService,
    private ocapHttpHeadersService: OcapHttpHeadersService) { }

  public pocketsWithErrors(deviceId: number): Observable<IErroredMedicationInfoDetail[]>{
    var encodedDeviceId = encodeURIComponent(deviceId);
    var url = this.ocapUrlBuilderService.buildUrl(`/api/PocketUtilization/ErroredMedDetails?deviceId=${encodedDeviceId}`);
    return this.httpClient.get<IErroredMedicationInfoDetail[]>(url, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }
}
