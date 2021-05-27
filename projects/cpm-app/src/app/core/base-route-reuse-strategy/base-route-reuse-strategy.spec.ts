import { ActivatedRouteSnapshot, DetachedRouteHandle, RouterStateSnapshot } from "@angular/router";
import { BaseRouteReuseStrategy } from "./base-route-reuse-strategy";

describe('BaseRouteReuseStrategy', () => {
  let component: BaseRouteReuseStrategy = new BaseRouteReuseStrategy();
  const mock = <T, P extends keyof T>(obj: Pick<T, P>): T => obj as T;

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('add and retrieve cache', () => {
    const route =  { path: 'myTest', redirectTo: 'nowhere', pathMatch: 'full'}
    const aRoute = mock<ActivatedRouteSnapshot, 'routeConfig'>({
      routeConfig: route
  });

  });
});
