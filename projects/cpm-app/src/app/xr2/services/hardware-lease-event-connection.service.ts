import { Injectable } from '@angular/core';
import { Subject, of, Observable } from 'rxjs';
import { EventConnectionService } from './event-connection.service';
import { PicklistQueueItem } from '../model/picklist-queue-item';
import { ConfigurationService } from 'oal-core';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';

@Injectable({
  providedIn: 'root'
})
export class HardwareLeaseEventConnectionService extends EventConnectionService {

  public hardwareResponseSubject = new Subject<string>();

  constructor(
    configurationService: ConfigurationService,
    ocapUrlBuilderService: OcapUrlBuilderService
    ) {
    super(configurationService, ocapUrlBuilderService);
   }

  public async openEventConnection(): Promise<void> {
    this.startUp();
    this.receivedSubject.subscribe(message => this.configureHardwareLeaseHandlers(message));
  }

  private configureHardwareLeaseHandlers(message: any): void {
    if (message === undefined) {
      return;
    }
    console.log(message);

    if (message.EventId === undefined) {
        return;
    }
  }
}
