import { TestBed } from '@angular/core/testing';

import { PickingEventConnectionService } from './picking-event-connection.service';

describe('PickingEventConnectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PickingEventConnectionService = TestBed.get(PickingEventConnectionService);
    expect(service).toBeTruthy();
  });
});
