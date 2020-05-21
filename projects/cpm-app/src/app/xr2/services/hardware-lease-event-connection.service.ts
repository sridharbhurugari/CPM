import { Injectable } from '@angular/core';
import { Subject, of, Observable } from 'rxjs';
import { EventConnectionService } from './event-connection.service';
import { PicklistQueueItem } from '../model/picklist-queue-item';
import { ConfigurationService, LoggerService, DeferredUtility } from 'oal-core';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { OcapHttpConfigurationService } from '../../shared/services/ocap-http-configuration.service';
import { HubConfigurationService } from './hub-configuration.service';

@Injectable({
  providedIn: 'root'
})
export class HardwareLeaseEventConnectionService {

  public hardwareLeaseDeniedSubject = new Subject();
  public hardwareLeaseGrantedSubject = new Subject();
  clientId: string;

  constructor(
    private eventConnectionService: EventConnectionService,
    private ocapConfigurationService: OcapHttpConfigurationService
    ) {
      this.setClientId();
      this.eventConnectionService.receivedSubject.subscribe(message => this.configureHardwareLeaseHandlers(message));
   }

   private setClientId() {
    const configuration = this.ocapConfigurationService.get();
    console.log('ClientId found : ' + configuration.clientId);
    this.clientId = configuration.clientId;
   }

  public closeEventConnection() {
    this.eventConnectionService.receivedSubject.unsubscribe();
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
