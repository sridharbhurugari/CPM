import { Injectable } from '@angular/core';
import { Subject, of, Observable } from 'rxjs';
import { EventConnectionService } from '../../shared/services/event-connection.service';
import { QuickPickDrawerData } from '../model/quick-pick-drawer-data';

@Injectable({
  providedIn: 'root'
})
export class QuickPickEventConnectionService {

  public QuickPickReloadDrawersSubject = new Subject<QuickPickDrawerData>();
  public QuickPickDrawerUpdateSubject = new Subject<QuickPickDrawerData>();

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

    if (message.EventId === 'QuickPickReloadDrawersEvent') {
      console.log(message);
      this.QuickPickReloadDrawersSubject.next(message);
      return;
    }
    if (message.EventId === 'QuickPickDrawerUpdateEvent') {
      console.log(message);
      this.QuickPickDrawerUpdateSubject.next(message);
      return;
    }
  }
}
