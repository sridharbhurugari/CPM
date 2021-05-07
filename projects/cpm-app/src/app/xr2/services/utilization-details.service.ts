import { Injectable } from '@angular/core';
import { IErroredMedicationInfoDetail } from '../../api-xr2/data-contracts/i-utilization-errored-medication-info-detail';
import { IExpiringMedicationInfoDetail } from '../../api-xr2/data-contracts/i-utilization-expiring-medication-info-detail';
import { IExpiredMedicationInfoDetail } from '../../api-xr2/data-contracts/i-utilization-expired-medication-info-detail';
import { Observable } from 'rxjs';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { HttpClient } from '@angular/common/http';
import { IUnassignedMedicationInfoDetail } from '../../api-xr2/data-contracts/i-utilization-unassigned-medication-info-detail';

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

  public expiringThisMonth(deviceId: number): Observable<IExpiringMedicationInfoDetail[]>{
    var encodedDeviceId = encodeURIComponent(deviceId);
    var url = this.ocapUrlBuilderService.buildUrl(`/api/PocketUtilization/ExpiringMedDetails?deviceId=${encodedDeviceId}`);
    return this.httpClient.get<IExpiringMedicationInfoDetail[]>(url, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }

  public expired(deviceId: number): Observable<IExpiredMedicationInfoDetail[]>{
    var encodedDeviceId = encodeURIComponent(deviceId);
    var url = this.ocapUrlBuilderService.buildUrl(`/api/PocketUtilization/ExpiredMedDetails?deviceId=${encodedDeviceId}`);
    return this.httpClient.get<IExpiredMedicationInfoDetail[]>(url, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }			

  public notAssigned(deviceId: number): Observable<IUnassignedMedicationInfoDetail[]>{
      var encodedDeviceId = encodeURIComponent(deviceId);
      var url = this.ocapUrlBuilderService.buildUrl(`/api/PocketUtilization/UnassignedMedDetails?deviceId=${encodedDeviceId}`);
      return this.httpClient.get<IUnassignedMedicationInfoDetail[]>(url, {
        headers: this.ocapHttpHeadersService.getHeaders()
      });
  }

}
