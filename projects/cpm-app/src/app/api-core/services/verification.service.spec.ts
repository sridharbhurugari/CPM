import { TestBed } from '@angular/core/testing';

import { VerificationService } from './verification.service';

describe('VerificationServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VerificationService = TestBed.get(VerificationService);
    expect(service).toBeTruthy();
  });
});
