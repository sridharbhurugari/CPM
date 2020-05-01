import { TestBed } from '@angular/core/testing';

import { CarouselLocationAccessService } from './carousel-location-access.service';
import { CarouselCommandsService } from '../../../api-core/services/carousel-commands.service';
import { CoreEventConnectionService } from '../../../api-core/services/core-event-connection.service';
import { Subject, ReplaySubject, of } from 'rxjs';
import { IDeviceOperationResultEvent } from '../../../api-core/events/i-device-operation-result-event';
import { DeviceOperationOutcome } from '../../enums/device-operation-outcome';
import { IDeviceOperationResult } from '../../../api-core/data-contracts/i-device-operation-result';
import { DeviceOperationOutcomeMapperService } from './device-operation-outcome-mapper.service';
import { DeviceLocationAccessResult } from '../../enums/device-location-access-result';
import { Guid } from 'guid-typescript';
import { shareReplay } from 'rxjs/operators';

describe('CarouselLocationAccessService', () => {
  let coreEventConnectionService: Partial<CoreEventConnectionService>;
  let carouselCommandsService: Partial<CarouselCommandsService>;
  let deviceOperationOutcomeMapperService: Partial<DeviceOperationOutcomeMapperService>;
  let service: CarouselLocationAccessService;
  let commandResult: IDeviceOperationResult;
  let mappedAccessResult: DeviceLocationAccessResult;
  let requestCorrelationId: Guid;
  beforeEach(() => {
    coreEventConnectionService = {
      startedSubject: new ReplaySubject(),
      deviceOperationResultEventSubject: new Subject<IDeviceOperationResultEvent>(),
    };
    let carouselCommandsServiceMock = { 
      moveToShelf: (x) => {
        requestCorrelationId = x;
        return of(commandResult)
      },
      clearLightbar: (x) => {
        requestCorrelationId = x;
        return of(commandResult)
      },
      displayLightbar: (x) => {
        requestCorrelationId = x;
        return of(commandResult)
      },
    };
    deviceOperationOutcomeMapperService = { 
      mapOutcomeToAccessResult: () => mappedAccessResult
    };
    TestBed.configureTestingModule({
      providers: [
        { provide: CarouselCommandsService, useValue: carouselCommandsServiceMock },
        { provide: CoreEventConnectionService, useValue: coreEventConnectionService },
        { provide: DeviceOperationOutcomeMapperService, useValue: deviceOperationOutcomeMapperService },
      ]
    })
    carouselCommandsService = TestBed.get(CarouselCommandsService);
    service = TestBed.get(CarouselLocationAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('given event connection started', () => {
    beforeEach(() => {
      coreEventConnectionService.startedSubject.next();
    });

    describe('moveToShelf', () => {
      describe('given device operation result indicates failure', () => {
        beforeEach(() => {
          commandResult = {
            IsSuccessful: false,
            Outcome: DeviceOperationOutcome.DeviceOfflineOrNotFound,
            OutcomeText: ''
          };
          mappedAccessResult = DeviceLocationAccessResult.LeaseNotAvailable;
        });

        it('should return result from DeviceOperationOutcomeMapperService', (done) => {
          service.moveToShelf(5, 2).subscribe(x => {
            expect(x).toBe(mappedAccessResult);
            done();
          });
        });
      });
      describe('given device operation result indicates success', () => {
        beforeEach(() => {
          commandResult = {
            IsSuccessful: true,
            Outcome: DeviceOperationOutcome.Successful,
            OutcomeText: ''
          };
        });
        describe('and device oepration result event IsSuccessful true', () => {
          it('should return success', (done) => {
            let moveResult$ = service.moveToShelf(5, 2);
            moveResult$.subscribe(x => {
              expect(x).toBe(DeviceLocationAccessResult.Succeeded);
              done();
            });
            coreEventConnectionService.deviceOperationResultEventSubject.next({
              DeviceId: 8,
              IsExpired: false,
              IsSuccessful: true,
              ResultId: requestCorrelationId
            })
          });
        });
        describe('and device oepration result event IsSuccessful false', () => {
          it('should return failure', (done) => {
            let moveResult$ = service.moveToShelf(5, 2);
            moveResult$.subscribe(x => {
              expect(x).toBe(DeviceLocationAccessResult.Failed);
              done();
            });
            coreEventConnectionService.deviceOperationResultEventSubject.next({
              DeviceId: 8,
              IsExpired: false,
              IsSuccessful: false,
              ResultId: requestCorrelationId
            })
          });
        });
      });
    });

    describe('clearLightbar', () => {
      describe('given device operation result indicates failure', () => {
        beforeEach(() => {
          commandResult = {
            IsSuccessful: false,
            Outcome: DeviceOperationOutcome.DeviceOfflineOrNotFound,
            OutcomeText: ''
          };
          mappedAccessResult = DeviceLocationAccessResult.LeaseNotAvailable;
        });

        it('should return result from DeviceOperationOutcomeMapperService', (done) => {
          service.clearLightbar(5).subscribe(x => {
            expect(x).toBe(mappedAccessResult);
            done();
          });
        });
      });
      describe('given device operation result indicates success', () => {
        beforeEach(() => {
          commandResult = {
            IsSuccessful: true,
            Outcome: DeviceOperationOutcome.Successful,
            OutcomeText: ''
          };
        });
        describe('and device oepration result event IsSuccessful true', () => {
          it('should return success', (done) => {
            let moveResult$ = service.clearLightbar(5);
            moveResult$.subscribe(x => {
              expect(x).toBe(DeviceLocationAccessResult.Succeeded);
              done();
            });
            coreEventConnectionService.deviceOperationResultEventSubject.next({
              DeviceId: 8,
              IsExpired: false,
              IsSuccessful: true,
              ResultId: requestCorrelationId
            })
          });
        });
        describe('and device oepration result event IsSuccessful false', () => {
          it('should return failure', (done) => {
            let moveResult$ = service.clearLightbar(5);
            moveResult$.subscribe(x => {
              expect(x).toBe(DeviceLocationAccessResult.Failed);
              done();
            });
            coreEventConnectionService.deviceOperationResultEventSubject.next({
              DeviceId: 8,
              IsExpired: false,
              IsSuccessful: false,
              ResultId: requestCorrelationId
            })
          });
        });
      });
    });

    describe('displayLocationLightbar', () => {
      describe('given device operation result indicates failure', () => {
        beforeEach(() => {
          commandResult = {
            IsSuccessful: false,
            Outcome: DeviceOperationOutcome.DeviceOfflineOrNotFound,
            OutcomeText: ''
          };
          mappedAccessResult = DeviceLocationAccessResult.LeaseNotAvailable;
        });

        it('should return result from DeviceOperationOutcomeMapperService', (done) => {
          let deviceLocation: any = {};
          let itemDisplay: any = {};
          service.displayLocationLightbar(deviceLocation, itemDisplay).subscribe(x => {
            expect(x).toBe(mappedAccessResult);
            done();
          });
        });
      });
      describe('given device operation result indicates success', () => {
        beforeEach(() => {
          commandResult = {
            IsSuccessful: true,
            Outcome: DeviceOperationOutcome.Successful,
            OutcomeText: ''
          };
        });
        describe('and device oepration result event IsSuccessful true', () => {
          it('should return success', (done) => {
            let deviceLocation: any = {};
            let itemDisplay: any = {};
            let result$ = service.displayLocationLightbar(deviceLocation, itemDisplay);
            result$.subscribe(x => {
              expect(x).toBe(DeviceLocationAccessResult.Succeeded);
              done();
            });
            coreEventConnectionService.deviceOperationResultEventSubject.next({
              DeviceId: 8,
              IsExpired: false,
              IsSuccessful: true,
              ResultId: requestCorrelationId
            })
          });
        });
        describe('and device oepration result event IsSuccessful false', () => {
          it('should return failure', (done) => {
            let deviceLocation: any = {};
            let itemDisplay: any = {};
            let result$ = service.displayLocationLightbar(deviceLocation, itemDisplay)
            result$.subscribe(x => {
              expect(x).toBe(DeviceLocationAccessResult.Failed);
              done();
            });
            coreEventConnectionService.deviceOperationResultEventSubject.next({
              DeviceId: 8,
              IsExpired: false,
              IsSuccessful: false,
              ResultId: requestCorrelationId
            })
          });
        });
      });
    });
  });

  describe('given event connection not started', () => {
    describe('moveCarousel', () => {
      it('should not call carousel command service until event connection is started', (done) => {
        commandResult = {
          IsSuccessful: true,
          Outcome: DeviceOperationOutcome.Successful,
          OutcomeText: ''
        };
        spyOn(carouselCommandsService, 'moveToShelf').and.callThrough();
        let result$ = service.moveToShelf(5, 2).pipe(shareReplay(1));
        result$.subscribe();
        expect(carouselCommandsService.moveToShelf).not.toHaveBeenCalled();
        coreEventConnectionService.startedSubject.next();
        result$.subscribe(x => {
          expect(carouselCommandsService.moveToShelf).toHaveBeenCalled();
          done();
        })
        coreEventConnectionService.deviceOperationResultEventSubject.next({
          DeviceId: 8,
          IsExpired: false,
          IsSuccessful: true,
          ResultId: requestCorrelationId
        });
      })
    });
  });

  describe('given event for un-tracked request', () => {
    it('should not throw exception', () => {
      coreEventConnectionService.deviceOperationResultEventSubject.next({
        DeviceId: 8,
        IsExpired: false,
        IsSuccessful: true,
        ResultId: Guid.create()
      });
    });
  });
});
