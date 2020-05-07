import { TestBed } from '@angular/core/testing';

import { ItemManagementService } from './item-management.service';

describe('ItemManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItemManagementService = TestBed.get(ItemManagementService);
    expect(service).toBeTruthy();
  });
});
