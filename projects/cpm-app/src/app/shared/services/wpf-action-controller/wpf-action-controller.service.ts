import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router, Params } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { WindowService } from '../window-service';
import { EventConnectionService } from '../../../shared/services/event-connection.service';

@Injectable({
  providedIn: 'root'
})

export class WpfActionControllerService {
  private wpfActionController;

  constructor(
    windowService: WindowService,
    private location: Location,
    private router: Router,
    private eventConnectionService: EventConnectionService
  ) {
    if(windowService.nativeWindow){
      this.wpfActionController = windowService.nativeWindow['actionController'];
    }
  }

  ExecuteBackAction() {
    if (this.wpfActionController != null) {
      this.eventConnectionService.stop();
      this.wpfActionController.executeBackAction();
    } else {
      this.location.back();
    }
  }

  /* istanbul ignore next */
  ExecuteContinueAction() {
    if (this.wpfActionController != null) {
      this.eventConnectionService.stop();
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
      this.eventConnectionService.stop();
      this.wpfActionController.executeContinueNavigationAction(fragment);
    } else {
      this.router.navigate([newRoute], { queryParams: queryParams, preserveQueryParams: false });
    }
  }

  /* istanbul ignore next */
  ExecuteWpfContinueNavigationAction(action: string) {
    if (this.wpfActionController != null) {
      this.eventConnectionService.stop();
      this.wpfActionController.executeWpfContinueNavigationAction(action);
    }
  }
}
