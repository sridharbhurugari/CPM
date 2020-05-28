import { Injectable } from '@angular/core';
import { Subject, of, Observable } from 'rxjs';
import { PicklistQueueItem } from '../model/picklist-queue-item';
import { EventConnectionService } from '../../shared/services/event-connection.service';

@Injectable({
  providedIn: 'root'
})
export class PicklistsQueueEventConnectionService {

  public addOrUpdatePicklistQueueItemSubject = new Subject<PicklistQueueItem>();
  public removePicklistQueueItemSubject = new Subject<PicklistQueueItem>();
  public reloadPicklistQueueItemsSubject = new Subject<any>();

  constructor(
      private eventConnectionService: EventConnectionService
    ) {
      this.eventConnectionService.receivedSubject.subscribe(message => this.configurePicklistEventHandlers(message));
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

