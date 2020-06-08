import { TestBed } from '@angular/core/testing';

import { EventConnectionService } from './event-connection.service';
import { OalCoreModule, OcapHttpClientService } from 'oal-core';
import { ConfigurationService } from 'oal-core';
import { environment } from '../../../environments/environment';
import { OcapUrlBuilderService } from './ocap-url-builder.service';
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

  it('should subscribe to events', () => {
    let service: EventConnectionService;
    const subscriptionSpy = spyOn(EventConnectionService.prototype, 'SubscribeToConnectionEvents').and.callThrough();
    service = TestBed.get(EventConnectionService);

    const startSpy = spyOn(service, 'start').and.returnValue(Promise.resolve());

    expect(service).toBeTruthy();
    expect(subscriptionSpy).toHaveBeenCalled();
  });

  it('should correctly report isConnected', () => {
    let service: EventConnectionService;
    const subscriptionSpy = spyOn(EventConnectionService.prototype, 'SubscribeToConnectionEvents').and.callThrough();
    service = TestBed.get(EventConnectionService);

    const startSpy = spyOn(service, 'start').and.returnValue(Promise.resolve());

    expect(service).toBeTruthy();
    expect(subscriptionSpy).toHaveBeenCalled();

    service.startUp();

    expect(startSpy).toHaveBeenCalledTimes(1);

    service.connectionStartedSubject.next();
    let isConnected = service.isConnected;

    expect(isConnected).toBeTruthy();

    service.startUp();

    expect(startSpy).toHaveBeenCalledTimes(1);

    service.disconnectedSubject.next();
    isConnected = service.isConnected;
    expect(isConnected).toBeFalsy();

  });
});
