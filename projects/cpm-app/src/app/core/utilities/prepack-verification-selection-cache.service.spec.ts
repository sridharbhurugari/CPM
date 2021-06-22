import { TestBed } from '@angular/core/testing';

import { PrepackVerificationSelectionCacheService } from './prepack-verification-selection-cache.service';

describe('PrepackVerificationSelectionCacheService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrepackVerificationSelectionCacheService = TestBed.get(PrepackVerificationSelectionCacheService);
    expect(service).toBeTruthy();
  });
});
