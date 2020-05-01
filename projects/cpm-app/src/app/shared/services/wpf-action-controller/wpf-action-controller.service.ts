import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router, Params } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { WindowService } from '../window-service';
import { CoreEventConnectionService } from '../../../api-core/services/core-event-connection.service';

@Injectable({
  providedIn: 'root'
})

export class WpfActionControllerService {
  private wpfActionController;

  constructor(
    windowService: WindowService,
    private location: Location,
    private router: Router,
    private coreEventConnectionService: CoreEventConnectionService,
  ) {
    if(windowService.nativeWindow){
      this.wpfActionController = windowService.nativeWindow['actionController'];
    }
  }

  ExecuteBackAction() {
    if (this.wpfActionController != null) {
      this.coreEventConnectionService.stop();
      this.wpfActionController.executeBackAction();
    } else {
      this.location.back();
    }
  }

  ExecuteContinueAction() {
    if (this.wpfActionController != null) {
      this.coreEventConnectionService.stop();
      this.wpfActionController.executeContinueAction();
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
      this.coreEventConnectionService.stop();
      this.wpfActionController.executeContinueNavigationAction(fragment);
    } else {
      this.router.navigate([newRoute], { queryParams: queryParams, preserveQueryParams: false });
    }
  }

  ExecuteWpfContinueNavigationAction(action: string) {
    if (this.wpfActionController != null) {
      this.coreEventConnectionService.stop();
      this.wpfActionController.executeWpfContinueNavigationAction(action);
    } 
  }
}
