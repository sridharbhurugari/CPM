import { TestBed } from '@angular/core/testing';
import { UserPermissionsService } from '../../api-core/services/user-permissions.service';

import { UserPermissionsCacheService } from './user-permissions-cache.service';

describe('UserPermissionsCacheService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: UserPermissionsService, useValue: { } }
    ]
  }));

  it('should be created', () => {
    const service: UserPermissionsCacheService = TestBed.get(UserPermissionsCacheService);
    expect(service).toBeTruthy();
  });
});
