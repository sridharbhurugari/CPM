import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { WindowRef } from '../window-ref';
import { Router, Params } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class WpfActionControllerService {
  private wpfActionController;

  constructor(
    windowRef: WindowRef,
    private location: Location,
    private router: Router
  ) {
    if(windowRef.nativeWindow){
      this.wpfActionController = windowRef.nativeWindow['actionController'];
    }
  }

  ExecuteBackAction() {
    if (this.wpfActionController != null) {
      this.wpfActionController.executeBackAction();
    } else {
      this.location.back();
    }
  }

  ExecuteContinueAction() {
    if (this.wpfActionController != null) {
      this.wpfActionController.executeContinueAction();
    } else {
    }
  }

  ExecuteContinueNavigationAction(newRoute: string, queryParams?: Params) {
    if (this.wpfActionController != null) {
      var httpParamsObj = new HttpParams();
      for(var i in queryParams){
        httpParamsObj = httpParamsObj.set(i, queryParams[i]);
      }

      var qs = httpParamsObj.toString();
      var fragment = queryParams ? `${newRoute}?${qs}` : newRoute;
      this.wpfActionController.executeContinueNavigationAction(fragment);
    } else {
      this.router.navigate([newRoute], { queryParams: queryParams, preserveQueryParams: false });
    }
  }
}
