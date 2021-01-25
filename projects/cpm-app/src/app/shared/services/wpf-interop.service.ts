import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { LoggerService, LogVerbosity } from 'oal-core';
import { Subject } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { LoggingCategory } from '../constants/logging-category';
import { EventConnectionService } from './event-connection.service';
import { LocalStorageService } from './local-storage.service';
import { WindowService } from './window-service';

@Injectable({
  providedIn: 'root'
})
export class WpfInteropService {
  wpfViewModelActivated: Subject<null> = new Subject();

  constructor(
    private windowService: WindowService,
    private zone: NgZone,
    private router: Router,
    private localStorage: LocalStorageService,
    private eventConnectionService: EventConnectionService,
    private loggerService: LoggerService
  ) { }

  /* istanbul ignore next */
  attachWindowMethods() {
    if (!this.windowService.nativeWindow) {
      return;
    }

    this.windowService.nativeWindow['navigateToLoading'] = () => {
      this.zone.run(() => {
        this.router.navigate(['core/loading']);
      });
    };

    this.windowService.nativeWindow['cpmLogOff'] = () => {
      this.zone.run(() => {
        let navigateAway = () => this.windowService.nativeWindow.location.href = 'about:blank';
        this.localStorage.clear();
        if(!this.eventConnectionService.isConnected) {
          navigateAway();
          return;
        }

        let disconnectedOrTimedOut = this.eventConnectionService.disconnectedSubject.pipe(timeout(2000));
        disconnectedOrTimedOut.subscribe(x => {
          navigateAway();
        }, err => {
          this.loggerService.logError(LogVerbosity.Normal, LoggingCategory.CpmApp, `signalr disconnect timed out`);
          navigateAway();
        })
        this.eventConnectionService.stop();
      });
    };

    this.windowService.nativeWindow['wpfViewModelActivated'] = () => {
      this.zone.run(() => {
        this.wpfViewModelActivated.next();
      });
    };
  }
}
