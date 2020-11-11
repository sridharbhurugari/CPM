import { Injectable, OnDestroy } from '@angular/core';
import { IDeviceLocationAccessService } from './i-device-location-access-service';
import { DeviceLocationTypeId } from '../../constants/device-location-type-id';
import { IDeviceLocationAccessData } from '../../model/i-device-location-access-data';
import { CarouselCommandsService } from '../../../api-core/services/carousel-commands.service';
import { Guid } from 'guid-typescript';
import { IDeviceLocationAccessDisplayData } from '../../model/i-device-location-access-display-data';
import { IDeviceOperationResult } from '../../../api-core/data-contracts/i-device-operation-result';
import { Observable, Subject, ReplaySubject } from 'rxjs';
import { IDeviceOperationResultEvent } from '../../../api-core/events/i-device-operation-result-event';
import { DeviceLocationAccessResult } from '../../enums/device-location-access-result';
import { CoreEventConnectionService } from '../../../api-core/services/core-event-connection.service';
import { flatMap, takeUntil } from 'rxjs/operators';
import { DeviceOperationOutcomeMapperService } from './device-operation-outcome-mapper.service';

@Injectable({
  providedIn: 'root'
})
export class CarouselLocationAccessService implements IDeviceLocationAccessService, OnDestroy {
  private _deviceOperationResultSubjects: Record<string, ReplaySubject<DeviceLocationAccessResult>> = {};

  deviceLocationTypeId: string = DeviceLocationTypeId.Carousel;

  ngUnsubscribe = new Subject();

  constructor(
    private carouselCommandsService: CarouselCommandsService,
    private coreEventConnectionService: CoreEventConnectionService,
    private deviceOperationOutcomeMapperService: DeviceOperationOutcomeMapperService,
  ) {
    this.coreEventConnectionService.deviceOperationResultEventSubject
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(x => this.handleDeviceOperationResultEvent(x));
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  accessLocation(deviceLocation: IDeviceLocationAccessData, carouselDisplay: IDeviceLocationAccessDisplayData): Observable<DeviceLocationAccessResult> {
    return this.coreEventConnectionService.startedSubject
      .pipe(flatMap(x => this.accessLocationConnected(deviceLocation, carouselDisplay)), takeUntil(this.ngUnsubscribe));
  }

  moveToShelf(deviceId: number, shelfNumber: number): Observable<DeviceLocationAccessResult> {
    return this.coreEventConnectionService.startedSubject
      .pipe(flatMap(x => this.moveToShelfConnected(deviceId, shelfNumber)), takeUntil(this.ngUnsubscribe));
  }

  clearLightbar(deviceId: number): Observable<DeviceLocationAccessResult> {
    return this.coreEventConnectionService.startedSubject
      .pipe(flatMap(x => this.clearLightbarConnected(deviceId)), takeUntil(this.ngUnsubscribe));
  }

  displayLocationLightbar(deviceLocation: IDeviceLocationAccessData, carouselDisplay: IDeviceLocationAccessDisplayData): Observable<DeviceLocationAccessResult> {
    return this.coreEventConnectionService.startedSubject
      .pipe(flatMap(x => this.displayLocationLightbarConnected(deviceLocation, carouselDisplay)), takeUntil(this.ngUnsubscribe), );
  }

  private accessLocationConnected(deviceLocation: IDeviceLocationAccessData, carouselDisplay: IDeviceLocationAccessDisplayData): Observable<DeviceLocationAccessResult> {
    this.clearLightbar(deviceLocation.deviceId).subscribe(x => {
      this.displayLocationLightbar(deviceLocation, carouselDisplay).subscribe();
    });
    return this.moveToShelf(deviceLocation.deviceId, deviceLocation.shelfNumber);
  }

  private moveToShelfConnected(deviceId: number, shelfNumber: number): Observable<DeviceLocationAccessResult> {
    let requestCorrelationId = Guid.create();
    let resultSubject = new ReplaySubject<DeviceLocationAccessResult>(1);
    this._deviceOperationResultSubjects[requestCorrelationId.toString()] = resultSubject;
    let deviceOperationResult$ = this.carouselCommandsService.moveToShelf(requestCorrelationId, deviceId, shelfNumber);
    deviceOperationResult$.subscribe((x => this.checkDeviceOperationResult(x, requestCorrelationId)));
    return resultSubject;
  }

  private clearLightbarConnected(deviceId: number): Observable<DeviceLocationAccessResult> {
    let requestCorrelationId = Guid.create();
    let resultSubject = new ReplaySubject<DeviceLocationAccessResult>(1);
    this._deviceOperationResultSubjects[requestCorrelationId.toString()] = resultSubject;
    let deviceOperationResult$ = this.carouselCommandsService.clearLightbar(requestCorrelationId, deviceId);
    deviceOperationResult$.subscribe(x => this.checkDeviceOperationResult(x, requestCorrelationId));
    return resultSubject;
  }

  private displayLocationLightbarConnected(deviceLocation: IDeviceLocationAccessData, carouselDisplay: IDeviceLocationAccessDisplayData): Observable<DeviceLocationAccessResult> {
    let requestCorrelationId = Guid.create();
    let resultSubject = new ReplaySubject<DeviceLocationAccessResult>(1);
    this._deviceOperationResultSubjects[requestCorrelationId.toString()] = resultSubject;
    let deviceOperationResult$ = this.carouselCommandsService.displayLightbar(requestCorrelationId, deviceLocation.deviceId, deviceLocation.binNumber, deviceLocation.slotNumber, carouselDisplay.itemDescription, carouselDisplay.itemQuantity, carouselDisplay.itemUnits);
    deviceOperationResult$.subscribe(x => this.checkDeviceOperationResult(x, requestCorrelationId));
    return resultSubject;
  }

  private checkDeviceOperationResult(deviceOperationResult: IDeviceOperationResult, requestCorrelationId: Guid) {
    if (!deviceOperationResult.IsSuccessful) {
      let result = this.deviceOperationOutcomeMapperService.mapOutcomeToAccessResult(deviceOperationResult.Outcome);
      let subject = this.popRequestSubject(requestCorrelationId.toString());
      subject.next(result);
    }
  }

  private handleDeviceOperationResultEvent(event: IDeviceOperationResultEvent) {
    let subject = this.popRequestSubject(event.ResultId.toString());
    if(!subject){
      return;
    }

    if(event.IsSuccessful){
      subject.next(DeviceLocationAccessResult.Succeeded);
      return;
    }

    if(event.IsExpired){
      subject.next(DeviceLocationAccessResult.Expired);
      return;
    }

    subject.next(DeviceLocationAccessResult.Failed);
  }

  private popRequestSubject(requestId: string): Subject<DeviceLocationAccessResult> {
    let subject = this._deviceOperationResultSubjects[requestId];
    if(!subject){
      return;
    }
    delete this._deviceOperationResultSubjects[requestId];

    return subject;
  }
}
