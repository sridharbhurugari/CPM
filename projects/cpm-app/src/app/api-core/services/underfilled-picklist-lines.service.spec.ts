import { TestBed } from '@angular/core/testing';

import { UnderfilledPicklistLinesService } from './underfilled-picklist-lines.service';

describe('UnderfilledPicklistLinesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UnderfilledPicklistLinesService = TestBed.get(UnderfilledPicklistLinesService);
    expect(service).toBeTruthy();
  });
});
