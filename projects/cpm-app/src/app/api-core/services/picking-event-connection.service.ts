import { Injectable } from '@angular/core';
import { Subject, ReplaySubject } from 'rxjs';
import { EventConnectionService } from '../../shared/services/event-connection.service';
import { IUnfilledPicklistAddedOrUpdatedEvent } from '../events/i-unfilled-picklist-added-or-updated-event';
import { IUnfilledPicklistRemovedEvent } from '../events/i-unfilled-picklist-removed-event';
import { IUnfilledPicklistlineAddedEvent } from '../events/i-unfilled-picklistline-added-event';

@Injectable({
  providedIn: 'root'
})
export class PickingEventConnectionService {
  public updatedUnfilledPicklistSubject = new Subject<IUnfilledPicklistAddedOrUpdatedEvent>();
  public removedUnfilledPicklistSubject = new Subject<IUnfilledPicklistRemovedEvent>();
  public addedUnfilledPicklistLineSubject = new Subject<IUnfilledPicklistlineAddedEvent>();  

  public startedSubject = new ReplaySubject(1);

  constructor(private eventConnectionService: EventConnectionService) 
    {
      this.eventConnectionService.receivedSubject.subscribe(message => this.eventHandlers(message));
      this.eventConnectionService.startedSubject.subscribe(() => this.startedSubject.next());
    }

   private eventHandlers(message: any): void 
    {
      try 
        {
          if (message === undefined) 
            { return; }    

          if (message.EventId === 'AddOrUpdateUnderfilledPicklistEvent') {            
            this.updatedUnfilledPicklistSubject.next({
              UnderfilledPicklist: message.PicklistUnderfilled
            });
            return;
          }
            
          if (message.EventId === 'RemoveUnderfilledPicklistEvent') {            
            this.removedUnfilledPicklistSubject.next(message);
            return;
          }

          if (message.EventId === 'AddUnderfilledPicklistLineEvent') {            
            this.addedUnfilledPicklistLineSubject.next(message);
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
