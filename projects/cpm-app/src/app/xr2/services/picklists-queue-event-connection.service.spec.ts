import { TestBed } from '@angular/core/testing';

import { PicklistsQueueEventConnectionService } from './picklists-queue-event-connection.service';
import { EventConnectionService } from './event-connection.service';
import { ConfigurationService } from 'oal-core';

describe('PicklistsQueueEventConnectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: EventConnectionService, useValue: {} },
      { provide: ConfigurationService, useValue: {} },
    ]
  }));

  it('should be created', () => {
    const service: PicklistsQueueEventConnectionService = TestBed.get(PicklistsQueueEventConnectionService);
    expect(service).toBeTruthy();
  });
});
