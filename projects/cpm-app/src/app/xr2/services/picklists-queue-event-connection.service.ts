import { Injectable } from '@angular/core';
import { Subject, of, Observable } from 'rxjs';
import { EventConnectionService } from './event-connection.service';
import { PicklistQueueItem } from '../model/picklist-queue-item';
import { ConfigurationService } from 'oal-core';

@Injectable({
  providedIn: 'root'
})
export class PicklistsQueueEventConnectionService extends EventConnectionService {

  public addOrUpdatePicklistQueueItemSubject = new Subject<PicklistQueueItem>();
  public removePicklistQueueItemSubject = new Subject<PicklistQueueItem>();

  constructor(_configurationService: ConfigurationService) {
    super(_configurationService);
   }

  public async openEventConnection(): Promise<void> {
    this.startUp();
    this.receivedSubject.subscribe(message => this.configurePicklistEventHandlers(message));
  }

  private configurePicklistEventHandlers(message: any): void {
    if (message === undefined) {
      return;
    }

    if (message.EventId === undefined) {
      return;
    }

    if (message.EventId === 'AddOrUpdatePicklistQueueItemMessage') {
      this.addOrUpdatePicklistQueueItemSubject.next(message);
      return;
    }

    if (message.EventId === 'RemovePicklistQueueItemMessage') {
      this.removePicklistQueueItemSubject.next(message);
      return;
    }
  }
}


