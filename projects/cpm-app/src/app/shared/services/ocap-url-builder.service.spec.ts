import { TestBed } from '@angular/core/testing';

import { OcapUrlBuilderService } from './ocap-url-builder.service';
import { OcapHttpConfigurationService } from './ocap-http-configuration.service';
import { IOcapHttpConfiguration } from '../interfaces/i-ocap-http-configuration';

describe('OcapUrlBuilderService', () => {
  var ocapConfig: IOcapHttpConfiguration;
  var service: OcapUrlBuilderService;
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
    service = TestBed.get(OcapUrlBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should use config values to build url', () => {
    const fragment = '/resource/subresource';
    var result = service.buildUrl(fragment);
    expect(result).toEqual(`https://${ocapConfig.ocapServerIP}:${ocapConfig.port}${fragment}`);
  })
});
