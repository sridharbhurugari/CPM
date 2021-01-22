import { Injectable } from '@angular/core';
import { WorkstationTrackerData } from '../data-contracts/workstation-tracker-data';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { IWorkstationNameData } from '../data-contracts/i-workstation-name-data';

@Injectable({
  providedIn: 'root'
})
export class WorkstationTrackerService {

  constructor(private httpClient: HttpClient,
    private ocapUrlBuilderService: OcapUrlBuilderService,
    private ocapHttpHeadersService: OcapHttpHeadersService
    ) { }

    public GetWorkstationShortNames(workstationTrackerData: WorkstationTrackerData): Observable<string[]> {
      var url = this.ocapUrlBuilderService.buildUrl('/api/WorkstationTracker/GetWorkstationShortNames');
      var headers = this.ocapHttpHeadersService.getHeaders();
      return this.httpClient.post<string[]>(url, workstationTrackerData, {
        headers: this.ocapHttpHeadersService.getHeaders()
      });
    }

    public GetWorkstationNames(workstationTrackerData: WorkstationTrackerData): Observable<IWorkstationNameData[]> {
      var url = this.ocapUrlBuilderService.buildUrl('/api/WorkstationTracker/GetWorkstationNames');
      return this.httpClient.post<IWorkstationNameData[]>(url, workstationTrackerData, {
        headers: this.ocapHttpHeadersService.getHeaders()
      });
    }

    public GetAllWorkstationTrackerData(): Observable<string[]> {
      var url = this.ocapUrlBuilderService.buildUrl('/api/WorkstationTracker/GetAllWorkstationTrackerData');
      return this.httpClient.post<string[]>(url, {}, {
        headers: this.ocapHttpHeadersService.getHeaders()
      });
    }

    public Track(workstationTrackerData: WorkstationTrackerData): Observable<string[]> {
      var url = this.ocapUrlBuilderService.buildUrl('/api/WorkstationTracker/Track');
      return this.httpClient.post<string[]>(url, workstationTrackerData, {
        headers: this.ocapHttpHeadersService.getHeaders()
      });
    }

    public UnTrack(workstationTrackerData: WorkstationTrackerData): Observable<string[]>{
      var url = this.ocapUrlBuilderService.buildUrl('/api/WorkstationTracker/UnTrack');
      return this.httpClient.post<string[]>(url, workstationTrackerData, {
        headers: this.ocapHttpHeadersService.getHeaders()
      });
    }

    public GetWorkstationShortName(): Observable<string>{
      var url = this.ocapUrlBuilderService.buildUrl('/api/WorkstationTracker/GetWorkstationShortName');
      return this.httpClient.get<string>(url, {
        headers: this.ocapHttpHeadersService.getHeaders()
      });
    }
}
