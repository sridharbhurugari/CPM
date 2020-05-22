import { TestBed } from '@angular/core/testing';

import { HardwareLeaseEventConnectionService } from './hardware-lease-event-connection.service';
import { EventConnectionService } from './event-connection.service';
import { ConfigurationService } from 'oal-core';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { HubConfigurationService } from './hub-configuration.service';
import { Subject } from 'rxjs';


describe('PicklistsQueueEventConnectionService', () => {
  let eventConnectionService: Partial<EventConnectionService>;

  eventConnectionService = {
    receivedSubject: new Subject()
  }

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: EventConnectionService, useValue: {} },
      { provide: ConfigurationService, useValue: { getItem: () => {} } },
      { provide: OcapUrlBuilderService, useValue: { buildUrl: () => {}} },
      { provide: HubConfigurationService, useValue: {} },
      { provide: EventConnectionService, useValue: eventConnectionService}
    ]
  }));

  it('should be created', () => {
    const service: HardwareLeaseEventConnectionService = TestBed.get(HardwareLeaseEventConnectionService);
    expect(service).toBeTruthy();
  });
});
