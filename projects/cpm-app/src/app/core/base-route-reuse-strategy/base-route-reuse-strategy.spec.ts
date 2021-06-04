import { Injector } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Data,
  DetachedRouteHandle,
  Route,
  Routes,
} from "@angular/router";
import { BaseRouteReuseStrategy } from "./base-route-reuse-strategy";

class MockRouter {
  config: Routes;
  getCurrentNavigation(): any {}
}

describe("BaseRouteReuseStrategy", () => {
  let component: BaseRouteReuseStrategy;
  let router = new MockRouter();
  let i: Injector = {
    get(Router: any) {
      return router;
    },
  };
  let finalUrl = "utilization";
  let initialUrl = "";
  let r: Route = { path: "xr2" };
  let routeConfig: Routes = [
    {
      path: "xr2",
      children: [
        { path: "elsewhere" },
        { path: "utilization", data: { reuseComponent: true, isBase: true } },
        {
          path: "utilization/destock/:deviceId",
          data: { reuseComponent: true },
        },
      ],
    },
    {
      path: "core",
      children: [
        { path: "redirected", redirectTo: "nowhere" },
        { path: "somewhere" },
      ],
    },
  ];
  let baseUrls: { [key: string]: any };
  let cache: { [key: string]: DetachedRouteHandle } = {};
  const mock = <T, P extends keyof T>(obj: Pick<T, P>): T => obj as T;

  beforeEach(() => {
    router.config = routeConfig;
    component = new BaseRouteReuseStrategy(i);
    component.baseUrls = baseUrls;
    component.cache = cache;
  });

  it("should create an instance", () => {
    expect(component).toBeTruthy();
  });

  it("store - not added to cache when reuse component is false", () => {
    const route = { path: "myTest", redirectTo: "nowhere", pathMatch: "full" };
    const data: Data = { reuseComponent: false, isBase: false };
    const aRoute = mock<ActivatedRouteSnapshot, "routeConfig">({
      routeConfig: route,
    });
    aRoute.data = data;
    const detachedRouteHandle: DetachedRouteHandle = "hi";
    component.cache = {};
    component.store(aRoute, detachedRouteHandle);

    expect(component.cache).toBeTruthy();
    expect(component.cache["myTest"]).toBeFalsy();
  });

  it("store - add to cache when reuse component is true", () => {
    component.cache = cache;
    const route = { path: "myTest", redirectTo: "nowhere", pathMatch: "full" };
    const data: Data = { reuseComponent: true, isBase: true };
    const aRoute = mock<ActivatedRouteSnapshot, "routeConfig">({
      routeConfig: route,
    });
    aRoute.data = data;
    const detachedRouteHandle: DetachedRouteHandle = "hi";

    component.store(aRoute, detachedRouteHandle);

    expect(component.cache).toBeTruthy();
    expect(component.cache["myTest"]).toEqual(detachedRouteHandle);
  });

  it("shouldDetach - false when reuse component is false or missing", () => {
    component.cache = cache;
    const route = { path: "myTest", redirectTo: "nowhere", pathMatch: "full" };
    const data: Data = { reuseComponent: false, isBase: false };
    const aRoute = mock<ActivatedRouteSnapshot, "routeConfig">({
      routeConfig: route,
    });
    aRoute.data = {};
    expect(component.shouldDetach(aRoute)).toEqual(false);
    aRoute.data = data;
    expect(component.shouldDetach(aRoute)).toEqual(false);
  });

  it("shouldDetach - true when reuse component is true", () => {
    component.cache = cache;
    const route = { path: "myTest", redirectTo: "nowhere", pathMatch: "full" };
    const data: Data = { reuseComponent: true, isBase: false };
    const aRoute = mock<ActivatedRouteSnapshot, "routeConfig">({
      routeConfig: route,
    });
    aRoute.data = data;

    expect(component.shouldDetach(aRoute)).toEqual(true);
  });

  it("shouldAttach - we will re-attach (true) if we have the route config and a cache to pull", () => {
    const route = { path: "myTest", redirectTo: "nowhere", pathMatch: "full" };
    const detachedRouteHandle: DetachedRouteHandle = "hi";
    component.cache = {};
    component.cache["myTest"] = detachedRouteHandle;
    const data: Data = { reuseComponent: true, isBase: true };
    const aRoute = mock<ActivatedRouteSnapshot, "routeConfig">({
      routeConfig: route,
    });
    aRoute.data = data;

    expect(component.shouldAttach(aRoute)).toEqual(true);
  });

  it("shouldAttach - we will not re-attach (false) if we do not have the route config", () => {
    const route = { path: "myTest", redirectTo: "nowhere", pathMatch: "full" };
    const detachedRouteHandle: DetachedRouteHandle = "hi";
    component.cache = {};
    component.cache["myTest"] = detachedRouteHandle;
    const aRoute = mock<ActivatedRouteSnapshot, "routeConfig">({
      routeConfig: null,
    });

    expect(component.shouldAttach(aRoute)).toEqual(false);
  });

  it("shouldAttach - we will not re-attach (false) if we do not have a cache entry for the path", () => {
    const route = { path: "myTest", redirectTo: "nowhere", pathMatch: "full" };
    const detachedRouteHandle: DetachedRouteHandle = "hi";
    component.cache = {};
    const aRoute = mock<ActivatedRouteSnapshot, "routeConfig">({
      routeConfig: route,
    });

    expect(component.shouldAttach(aRoute)).toEqual(false);
  });

  it("retrieve - we will re-attach if we have the route config and a cache to pull", () => {
    const route = { path: "myTest", redirectTo: "nowhere", pathMatch: "full" };
    const detachedRouteHandle: DetachedRouteHandle = "hi";
    component.cache = {};
    component.cache["myTest"] = detachedRouteHandle;
    const data: Data = { reuseComponent: true, isBase: true };
    const aRoute = mock<ActivatedRouteSnapshot, "routeConfig">({
      routeConfig: route,
    });
    aRoute.data = data;

    expect(component.retrieve(aRoute)).toEqual(detachedRouteHandle);
  });

  it("retrieve - we will NOT re-attach if we are missing the route config", () => {
    const detachedRouteHandle: DetachedRouteHandle = "hi";
    component.cache = {};
    component.cache["myTest"] = detachedRouteHandle;
    const data: Data = { reuseComponent: true, isBase: true };
    const aRoute = mock<ActivatedRouteSnapshot, "routeConfig">({
      routeConfig: null,
    });
    aRoute.data = data;

    expect(component.retrieve(aRoute)).toBeFalsy();
  });

  it("retrieve - we will NOT re-attach if we are missing the cache entry", () => {
    const route = { path: "myTest", redirectTo: "nowhere", pathMatch: "full" };
    const detachedRouteHandle: DetachedRouteHandle = "hi";
    component.cache = {};
    const data: Data = { reuseComponent: true, isBase: true };
    const aRoute = mock<ActivatedRouteSnapshot, "routeConfig">({
      routeConfig: route,
    });
    aRoute.data = data;

    expect(component.retrieve(aRoute)).toBeFalsy();
  });

  it("shouldReuseRoute - cache not cleared when the navigation is under a base route", () => {
    finalUrl = "/xr2/utilization";
    initialUrl = "/xr2/utilization/destock/4";

    baseUrls = undefined;
    spyOn(router, "getCurrentNavigation").and.returnValue({
      finalUrl: finalUrl,
      initialUrl: initialUrl,
    });
    const detachedRouteHandle: DetachedRouteHandle = "hi";
    component.cache = {};
    component.cache["utilization"] = detachedRouteHandle;

    const result = component.shouldReuseRoute(null, null);
    expect(result).toBeFalsy();
    expect(component.cache["utilization"]).toEqual(detachedRouteHandle);
  });

  it("shouldReuseRoute - cache is cleared when the navigation is to a base route", () => {
    finalUrl = "/core/somewhere";
    initialUrl = "/xr2/utilization/destock/4";

    baseUrls = undefined;
    spyOn(router, "getCurrentNavigation").and.returnValue({
      finalUrl: finalUrl,
      initialUrl: initialUrl,
    });
    const detachedRouteHandle: DetachedRouteHandle = "hi";
    component.cache = {};
    component.cache["utilization"] = detachedRouteHandle;
    component.cache["utilization/destock/4"] = detachedRouteHandle;
    expect(component.cache).toBeTruthy();
    expect(component.cache["utilization/destock/4"]).toBeTruthy();
    const result = component.shouldReuseRoute(null, null);
    expect(result).toBeFalsy(); // this should always be false
    expect(component.cache["utilization"]).toBeFalsy();
    expect(component.cache["utilization/destock/4"]).toBeFalsy();
  });
});
