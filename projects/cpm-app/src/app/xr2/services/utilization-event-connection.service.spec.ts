import { TestBed } from '@angular/core/testing';
import { ConfigurationService } from 'oal-core';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { Subject } from 'rxjs';
import { EventConnectionService } from '../../shared/services/event-connection.service';
import { UtilizationEventConnectionService } from './utilization-event-connection.service';
import { UtilizationDataEvent } from '../model/utilization-data-event';
import { ErroredMedicationInfo } from '../model/utilization-errored-medication-info';

describe('UtilizationEventConnectionService', () => {
  let eventConnectionService: Partial<EventConnectionService>;

  eventConnectionService = {
    receivedSubject: new Subject()
  }

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: EventConnectionService, useValue: eventConnectionService },
      { provide: ConfigurationService, useValue: { getItem: () => {} } },
      { provide: OcapUrlBuilderService, useValue: { buildUrl: () => {}} },
    ]
  }));

  it('should be created', () => {
    spyOn(eventConnectionService.receivedSubject, 'subscribe');
    const service: UtilizationEventConnectionService = TestBed.get(UtilizationEventConnectionService);
    expect(service).toBeTruthy();
    expect(eventConnectionService.receivedSubject.subscribe).toHaveBeenCalled();
  });

  describe('Message ErroredMedsReceived', () => {

    beforeEach(() => {

    });

    it('Check when empty', () => {
      const service: UtilizationEventConnectionService = TestBed.get(UtilizationEventConnectionService);
      const receivedSubject: Subject<string> = new Subject<string>();
      eventConnectionService.receivedSubject = receivedSubject;
      let data: ErroredMedicationInfo[];
      const message: UtilizationDataEvent = {
        EventId: 'ErroredMedsReceived', // = EventTypes.UtilizationDataEvent;
        DeviceId: 4,
        EventDateTime: new Date(),
        UtilizationData: data
      }
      const messageJson = JSON.stringify({message});
      receivedSubject.next(messageJson);
      expect(service.UtilizationIncomingDataSubject).toBeTruthy();

    });
  });
});
