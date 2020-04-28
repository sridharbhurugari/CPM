import { Injectable } from '@angular/core';
import { Observable, Subject, of, ReplaySubject } from 'rxjs';
import { HardwareLeaseService } from '../../../api-core/services/hardware-lease-service';
import { IDeviceOperationResult } from '../../../api-core/data-contracts/i-device-operation-result';
import { CoreEventConnectionService } from '../../../api-core/services/core-event-connection.service';
import { Guid } from 'guid-typescript';
import { IDeviceLeaseGrantedEvent } from '../../../api-core/events/i-device-lease-granted-event';
import { IDeviceLeaseDeniedEvent } from '../../../api-core/events/i-device-lease-denied-event';
import { flatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DeviceLeaseService {
  private _deviceLeaseRequestSubjects: Record<string, ReplaySubject<boolean>> = {};

  constructor(
    private hardwareLeaseService: HardwareLeaseService,
    private coreEventConnectionService: CoreEventConnectionService,
  ) { 
    this.coreEventConnectionService.deviceLeaseGrantedSubject.subscribe(x => this.handleGrantedEvent(x));
    this.coreEventConnectionService.deviceLeaseDeniedSubject.subscribe(x => this.handleDeniedEvent(x));
  }

  requestLease(deviceId: number): Observable<boolean> {
    return this.coreEventConnectionService.startedSubject.pipe(flatMap(x => this.requestLeaseConnected(deviceId)));
  }

  requestLeaseConnected(deviceId: number): Observable<boolean> {
    let requestCorrelationId = Guid.create();
    let resultSubject = new ReplaySubject<boolean>(1);
    this._deviceLeaseRequestSubjects[requestCorrelationId.toString()] = resultSubject;
    this.hardwareLeaseService.RequestDeviceLease(requestCorrelationId, deviceId).subscribe(x => this.checkDeviceOperationResult(x, requestCorrelationId));
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
