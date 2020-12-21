import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UserPermissionsService } from '../../api-core/services/user-permissions.service';

@Injectable({
  providedIn: 'root'
})
export class UserPermissionsCacheService {
  private _userPermissions$: Observable<string[]>;

  get userPermissions$(): Observable<string[]> {
    if (!this._userPermissions$) {
      this._userPermissions$ = this.userPermissionsService.get().pipe(shareReplay(1));
    }

    return this._userPermissions$;
  }

  constructor(
    private userPermissionsService: UserPermissionsService,
  ) {
  }

  canOverrideBarcode(): Observable<boolean> {
    return this.userPermissions$.pipe(map(x => x.find(p => p == "Override") != null));
  }
}
