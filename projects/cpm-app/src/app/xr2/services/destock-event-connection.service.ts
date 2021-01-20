import { Injectable } from '@angular/core';
import { Subject, of, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EventEventId } from '../../shared/constants/event-event-id';
import { EventConnectionService } from '../../shared/services/event-connection.service';
import { DestockDataEvent } from '../model/destock-data-event';
import { DestockTypeInfo } from '../model/destock-type-info';
@Injectable({
  providedIn: 'root'
})
export class DestockEventConnectionService {

  public DestockIncomingDataSubject = new Subject<DestockDataEvent>();
  public DestockIncomingDataErrorSubject = new Subject<any>();
  public ngUnsubscribe = new Subject();

  constructor(
      private eventConnectionService: EventConnectionService
    ) {
      this.eventConnectionService.receivedSubject
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(event => this.configureEventHandlers(event));
   }

  private configureEventHandlers(event: any): void {
    try {
      if (event === undefined) {
        return;
      }
      switch(event.EventId) {
      case EventEventId.DestockDataEvent : {
        console.log(event);
        this.DestockIncomingDataSubject.next({
            EventId: event.EventId,
            DeviceId: event.DeviceId,
            CorrelationId: event.DestockDataMessage.CorrelationId,
            EventDateTime: event.DestockDataMessage.EventDateTime,
            DestockTypeInfoData: event.DestockDataMessage.DestockTypeInfoData.$values as DestockTypeInfo[]
        });
        return;
      }
      case EventEventId.DestockDataErrorEvent : {
        console.log(event);
        this.DestockIncomingDataErrorSubject.next(event);
        return;
      }
    }
    } catch (e) {
      console.log('DestockEventConnectionService.configureDestockEventHandlers ERROR');
      console.log(e);
    }

  }
}
