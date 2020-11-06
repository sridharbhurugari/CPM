import { Injectable } from '@angular/core';
import { Subject, of, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EventConnectionService } from '../../shared/services/event-connection.service';
import { QuickPickDrawerData } from '../model/quick-pick-drawer-data';

@Injectable({
  providedIn: 'root'
})
export class QuickPickEventConnectionService {

  public QuickPickReloadDrawersSubject = new Subject<QuickPickDrawerData>();
  public QuickPickDrawerUpdateSubject = new Subject<QuickPickDrawerData>();
  public QuickPickQueueUpdateSubject = new Subject<any>();
  public QuickPickErrorUpdateSubject = new Subject<any>();
  public QuickPickDeviceStatusUpdateSubject = new Subject<any>();
  public ngUnsubscribe = new Subject();

  constructor(
      private eventConnectionService: EventConnectionService
    ) {
      this.eventConnectionService.receivedSubject
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(message => this.configurePicklistEventHandlers(message));
   }

  private configurePicklistEventHandlers(message: any): void {
    try {
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
      if (message.EventId === 'QuickPickQueueUpdateEvent') {
        console.log(message);
        this.QuickPickQueueUpdateSubject.next(message);
        return;
      }
      if (message.EventId === 'QuickPickErrorUpdateEvent') {
        console.log(message);
        this.QuickPickErrorUpdateSubject.next(message);
        return;
      }
      if (message.EventId === 'QuickPickDeviceStatusUpdateEvent') {
        console.log(message);
        this.QuickPickDeviceStatusUpdateSubject.next(message);
        return;
      }
    } catch (e) {
      console.log('QuickPickEventConnectionService.configurePicklistEventHandlers ERROR');
      console.log(e);
    }
  }
}
