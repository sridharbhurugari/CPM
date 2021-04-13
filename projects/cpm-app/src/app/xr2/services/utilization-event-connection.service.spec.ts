import { TestBed } from '@angular/core/testing';
import { ConfigurationService } from 'oal-core';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { Subject } from 'rxjs';
import { EventConnectionService } from '../../shared/services/event-connection.service';
import { UtilizationEventConnectionService } from './utilization-event-connection.service';

describe('UtilizationEventConnectionService', () => {
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
    const service: UtilizationEventConnectionService = TestBed.get(UtilizationEventConnectionService);
    expect(service).toBeTruthy();
    expect(eventConnectionService.receivedSubject.subscribe).toHaveBeenCalled();
  });
});
