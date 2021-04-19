import { Injectable } from '@angular/core';
import { Subject, of, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EventEventId } from '../../shared/constants/event-event-id';
import { EventConnectionService } from '../../shared/services/event-connection.service';
import { UtilizationDataEvent } from '../model/utilization-data-event';
import { ErroredMedicationInfo } from '../model/utilization-errored-medication-info';
import { ExpiringMedicationInfo } from '../model/utilization-expiring-medication-info';
import { UnassignedMedicationInfo } from '../model/utilization-unassigned-medication-info';
@Injectable({
  providedIn: 'root'
})
export class UtilizationEventConnectionService {

  public UtilizationIncomingDataSubject = new Subject<UtilizationDataEvent>();
  public UtilizationIncomingDataErrorSubject = new Subject<any>();
  public ngUnsubscribe = new Subject();

  constructor(
      private eventConnectionService: EventConnectionService
    ) {
      this.eventConnectionService.receivedSubject
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(event => this.configureEventHandlers(event));
   }

   configureEventHandlers(event: any): void {
    try {
      if (event === undefined) {
        return;
      }
      // Event types: ExpiringMedsReceived  UnassignedMedsReceived  ErroredMedsReceived
      switch(event.EventId) {
      case EventEventId.ExpiringMedsReceived : {
        console.log(event);
        const e: UtilizationDataEvent = {
          EventId: event.EventId,
          DeviceId: event.DeviceId,
          EventDateTime: event.EventDateTime,
          // Cast is needed because the message is not being serialized properly (vanilla)
          UtilizationData: event.ExpiringMedicationInfoList.$values as ExpiringMedicationInfo[]
      }
        this.UtilizationIncomingDataSubject.next(e);
        return;
      }
      case EventEventId.UnassignedMedsReceived  : {
        console.log(event);
        this.UtilizationIncomingDataSubject.next({
          EventId: event.EventId,
          DeviceId: event.DeviceId,
          EventDateTime: event.EventDateTime,
            // Cast is needed because the message is not being serialized properly (vanilla)
            UtilizationData: event.UnassignedMedicationInfoList.$values as UnassignedMedicationInfo[]
        });
        return;
      }
      case EventEventId.ErroredMedsReceived  : {
        console.log(event);
        this.UtilizationIncomingDataSubject.next({
          EventId: event.EventId,
          DeviceId: event.DeviceId,
          EventDateTime: event.EventDateTime,
            // Cast is needed because the message is not being serialized properly (vanilla)
            UtilizationData: event.ErroredMedicationInfoList.$values as ErroredMedicationInfo[]
        });
        return;
      }
      case EventEventId.UtilizationDataErrorEvent : {
        console.log(event);
        this.UtilizationIncomingDataErrorSubject.next(event);
        return;
      }
    }
    } catch (e) {
      console.log('UtilizationEventConnectionService.configureUtilizationEventHandlers ERROR');
      console.log(e);
    }
  }
}
