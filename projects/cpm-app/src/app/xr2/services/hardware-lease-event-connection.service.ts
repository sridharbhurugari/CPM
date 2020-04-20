import { Injectable } from '@angular/core';
import { Subject, of, Observable } from 'rxjs';
import { EventConnectionService } from './event-connection.service';
import { PicklistQueueItem } from '../model/picklist-queue-item';
import { ConfigurationService } from 'oal-core';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { OcapHttpConfigurationService } from '../../shared/services/ocap-http-configuration.service';

@Injectable({
  providedIn: 'root'
})
export class HardwareLeaseEventConnectionService extends EventConnectionService {

  public hardwareResponseSubject = new Subject<string>();
  clientId: string;

  constructor(
    configurationService: ConfigurationService,
    ocapUrlBuilderService: OcapUrlBuilderService,
    private ocapConfigurationService: OcapHttpConfigurationService
    ) {
    super(configurationService, ocapUrlBuilderService);
    this.setClientId();
   }

   private setClientId() {
    const configuration = this.ocapConfigurationService.get();
    console.log('ClientId found : ' + configuration.clientId);
    this.clientId = configuration.clientId;
   }

  public async openEventConnection(): Promise<void> {
    this.startUp();
    this.receivedSubject.subscribe(message => this.configureHardwareLeaseHandlers(message));
  }

  private configureHardwareLeaseHandlers(message: any): void {
    console.log(message);

    if (message === undefined) {
      return;
    }

    if (message.EventId === undefined) {
      if (message.clientId !== undefined && message.clientId === this.clientId) {
          console.log('Matching Client Id triggering event subscription');
          this.hardwareResponseSubject.next(message);
      }
    }
  }
}
