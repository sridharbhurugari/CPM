import { TestBed } from '@angular/core/testing';

import { EventConnectionService } from './event-connection.service';

describe('EventConnectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventConnectionService = TestBed.get(EventConnectionService);
    expect(service).toBeTruthy();
  });
});
