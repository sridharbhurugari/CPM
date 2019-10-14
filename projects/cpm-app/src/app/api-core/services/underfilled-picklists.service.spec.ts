import { TestBed } from '@angular/core/testing';

import { UnderfilledPicklistsService } from './underfilled-picklists.service';

describe('UnderfilledPicklistsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UnderfilledPicklistsService = TestBed.get(UnderfilledPicklistsService);
    expect(service).toBeTruthy();
  });
});
