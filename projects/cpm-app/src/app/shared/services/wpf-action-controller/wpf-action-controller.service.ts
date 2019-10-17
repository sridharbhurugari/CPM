import { Injectable } from '@angular/core';
import { WindowRef } from '../window-ref';
// import { LoggingService } from 'oal-core';

@Injectable({
  providedIn: 'root'
})

export class WpfActionControllerService {
  private wpfActionController;
  // private loggingService: LoggingService;

  constructor(windowRef: WindowRef) {
    if(windowRef.nativeWindow){
      this.wpfActionController = windowRef.nativeWindow['actionController'];
    }
    // this.loggingService = loggingService;
  }

  ExecuteBackAction() {
    if (this.wpfActionController != null) {
      // this.loggingService.LogInfo(`WpfActionControllerService.ExecuteBackAction - Executing Back action.`);
      this.wpfActionController.executeBackAction();
    } else {
      // this.loggingService.LogInfo(`WpfActionControllerService.ExecuteBackAction - No action controller. Back action NOT executed.`);
    }
  }

  ExecuteContinueAction() {
    if (this.wpfActionController != null) {
      // this.loggingService.LogInfo(`WpfActionControllerService.ExecuteContinueAction - Executing Continue action.`);
      this.wpfActionController.executeContinueAction();
    } else {
      // this.loggingService.LogInfo(`WpfActionControllerService.ExecuteContinueAction - No action controller. Continue action NOT executed.`);
    }
  }

  ExecuteContinueNavigationAction(newRoute: string) {
    if (this.wpfActionController != null) {
      // this.loggingService.LogInfo(`WpfActionControllerService.ExecuteContinueAction - Executing Continue action.`);
      this.wpfActionController.executeContinueNavigationAction(newRoute);
    } else {
      // this.loggingService.LogInfo(`WpfActionControllerService.ExecuteContinueAction - No action controller. Continue action NOT executed.`);
    }
  }
}
