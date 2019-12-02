import { TestBed } from '@angular/core/testing';

import { PicklistsQueueService } from './picklists-queue.service';

describe('PicklistsQueueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PicklistsQueueService = TestBed.get(PicklistsQueueService);
    expect(service).toBeTruthy();
  });
});
