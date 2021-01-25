import { TestBed } from '@angular/core/testing';
import { ConfigurationService } from 'oal-core';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { Subject } from 'rxjs';
import { EventConnectionService } from '../../shared/services/event-connection.service';
import { DestockEventConnectionService } from './destock-event-connection.service';

describe('DestockEventConnectionService', () => {
  let eventConnectionService: Partial<EventConnectionService>;

  eventConnectionService = {
    receivedSubject: new Subject()
  }

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: EventConnectionService, useValue: eventConnectionService },
      { provide: ConfigurationService, useValue: { getItem: () => {} } },
      { provide: OcapUrlBuilderService, useValue: { buildUrl: () => {}} },
    ]
  }));

  it('should be created', () => {
    spyOn(eventConnectionService.receivedSubject, 'subscribe');
    const service: DestockEventConnectionService = TestBed.get(DestockEventConnectionService);
    expect(service).toBeTruthy();
    expect(eventConnectionService.receivedSubject.subscribe).toHaveBeenCalled();
  });
});
