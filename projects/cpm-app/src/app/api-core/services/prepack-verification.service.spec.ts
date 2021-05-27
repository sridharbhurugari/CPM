import { TestBed } from '@angular/core/testing';

import { PrepackVerificationService } from './prepack-verification.service';

describe('PrepackVerificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrepackVerificationService = TestBed.get(PrepackVerificationService);
    expect(service).toBeTruthy();
  });
});
