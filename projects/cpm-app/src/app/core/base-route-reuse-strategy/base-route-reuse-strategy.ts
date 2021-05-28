import { Injectable, Injector } from "@angular/core";
import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle, Router, Route } from "@angular/router";
import * as _ from 'lodash';
@Injectable({providedIn: 'root'})
export class BaseRouteReuseStrategy implements RouteReuseStrategy {
  /* This is the local cache- it is kept as small as possible */
  private cache: { [key: string]: DetachedRouteHandle } = {};
  private get _router() { return this._injector.get(Router); }
  public baseUrls: { [key: string]: any };

  constructor(
    private _injector: Injector
  ) {}

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
  Note2: the ActivatedRouteSnapshot is missing the data component, so we need to look up what was set up in the route, and why this always returns false
  */
  public shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    this.setUrlLists();
     const f = this._router.getCurrentNavigation().finalUrl.toString();
    const c = this._router.getCurrentNavigation().initialUrl.toString();
    const baseCurr = this.myFirstBasePath(c);
    const baseFuture = this.myFirstBasePath(f);

    if ((baseCurr || baseFuture) && !(baseCurr === baseFuture))
    {
      this.removeCacheItem(baseCurr, true)
      this.removeCacheItem(baseFuture, true)
    }
     return false;
  }

  /* return the route path that will be stored as the key lookup in the cache */

  getUrl(route: ActivatedRouteSnapshot): string {
    if (route.routeConfig) {
      return route.routeConfig.path;
    }
  }

 /* remove stored cache with the basePath and optionally any subPath entries  */

  removeCacheItem(basePath:string, cascadeDelete: boolean): void {
    delete this.cache[basePath];
    if(cascadeDelete === true) {
     const keys = _.filter(_.keys(this.cache),(k) => {return this.isSubPath(basePath, k)});
     _.forEach(keys,(k) => { delete this.cache[k];})
    }
  }

  myFirstBasePath(testPath: string): string {
    let firstHit: string;
    _.forEach(_.keys(this.baseUrls), b => {
      if(this.isSubPath(b,testPath))
      {firstHit = this.baseUrls[b];
        return b;}
    });

    return firstHit;
  }
  /* is the testPath under/child of the basePath? */

  isSubPath(basePath: string, testPath: string): boolean {
    if(!basePath || !testPath){
      return false;
    }
    let isFromDetailPath: boolean = testPath.startsWith(basePath);
    return isFromDetailPath;
  }

  setUrls() {
    this._router.config.forEach(route => {
      this.setRouteUrls(route);
    });
  }
  setRouteUrls(route: Route, parent: string = '') {
    if (route.redirectTo) {
      return;
    }
    if (route.children) {
      route.children.forEach(i => {
        this.setRouteUrls(i, parent + route.path);
      });
    }
    else if (route.loadChildren) {
      (<any>this._router).configLoader.load(this._injector, route).subscribe(i => {
        i.routes.forEach(j => {
          this.setRouteUrls(j, parent + route.path)
        });
      });
    }
    else if (route.path != null) {
      if(route.data && route.data.isBase === true)
       {
        this.baseUrls[this.getFullPath(route.path, parent)] = route.path;
       }
    }
  }

  getFullPath(path, parent): string {
    let fullPath: string;
    if (path != null) {
      if (parent) {
        fullPath = `/${parent}/${path}`;
      }
      else {
        fullPath = `/${path}`
      }
    }
    return fullPath;
  }
  setUrlLists() {
    if(!this.baseUrls)
    {
     this.baseUrls = {};
     this.setUrls();
    }
  }
}
