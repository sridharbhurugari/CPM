import { Injectable } from "@angular/core";
import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from "@angular/router";
import * as _ from 'lodash';
@Injectable({providedIn: 'root'})
export class BaseRouteReuseStrategy implements RouteReuseStrategy {
  /* This is the local cache- it is kept as small as possible */
  private cache: { [key: string]: DetachedRouteHandle } = {};

  /* Whether the route should be stored / detached for later reuse */
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    const ret: boolean =  route.data.reuseComponent === true || false;
    return ret;
  }

  /* Save the route we detached for later use */
  store(route: ActivatedRouteSnapshot, detachedTree: DetachedRouteHandle): void {
    if (route.data.reuseComponent && detachedTree) {
      this.cache[this.getUrl(route)] = detachedTree;
    }
  }

  /* Returns `false` unless we have a stored value */
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    const ret: boolean =  !!route.routeConfig && !!this.cache[this.getUrl(route)];
    return ret;
  }

  /* Returns the DetachedRouteHandle if the path exists (else null) */
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle|null {
    if (!route.routeConfig || route.routeConfig.loadChildren) {
      return null;
    }
    return this.cache[this.getUrl(route)];
  }

  /*
  Determines if a route should be reused.
  Note: usint default behavior (future.routeConfig === curr.routeConfig;) introduces problems
  */
  public shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    const ret: boolean =  curr.data.reuseComponent === true || false;
    return ret;
  }

 /* remove stored cache with the basePath and optionally any subPath entries  */

  removeCacheItem(basePath:string, cascadeDelete: boolean): void {
    delete this.cache[basePath];
    if(cascadeDelete === true) {
     const keys = _.filter(_.keys(this.cache),(k) => {return this.isSubPath(basePath, k)});
     _.forEach(keys,(k) => { delete this.cache[k];})
    }
  }

  /* is the testPath under/child of the basePath? */

  isSubPath(basePath: string, testPath: string): boolean {
    if(!basePath || !testPath){
      return false;
    }
    let isFromDetailPath: boolean = testPath.startsWith(basePath);
    return isFromDetailPath;
  }

  /* return the route path that will be stored as the key lookup in the cache */

  getUrl(route: ActivatedRouteSnapshot): string {
    if (route.routeConfig) {
      return route.routeConfig.path;
    }
  }
}
