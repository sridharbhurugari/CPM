import { TestBed } from '@angular/core/testing';

import { EventConnectionService } from '../../shared/services/event-connection.service';
import { ConfigurationService } from 'oal-core';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { CoreEventConnectionService } from './core-event-connection.service';
import { Subject, ReplaySubject } from 'rxjs';

describe('CoreEventConnectionService', () => {
  let eventConnectionService: Partial<EventConnectionService>;

  eventConnectionService = {
    receivedSubject: new Subject(),
    startedSubject: new ReplaySubject(1)
  };

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
    { provide: EventConnectionService, useValue: eventConnectionService },
    { provide: ConfigurationService, useValue: { getItem: () => {} } },
    { provide: OcapUrlBuilderService, useValue: { buildUrl: () => {}} },
  ]
}));

  it('should be created', () => {
    spyOn(eventConnectionService.receivedSubject, 'subscribe');
    spyOn(eventConnectionService.startedSubject, 'subscribe');
    const service: CoreEventConnectionService = TestBed.get(CoreEventConnectionService);
    expect(service).toBeTruthy();
    expect(eventConnectionService.receivedSubject.subscribe).toHaveBeenCalled();
    expect(eventConnectionService.startedSubject.subscribe).toHaveBeenCalled();
  });
});
