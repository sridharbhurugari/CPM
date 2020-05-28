import { Injectable } from '@angular/core';
import { Subject, of, Observable } from 'rxjs';
import { EventConnectionService } from './event-connection.service';
import { PicklistQueueItem } from '../model/picklist-queue-item';
import { ConfigurationService } from 'oal-core';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { HubConfigurationService } from './hub-configuration.service';

@Injectable({
  providedIn: 'root'
})
export class PicklistsQueueEventConnectionService extends EventConnectionService {

  public addOrUpdatePicklistQueueItemSubject = new Subject<PicklistQueueItem>();
  public removePicklistQueueItemSubject = new Subject<PicklistQueueItem>();
  public reloadPicklistQueueItemsSubject = new Subject<any>();

  constructor(
    hubConfigurationService: HubConfigurationService,
    configurationService: ConfigurationService,
    ocapUrlBuilderService: OcapUrlBuilderService
    ) {
    super(hubConfigurationService, configurationService, ocapUrlBuilderService);
   }

  public async openEventConnection(): Promise<void> {
    this.startUp();
    this.receivedSubject.subscribe(message => this.configurePicklistEventHandlers(message));
  }

  private configurePicklistEventHandlers(message: any): void {
    const messageTypeName: string = message.$type;

    if (message === undefined) {
      return;
    }

    if (message.EventId === undefined) {
      return;
    }

    if (message.EventId === 'AddOrUpdatePicklistQueueItemMessage') {
      console.log(message);
      this.addOrUpdatePicklistQueueItemSubject.next(message);
      return;
    }

    if (message.EventId === 'RemovePicklistQueueItemMessage') {
      console.log(message);
      this.removePicklistQueueItemSubject.next(message);
      return;
    }

    if (message.EventId === 'ReloadPicklistQueueItemsMessage') {
      console.log(message);
      this.reloadPicklistQueueItemsSubject.next(message);
      return;
    }
  }
}

