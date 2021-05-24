import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from "@angular/router";

 export class BaseRouteReuseStrategy implements RouteReuseStrategy {
  private cache: { [key: string]: DetachedRouteHandle } = {};

  /**
   * Whether the given route should detach for later reuse.
   * Always returns false for `BaseRouteReuseStrategy`.
   * */
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return route.routeConfig.data && route.routeConfig.data.reuseComponent;
  }

  /**
   * A no-op; the route is never stored since this strategy never detaches routes for later re-use.
   */
  store(route: ActivatedRouteSnapshot, detachedTree: DetachedRouteHandle): void {
    if (detachedTree) {
      this.cache[this.getUrl(route)] = detachedTree;
    }
  }

  /** Returns `false`, meaning the route (and its subtree) is never reattached */
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    const ret: boolean =  !!this.cache[this.getUrl(route)];
    return ret;
  }

  /** Returns `null` because this strategy does not store routes for later re-use. */
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle|null {
    if (!route.routeConfig || route.routeConfig.loadChildren) {
      return null;
    }
    return this.cache[this.getUrl(route)];
  }

  /**
   * Determines if a route should be reused.
   * This strategy returns `true` when the future route config and current route config are
   * identical.
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === curr.routeConfig;
  }
  */
  public shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    if (
      future.routeConfig &&
      future.routeConfig.data &&
      future.routeConfig.data.reuseComponent !== undefined
    ) {
      return future.routeConfig.data.reuseComponent;
    }
    return future.routeConfig === curr.routeConfig;
  }

  getUrl(route: ActivatedRouteSnapshot): string {
    if (route.routeConfig) {
      return route.routeConfig.path;
    }
  }
}
