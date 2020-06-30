import { TestBed } from '@angular/core/testing';

import { CpColorService } from './cp-color.service';

describe('CpColorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CpColorService = TestBed.get(CpColorService);
    expect(service).toBeTruthy();
  });
});
