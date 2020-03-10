import { Injectable } from '@angular/core';
import { Subject, of, Observable } from 'rxjs';
import { EventConnectionService } from './event-connection.service';
import { PicklistQueueItem } from '../model/picklist-queue-item';

@Injectable({
  providedIn: 'root'
})
export class PicklistsQueueEventConnectionService extends EventConnectionService {

  public addOrUpdatePicklistQueueItemSubject = new Subject<PicklistQueueItem>();
  public removePicklistQueueItemSubject = new Subject<PicklistQueueItem>();

  constructor() {
    super();
   }

  public async openEventConnection(): Promise<void> {
    this.startUp();
    this.receivedSubject.subscribe(message => this.configurePicklistEventHandlers(message));
  }

  private configurePicklistEventHandlers(message: string): void {
    const hubMessage = JSON.parse(JSON.stringify(message));

    const messageTypeName: string = hubMessage.$type;    

    if (messageTypeName === undefined) {
      return;
    }

    if (messageTypeName.includes('AddOrUpdatePicklistQueueItemMessage')) {
      this.addOrUpdatePicklistQueueItemSubject.next(hubMessage);
      return;
    }

    if (messageTypeName.includes('RemovePicklistQueueItemMessage')) {
      this.removePicklistQueueItemSubject.next(hubMessage);
      return;
    }      
  }
}
