import { TestBed } from '@angular/core/testing';

import { UnderfilledPicklistsService } from './underfilled-picklists.service';
import { OcapHttpClientService } from 'oal-core';

describe('UnderfilledPicklistsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {provide: OcapHttpClientService, UserClass: { fetch: () => {}}}
    ]
  }));

  it('should be created', () => {
    const service: UnderfilledPicklistsService = TestBed.get(UnderfilledPicklistsService);
    expect(service).toBeTruthy();
  });
});
