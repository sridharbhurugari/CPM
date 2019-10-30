import { TestBed } from '@angular/core/testing';

import { PriorityCodePickRoutesService } from './priority-code-pick-routes.service';

describe('PriorityCodePickRoutesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PriorityCodePickRoutesService = TestBed.get(PriorityCodePickRoutesService);
    expect(service).toBeTruthy();
  });
});
