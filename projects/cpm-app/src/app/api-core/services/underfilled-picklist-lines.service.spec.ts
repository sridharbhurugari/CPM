import { TestBed } from '@angular/core/testing';

import { UnderfilledPicklistLinesService } from './underfilled-picklist-lines.service';
import { OcapHttpClientService } from 'oal-core';

describe('UnderfilledPicklistLinesService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {provide: OcapHttpClientService, UserClass: { fetch: () => {}}}
    ]
  }));

  it('should be created', () => {
    const service: UnderfilledPicklistLinesService = TestBed.get(UnderfilledPicklistLinesService);
    expect(service).toBeTruthy();
  });
});
