import { TestBed } from '@angular/core/testing';

import { DeviceLeaseService } from './device-lease.service';
import { CoreEventConnectionService } from '../../../api-core/services/core-event-connection.service';
import { HardwareLeaseService } from '../../../api-core/services/hardware-lease-service';
import { Subject, ReplaySubject, of } from 'rxjs';
import { IDeviceLeaseDeniedEvent } from '../../../api-core/events/i-device-lease-denied-event';
import { IDeviceLeaseGrantedEvent } from '../../../api-core/events/i-device-lease-granted-event';
import { DeviceOperationOutcome } from '../../enums/device-operation-outcome';
import { IDeviceOperationResult } from '../../../api-core/data-contracts/i-device-operation-result';
import { Guid } from 'guid-typescript';

describe('DeviceLeaseService', () => {
  let service: DeviceLeaseService;
  let coreEventConnectionService: Partial<CoreEventConnectionService>;
  let hardwareLeaseService: Partial<HardwareLeaseService>;
  let commandResult: IDeviceOperationResult;
  let requestCorrelationId: Guid;

  beforeEach(() => {
    coreEventConnectionService = {
      startedSubject: new ReplaySubject(),
      deviceLeaseGrantedSubject: new Subject<IDeviceLeaseGrantedEvent>(),
      deviceLeaseDeniedSubject: new Subject<IDeviceLeaseDeniedEvent>(),
    };
    hardwareLeaseService = {
      RequestDeviceLeaseCorrelate: (x) => {
        requestCorrelationId = x;
        return of(commandResult);
      }
    };
    TestBed.configureTestingModule({
      providers: [
        { provide: HardwareLeaseService, useValue: hardwareLeaseService },
        { provide: CoreEventConnectionService, useValue: coreEventConnectionService },
      ]
    })
    service = TestBed.get(DeviceLeaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('given event connection started', () => {
    beforeEach(() => {
      coreEventConnectionService.startedSubject.next();
    });

    describe('requestLease', () => {
      describe('given device operation result indicates failure', () => {
        beforeEach(() => {
          commandResult = {
            IsSuccessful: false,
            Outcome: DeviceOperationOutcome.DeviceOfflineOrNotFound,
            OutcomeText: ''
          };
        });

        it('should return false', (done) => {
          service.requestLease(5).subscribe(x => {
            expect(x).toBeFalsy();
            done();
          });
        });
      });
    });

    describe('requestLease', () => {
      describe('given device operation result indicates success', () => {
        beforeEach(() => {
          commandResult = {
            IsSuccessful: true,
            Outcome: DeviceOperationOutcome.Successful,
            OutcomeText: ''
          };
        });

        describe('and lease granted event', () => {
          it('should return true', (done) => {
            service.requestLease(5).subscribe(x => {
              expect(x).toBeTruthy();
              done();
            });
            coreEventConnectionService.deviceLeaseGrantedSubject.next({
              DeviceId: 8,
              RequestId: requestCorrelationId,
            });
          });
        });

        describe('and lease denied event', () => {
          it('should return false', (done) => {
            service.requestLease(5).subscribe(x => {
              expect(x).toBeFalsy();
              done();
            });
            coreEventConnectionService.deviceLeaseDeniedSubject.next({
              DeviceId: 8,
              RequestId: requestCorrelationId,
            });
          });
        });
      });
    });
  })
});
