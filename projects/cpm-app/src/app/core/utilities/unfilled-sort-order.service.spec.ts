import { TestBed } from '@angular/core/testing';

import { UnfilledSortOrderService } from './unfilled-sort-order.service';

describe('UnfilledSortOrderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UnfilledSortOrderService = TestBed.get(UnfilledSortOrderService);
    expect(service).toBeTruthy();
  });
});
