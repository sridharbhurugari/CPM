import { TestBed } from '@angular/core/testing';

import { GuidedManualCycleCountServiceService } from './guided-manual-cycle-count-service.service';

describe('GuidedManualCycleCountServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GuidedManualCycleCountServiceService = TestBed.get(GuidedManualCycleCountServiceService);
    expect(service).toBeTruthy();
  });
});
