import { TestBed } from '@angular/core/testing';

import { OcapHttpHeadersService } from './ocap-http-headers.service';

describe('OcapHttpHeadersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OcapHttpHeadersService = TestBed.get(OcapHttpHeadersService);
    expect(service).toBeTruthy();
  });
});
