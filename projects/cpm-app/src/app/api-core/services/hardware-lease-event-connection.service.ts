import { Injectable, OnDestroy } from '@angular/core';
import { Subject, of, Observable } from 'rxjs';
import { OcapHttpConfigurationService } from '../../shared/services/ocap-http-configuration.service';
import { EventConnectionService } from '../../shared/services/event-connection.service';
import { takeUntil } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HardwareLeaseEventConnectionService implements OnDestroy {

  public hardwareLeaseDeniedSubject = new Subject();
  public hardwareLeaseGrantedSubject = new Subject();
  ngUnsubscribe = new Subject();
  clientId: string;

  constructor(
    private eventConnectionService: EventConnectionService,
    private ocapConfigurationService: OcapHttpConfigurationService
    ) {
      this.setClientId();
      this.eventConnectionService.receivedSubject
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(message => this.configureHardwareLeaseHandlers(message));
   }

   ngOnDestroy() {
     this.ngUnsubscribe.next();
     this.ngUnsubscribe.complete();
   }

   private setClientId() {
    const configuration = this.ocapConfigurationService.get();
    console.log('ClientId found : ' + configuration.clientId);
    this.clientId = configuration.clientId;
   }

  private configureHardwareLeaseHandlers(message: any): void {
    console.log(message);

    if (message === undefined) {
      return;
    }

    if (message.EventId === undefined) {
      if (message.ClientId === this.clientId) {
          console.log('Matching Client Id triggering event subscription');
          if (message.$type.includes('HardwareLeaseGrantedEvent')) {
              this.hardwareLeaseGrantedSubject.next();
          } else if (message.$type.includes('HardwareLeaseDeniedEvent')) {
            this.hardwareLeaseDeniedSubject.next();
          }
      }
    }
  }
}
