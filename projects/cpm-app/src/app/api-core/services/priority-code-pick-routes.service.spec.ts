import { TestBed } from '@angular/core/testing';

import { PriorityCodePickRoutesService } from './priority-code-pick-routes.service';
import { of } from 'rxjs';
import { OcapHttpClientService } from 'oal-core';

describe('PriorityCodePickRoutesService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: OcapHttpClientService, useValue: { get: () => of([]) }}
    ]
  }));

  it('should be created', () => {
    const service: PriorityCodePickRoutesService = TestBed.get(PriorityCodePickRoutesService);
    expect(service).toBeTruthy();
  });
});
