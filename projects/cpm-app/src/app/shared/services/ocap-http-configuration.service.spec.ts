import { TestBed } from '@angular/core/testing';

import { OcapHttpConfigurationService } from './ocap-http-configuration.service';

describe('OcapHttpConfigurationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OcapHttpConfigurationService = TestBed.get(OcapHttpConfigurationService);
    expect(service).toBeTruthy();
  });
});
