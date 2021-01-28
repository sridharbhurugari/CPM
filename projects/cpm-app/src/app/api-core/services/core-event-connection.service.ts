import { Injectable, OnDestroy } from '@angular/core';
import { Subject, ReplaySubject } from 'rxjs';
import { EventConnectionService } from '../../shared/services/event-connection.service';
import { IDeviceOperationResultEvent } from '../events/i-device-operation-result-event';
import { IDeviceLeaseDeniedEvent } from '../events/i-device-lease-denied-event';
import { IDeviceLeaseGrantedEvent } from '../events/i-device-lease-granted-event';
import { ICarouselFaultedEvent } from '../events/i-carousel.faulted-event';
import { ICarouselReadyEvent } from '../events/i-carousel-ready-event';
import { IRefreshDeviceNeedsEvent } from "../events/i-refresh-device-needs";
import { takeUntil } from 'rxjs/operators';
import { IHighPriorityInterrupt } from "../events/i-high-priority-interrupt";
import { EventEventId } from '../../shared/constants/event-event-id';

@Injectable({
  providedIn: 'root'
})
export class CoreEventConnectionService implements OnDestroy {
  public ocsIsHealthySubject = new Subject<boolean>();
  public deviceOperationResultEventSubject = new Subject<IDeviceOperationResultEvent>();
  public deviceLeaseGrantedSubject = new Subject<IDeviceLeaseGrantedEvent>();
  public deviceLeaseDeniedSubject = new Subject<IDeviceLeaseDeniedEvent>();
  public carouselFaultedSubject = new Subject<ICarouselFaultedEvent>();
  public carouselReadySubject = new Subject<ICarouselReadyEvent>();
  public refreshDeviceNeedsSubject = new Subject<IRefreshDeviceNeedsEvent>();
  public highPriorityInterruptSubject = new Subject<IHighPriorityInterrupt>();
  public ngUnsubscribe = new Subject();

  public startedSubject = new ReplaySubject(1);

  constructor(
    private eventConnectionService: EventConnectionService
    ) {
    this.eventConnectionService.receivedSubject
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(message => this.eventHandlers(message));
    this.eventConnectionService.startedSubject
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => this.startedSubject.next());
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private eventHandlers(message: any): void {
    try {
      if (message === undefined) {
        return;
      }

      if (message.EventId === undefined) {
        if (message.$type.includes(EventEventId.DeviceOperationResultEvent)) {
          this.deviceOperationResultEventSubject.next({
            DeviceId: message.DeviceId,
            IsExpired: message.IsExpired,
            IsSuccessful: message.IsSuccessful,
            ResultId: message.ResultId,
          });
        }

        if (message.$type.includes(EventEventId.HardwareLeaseGrantedEvent)) {
          this.deviceLeaseGrantedSubject.next({
            DeviceId: message.DeviceId,
            RequestId: message.RequestId,
          })
        }

        if (message.$type.includes(EventEventId.HardwareLeaseDeniedEvent)) {
          this.deviceLeaseDeniedSubject.next({
            DeviceId: message.DeviceId,
            RequestId: message.RequestId,
          })
        }

        if (message.$type.includes(EventEventId.CarouselIsReadyEvent)) {
          this.carouselReadySubject.next({ DeviceId: message.DeviceId });
        }

        if (message.$type.includes(EventEventId.CarouselFaultedEvent)) {
          this.carouselFaultedSubject.next({ DeviceId: message.DeviceId });
        }

        if (message.$type.includes(EventEventId.OcsAvailableEvent)) {
          this.ocsIsHealthySubject.next(true);
        }

        if (message.$type.includes(EventEventId.OcsUnavailableEvent)) {
          this.ocsIsHealthySubject.next(false);
        }

        if (message.$type.includes(EventEventId.RefreshDeviceNeeds)) {
          this.refreshDeviceNeedsSubject.next();
        }

        if (message.$type.includes(EventEventId.HighPriorityPickRequestEvent)) {
          this.highPriorityInterruptSubject.next();
        }

        return;
      }

      if (message.EventId === EventEventId.Ocs2Available) {
        this.ocsIsHealthySubject.next(true);
        return;
      }

      if (message.EventId === EventEventId.Ocs2Unavailable) {
        this.ocsIsHealthySubject.next(false);
        return;
      }

      if (message.EventId === EventEventId.DeviceOperationResultEvent) {
        this.deviceOperationResultEventSubject.next({
          DeviceId: message.DeviceId,
          IsExpired: message.IsExpired,
          IsSuccessful: message.IsSuccessful,
          ResultId: message.ResultId,
        });
      }

      if (message.EventId === EventEventId.HardwareLeaseGrantedEvent) {
        this.deviceLeaseGrantedSubject.next({
          DeviceId: message.DeviceId,
          RequestId: message.RequestId,
        });
      }

      if (message.EventId === EventEventId.HardwareLeaseDeniedEvent) {
        this.deviceLeaseDeniedSubject.next({
          DeviceId: message.DeviceId,
          RequestId: message.RequestId,
        });
      }

      if (message.EventId === EventEventId.CarouselIsReadyEvent) {
        this.carouselReadySubject.next({ DeviceId: message.DeviceId });
      }

      if (message.EventId === EventEventId.CarouselFaultedEvent) {
        this.carouselFaultedSubject.next({ DeviceId: message.DeviceId });
      }

      if (message.EventId === EventEventId.RefreshDeviceNeeds) {
        this.refreshDeviceNeedsSubject.next();
      }

      if (message.EventId === EventEventId.HighPriorityPickRequestEvent) {
        this.highPriorityInterruptSubject.next();
      }
    } catch (e) {
      console.log('CoreEventConnectionService.eventHandlers ERROR');
      console.log(e);
    }
  }
}
