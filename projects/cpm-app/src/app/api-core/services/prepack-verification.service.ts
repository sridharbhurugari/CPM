import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { IPrepackVerificationQueueItem } from '../data-contracts/i-prepack-verification-queue-item';
import { IPrepackVerificationQueueDetail } from '../data-contracts/i-prepack-verification-queue-detail';

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

  deletePrepackQueueVerification(queueId: number) {
    var url = this.ocapUrlBuilderService.buildUrl(`/api/PrepackVerification/${queueId}`);
    var headers = this.ocapHttpHeadersService.getHeaders();
    return this.httpClient.delete(url, { headers: headers });
  }

  getDetail(prepackVerificationQueueId: number): Observable<IPrepackVerificationQueueDetail> {
    var encodedPrepackVerificationQueueId = encodeURIComponent(prepackVerificationQueueId);
    var url = this.ocapUrlBuilderService.buildUrl(`/api/VerifyPrepackQueueItem/${ encodedPrepackVerificationQueueId }`);
    const ret =this.httpClient.get<IPrepackVerificationQueueDetail>(url, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
    return ret;
  }

  approve(prepackVerificationQueueDetail: IPrepackVerificationQueueDetail): Observable<boolean> {
    var url = this.ocapUrlBuilderService.buildUrl('/api/VerifyPrepackQueueItem/Approve');
    var headers = this.ocapHttpHeadersService.getHeaders();
    return this.httpClient.post<boolean>(url, prepackVerificationQueueDetail, { headers: headers });      
  }
}
