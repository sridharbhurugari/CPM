import { Injectable } from '@angular/core';
import { Subject, ReplaySubject } from 'rxjs';
import { EventConnectionService } from '../../shared/services/event-connection.service';
import { IUnfilledPicklistCreatedEvent } from '../events/i-unfilled-picklist-created-event';
import { IUnfilledPicklistRemovedEvent } from '../events/i-unfilled-picklist-removed-event';

@Injectable({
  providedIn: 'root'
})
export class PickingEventConnectionService {
  public newUnfilledPicklistSubject = new Subject<IUnfilledPicklistCreatedEvent>();
  public removedUnfilledPicklistSubject = new Subject<IUnfilledPicklistRemovedEvent>();

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
            
          if (message.EventId === 'NewUnfilledPicklistCreated') {            
            this.newUnfilledPicklistSubject.next(message);
            return;
          }

          if (message.EventId === 'UnfilledPicklistRemoved') {            
            this.removedUnfilledPicklistSubject.next(message);
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
