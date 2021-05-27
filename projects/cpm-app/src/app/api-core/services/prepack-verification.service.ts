import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { IPrepackVerificationQueueItem } from '../data-contracts/i-prepack-verification-queue-item';

@Injectable({
  providedIn: 'root'
})
export class PrepackVerificationService {

  constructor(
    private httpClient: HttpClient,
    private ocapUrlBuilderService: OcapUrlBuilderService,
    private ocapHttpHeadersService: OcapHttpHeadersService
  ) { }

  getPrepackQueueData(): Observable<IPrepackVerificationQueueItem[]> {
    const url = this.ocapUrlBuilderService.buildUrl('/api/PrepackVerification');
    return this.httpClient.get<IPrepackVerificationQueueItem[]>(url, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }    
}
