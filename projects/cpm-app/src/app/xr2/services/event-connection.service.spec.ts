import { TestBed } from '@angular/core/testing';

import { EventConnectionService } from './event-connection.service';
import { OalCoreModule, OcapHttpClientService } from 'oal-core';
import { ConfigurationService } from 'oal-core';
import { environment } from './../../../environments/environment';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { HubConfigurationService } from './hub-configuration.service';



describe('EventConnectionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
          OalCoreModule.forRoot({
            environment,
            httpClientService: OcapHttpClientService,
            configEndpointKey: 'configEndpoint'
          }),
        ],
        providers: [
          { provide: OcapUrlBuilderService, useValue: { buildUrl: () => {}} },
          { provide: ConfigurationService, useValue: { getItem: () => {} } },
          { provide: HubConfigurationService, useValue: {} },
        ]
    });
});

  it('should be created', () => {
    const service: EventConnectionService = TestBed.get(EventConnectionService);
    expect(service).toBeTruthy();
  });
});
