import { TestBed } from '@angular/core/testing';

import { WorkstationTrackerService } from './workstation-tracker.service';

describe('WorkstationTrackerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkstationTrackerService = TestBed.get(WorkstationTrackerService);
    expect(service).toBeTruthy();
  });
});
