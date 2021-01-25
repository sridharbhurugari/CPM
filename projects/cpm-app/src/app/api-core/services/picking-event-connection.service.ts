import { Injectable, OnDestroy } from '@angular/core';
import { Subject, ReplaySubject } from 'rxjs';
import { EventConnectionService } from '../../shared/services/event-connection.service';
import { IUnfilledPicklistAddedOrUpdatedEvent } from '../events/i-unfilled-picklist-added-or-updated-event';
import { IUnfilledPicklistRemovedEvent } from '../events/i-unfilled-picklist-removed-event';
import { IUnfilledPicklistlineAddedOrUpdatedEvent } from '../events/i-unfilled-picklistline-added-or-updated-event';
import { IUnfilledPicklistlineRemovedEvent } from '../events/i-unfilled-picklistline-removed-event';
import { takeUntil } from 'rxjs/operators';
import { EventEventId } from '../../shared/constants/event-event-id';

@Injectable({
  providedIn: 'root'
})
export class PickingEventConnectionService implements OnDestroy {
  public updatedUnfilledPicklistSubject = new Subject<IUnfilledPicklistAddedOrUpdatedEvent>();
  public removedUnfilledPicklistSubject = new Subject<IUnfilledPicklistRemovedEvent>();
  public updateUnfilledPicklistLineSubject = new Subject<IUnfilledPicklistlineAddedOrUpdatedEvent>();
  public removedUnfilledPicklistLineSubject = new Subject<IUnfilledPicklistlineRemovedEvent>();
  public ngUnsubscribe = new Subject();

  public startedSubject = new ReplaySubject(1);

  constructor(private eventConnectionService: EventConnectionService)
    {
      this.eventConnectionService.receivedSubject.pipe(takeUntil(this.ngUnsubscribe)).subscribe(message => this.eventHandlers(message));
      this.eventConnectionService.startedSubject.pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => this.startedSubject.next());
    }

    ngOnDestroy() {
      this.ngUnsubscribe.next();
      this.ngUnsubscribe.complete();
    }

    private eventHandlers(message: any): void
    {
      try
        {
          if (message === undefined)
            { return; }

          if (message.EventId === EventEventId.AddOrUpdateUnderfilledPicklistEvent) {
            this.updatedUnfilledPicklistSubject.next(message);
            return;
          }

          if (message.EventId === EventEventId.RemoveUnderfilledPicklistEvent) {
            this.removedUnfilledPicklistSubject.next(message);
            return;
          }

          if (message.EventId === EventEventId.AddOrUpdateUnderfilledPicklistLineEvent) {
            this.updateUnfilledPicklistLineSubject.next(message);
            return;
          }

          if (message.EventId === EventEventId.RemoveUnderfilledPicklistLineEvent) {
            this.removedUnfilledPicklistLineSubject.next(message);
            return;
          }
        }
      catch (e)
        {
          console.log('PickingEventConnectionService.eventHandlers ERROR');
          console.log(e);
        }
    }
}
