import { TestBed } from '@angular/core/testing';

import { OcapHttpHeadersService } from './ocap-http-headers.service';
import { IOcapHttpConfiguration } from '../interfaces/i-ocap-http-configuration';
import { OcapHttpConfigurationService } from './ocap-http-configuration.service';
import { OcapConfigurationConstants } from '../constants/ocap-configuration-constants';

describe('OcapHttpHeadersService', () => {
  var ocapConfig: IOcapHttpConfiguration;
  var service: OcapHttpHeadersService;
  beforeEach(() => {
    ocapConfig = {
      apiKey: '39252',
      clientId: '32903512',
      machineName: 'machine329',
      ocapServerIP: '127.0.0.1',
      port: '3928',
      useSecured: 'true',
      userLocale: 'en-US'
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: OcapHttpConfigurationService, useValue: { get: () => ocapConfig } }
      ]
    })
    service = TestBed.get(OcapHttpHeadersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set api key header from ocap config', () => {
    var result = service.getHeaders();
    expect(result.get(OcapConfigurationConstants.apiKeyHeader)).toEqual(ocapConfig.apiKey)
  });

  it('should set machine name header from ocap config', () => {
    var result = service.getHeaders();
    expect(result.get(OcapConfigurationConstants.machineNameHeader)).toEqual(ocapConfig.machineName)
  });

  it('should set client id header from ocap config', () => {
    var result = service.getHeaders();
    expect(result.get(OcapConfigurationConstants.clientIdHeader)).toEqual(ocapConfig.clientId)
  });
});
