import { TestBed } from '@angular/core/testing';

import { PickRoutesService } from './pick-routes.service';

describe('PickRoutesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PickRoutesService = TestBed.get(PickRoutesService);
    expect(service).toBeTruthy();
  });
});
