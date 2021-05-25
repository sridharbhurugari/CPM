import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from "@angular/router";
import * as _ from 'lodash';
 export class BaseRouteReuseStrategy implements RouteReuseStrategy {
  private cache: { [key: string]: DetachedRouteHandle } = {};

  /**
   * Whether the given route should detach for later reuse.

   * */
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    const ret: boolean =  route.data.reuseComponent === true || false;
    return ret;
  }

  /**
   * A no-op; the route is never stored since this strategy never detaches routes for later re-use.
   */
  store(route: ActivatedRouteSnapshot, detachedTree: DetachedRouteHandle): void {
    if (route.data.reuseComponent && detachedTree) {
      this.cache[this.getUrl(route)] = detachedTree;
    }
  }

  /** Returns `false` unless we have a stored value */
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    const ret: boolean =  !!route.routeConfig && !!this.cache[this.getUrl(route)];
    return ret;
  }

  /** Returns the DetachedRouteHandle or null */
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle|null {
    if (!route.routeConfig || route.routeConfig.loadChildren) {
      return null;
    }
    return this.cache[this.getUrl(route)];
  }

  /**
   * Determines if a route should be reused.
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === curr.routeConfig;
  }
  */
  public shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    if (
      future.routeConfig && future.data &&
      future.data.reuseComponent !== undefined
    ) {
      if(future.data.reuseComponent === true && future.data.isBase === true && !this.isSubPath(this.getUrl(future), this.getUrl(curr))){
        this.removeCacheItem(future);
      }

      return future.routeConfig.data.reuseComponent;
    }
    return false;
  }

  removeCacheItem(route: ActivatedRouteSnapshot): void {
    const basePath = this.getUrl(route);
    delete this.cache[basePath];
    const keys = _.filter(_.keys(this.cache),(k) => {return this.isSubPath(basePath, k)});
    _.forEach(keys,(k) => { delete this.cache[k];})
  }

  isSubPath(basePath: string, testPath: string): boolean {
    if(!basePath || !testPath){
      return false;
    }
    let isFromDetailPath: boolean = testPath.startsWith(basePath);
    return isFromDetailPath;
  }

  getUrl(route: ActivatedRouteSnapshot): string {
    if (route.routeConfig) {
      return route.routeConfig.path;
    }
  }
}
