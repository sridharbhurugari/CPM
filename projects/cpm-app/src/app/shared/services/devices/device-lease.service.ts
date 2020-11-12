import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, of, ReplaySubject } from 'rxjs';
import { HardwareLeaseService } from '../../../api-core/services/hardware-lease-service';
import { IDeviceOperationResult } from '../../../api-core/data-contracts/i-device-operation-result';
import { CoreEventConnectionService } from '../../../api-core/services/core-event-connection.service';
import { Guid } from 'guid-typescript';
import { IDeviceLeaseGrantedEvent } from '../../../api-core/events/i-device-lease-granted-event';
import { IDeviceLeaseDeniedEvent } from '../../../api-core/events/i-device-lease-denied-event';
import { flatMap, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DeviceLeaseService implements OnDestroy {
  private _deviceLeaseRequestSubjects: Record<string, ReplaySubject<boolean>> = {};

  public ngUnsubscribe = new Subject();

  constructor(
    private hardwareLeaseService: HardwareLeaseService,
    private coreEventConnectionService: CoreEventConnectionService,
  ) {
    this.coreEventConnectionService.deviceLeaseGrantedSubject
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(x => this.handleGrantedEvent(x));
    this.coreEventConnectionService.deviceLeaseDeniedSubject
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(x => this.handleDeniedEvent(x));
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  requestLease(deviceId: number): Observable<boolean> {
    return this.coreEventConnectionService.startedSubject.
      pipe(flatMap(x => this.requestLeaseConnected(deviceId)), takeUntil(this.ngUnsubscribe));
  }

  private requestLeaseConnected(deviceId: number): Observable<boolean> {
    let requestCorrelationId = Guid.create();
    let resultSubject = new ReplaySubject<boolean>(1);
    this._deviceLeaseRequestSubjects[requestCorrelationId.toString()] = resultSubject;
    this.hardwareLeaseService.RequestDeviceLeaseCorrelate(requestCorrelationId, deviceId).subscribe(x => this.checkDeviceOperationResult(x, requestCorrelationId));
    return resultSubject;
  }

  private checkDeviceOperationResult(deviceOperationResult: IDeviceOperationResult, requestCorrelationId: Guid) {
    if(!deviceOperationResult.IsSuccessful){
      this.popRequestSubject(requestCorrelationId.toString()).next(false);
    }
  }

  private handleGrantedEvent(event: IDeviceLeaseGrantedEvent) {
    const requestId = event.RequestId.toString();
    let requestSubject = this.popRequestSubject(requestId);
    if(!requestSubject){
      return;
    }

    requestSubject.next(true);
  }

  private handleDeniedEvent(event: IDeviceLeaseDeniedEvent) {
    const requestId = event.RequestId.toString();
    let requestSubject = this.popRequestSubject(requestId);
    if(!requestSubject){
      return;
    }

    requestSubject.next(false);
  }

  private popRequestSubject(requestId: string): Subject<boolean> {
    let subject = this._deviceLeaseRequestSubjects[requestId];
    if(!subject){
      return;
    }
    delete this._deviceLeaseRequestSubjects[requestId];

    return subject;
  }
}
