import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { UserPermissionsService } from '../../api-core/services/user-permissions.service';

import { UserPermissionsCacheService } from './user-permissions-cache.service';

describe('UserPermissionsCacheService', () => {
  let userPermissionsService: UserPermissionsService;
  let service: UserPermissionsCacheService;

  beforeEach(() => {
    let ups = {
      get: jasmine.createSpy('get').and.returnValue(of([]))
    }
    TestBed.configureTestingModule({
      providers: [
        { provide: UserPermissionsService, useValue: ups }
      ]
    })
    service = TestBed.get(UserPermissionsCacheService);
    userPermissionsService = TestBed.get(UserPermissionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('given no permissions have been requested', () => {
    describe('when getting userPermissions$', () => {
      it('should request user permissions', (done) => {
        service.userPermissions$.subscribe(x => {
          expect(userPermissionsService.get).toHaveBeenCalled();
          done();
        });
      });

      describe('and getting it again', () => {
        it('should not request user permissions again', (done) => {
          service.userPermissions$.subscribe(x => {
            service.userPermissions$.subscribe(x => {
              expect(userPermissionsService.get).toHaveBeenCalledTimes(1);
              done();
            });
          });
        });
      });
    });
  });

  describe('canOverrideBarcode', () => {
    it('should return true given permissions include Override', (done) => {
      userPermissionsService.get = jasmine.createSpy('get').and.returnValue(of([ 'Override' ]));
      service.canOverrideBarcode().subscribe(x => {
        expect(x).toBeTruthy();
        done();
      });
    });
  });
});
