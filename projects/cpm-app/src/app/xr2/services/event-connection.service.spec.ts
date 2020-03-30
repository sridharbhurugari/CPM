import { TestBed } from '@angular/core/testing';

import { EventConnectionService } from './event-connection.service';
import { OalCoreModule, OcapHttpClientService } from 'oal-core';
import { ConfigurationService } from 'oal-core';
import { environment } from './../../../environments/environment';

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
          { provide: ConfigurationService, useValue: { getItem: () => {} } },
        ]
    });
});

describe('EventConnectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventConnectionService = TestBed.get(EventConnectionService);
    expect(service).toBeTruthy();
  });
});
