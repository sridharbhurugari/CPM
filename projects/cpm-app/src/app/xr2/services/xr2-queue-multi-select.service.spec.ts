import { TestBed } from '@angular/core/testing';

import { Xr2QueueMultiSelectService } from './xr2-queue-multi-select.service';

describe('Xr2QueueMultiSelectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Xr2QueueMultiSelectService = TestBed.get(Xr2QueueMultiSelectService);
    expect(service).toBeTruthy();
  });
});
