import { Injectable } from '@angular/core';
import { OcapHttpClientService } from 'oal-core';
import { IUnderfilledPicklist } from '../data-contracts/i-underfilled-picklist';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnderfilledPicklistsService {

  constructor(private ocapHttpClient: OcapHttpClientService) { }

  public get(): Observable<IUnderfilledPicklist[]>{
    return this.ocapHttpClient.fetch({
      endpoint: '/api/picklists/underfilled'
    });
  }
}
