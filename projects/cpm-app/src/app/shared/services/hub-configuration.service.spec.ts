import { TestBed } from '@angular/core/testing';

import { HubConfigurationService } from './hub-configuration.service';
import { HubConfigurationConstants } from '../constants/hub-configuration-constants';


describe('HubConfigurationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: []
  }));

  it('should be created', () => {
    const service: HubConfigurationService = TestBed.get(HubConfigurationService);
    expect(service).toBeTruthy();
    expect(service.hubName).toEqual(HubConfigurationConstants.hubName);
  });
});
