import { TestBed } from '@angular/core/testing';

import { HardwareLeaseEventConnectionService } from './hardware-lease-event-connection.service';
import { ConfigurationService } from 'oal-core';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { Subject } from 'rxjs';
import { EventConnectionService } from '../../shared/services/event-connection.service';


describe('PicklistsQueueEventConnectionService', () => {
  let eventConnectionService: Partial<EventConnectionService>;

  eventConnectionService = {
    receivedSubject: new Subject()
  }

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: ConfigurationService, useValue: { getItem: () => {} } },
      { provide: OcapUrlBuilderService, useValue: { buildUrl: () => {}} },
      { provide: EventConnectionService, useValue: eventConnectionService}
    ]
  }));

  it('should be created', () => {
    spyOn(eventConnectionService.receivedSubject, 'subscribe');
    const service: HardwareLeaseEventConnectionService = TestBed.get(HardwareLeaseEventConnectionService);
    expect(service).toBeTruthy();
    expect(eventConnectionService.receivedSubject.subscribe).toHaveBeenCalled();
  });
});
