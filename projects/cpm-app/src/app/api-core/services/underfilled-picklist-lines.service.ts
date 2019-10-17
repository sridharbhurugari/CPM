import { Injectable } from '@angular/core';
import { OcapHttpClientService } from 'oal-core';
import { IUnderfilledPicklistLine } from '../data-contracts/i-underfilled-picklist-line';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnderfilledPicklistLinesService {

  constructor(private ocapHttpClient: OcapHttpClientService) { }

  public get(orderId: string): Observable<IUnderfilledPicklistLine[]>{
    return this.ocapHttpClient.fetch<IUnderfilledPicklistLine[]>({
      endpoint: `/api/picklists/underfilled/picklistLines?orderId=${orderId}`
    });
  }
}
