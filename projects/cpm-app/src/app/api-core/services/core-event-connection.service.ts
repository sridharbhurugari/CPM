import { Injectable } from '@angular/core';
import { Subject, of, Observable } from 'rxjs';
import { EventConnectionService } from '../../xr2/services/event-connection.service';
import { ConfigurationService } from 'oal-core';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { HubConfigurationService } from '../../xr2/services/hub-configuration.service';
import { IDeviceOperationResultEvent } from '../events/i-device-operation-result-event';
import { IDeviceLeaseDeniedEvent } from '../events/i-device-lease-denied-event';
import { IDeviceLeaseGrantedEvent } from '../events/i-device-lease-granted-event';

@Injectable({
  providedIn: 'root'
})
export class CoreEventConnectionService extends EventConnectionService {
  public ocsIsHealthySubject = new Subject<boolean>();
  public deviceOperationResultEventSubject = new Subject<IDeviceOperationResultEvent>();
  public deviceLeaseGrantedSubject = new Subject<IDeviceLeaseGrantedEvent>();
  public deviceLeaseDeniedSubject = new Subject<IDeviceLeaseDeniedEvent>();

  constructor(
    hubConfigurationService: HubConfigurationService,
    configurationService: ConfigurationService,
    ocapUrlBuilderService: OcapUrlBuilderService
    ) {
    super(hubConfigurationService, configurationService, ocapUrlBuilderService);
   }

  public async openEventConnection(): Promise<void> {
    this.startUp();
    this.receivedSubject.subscribe(message => this.ocsStatusEventHandlers(message));
  }

  private ocsStatusEventHandlers(message: any): void {
    if (message === undefined) {
      return;
    }

    if (message.EventId === undefined) {
      return;
    }

    if (message.EventId === 'Ocs2Available') {
      this.ocsIsHealthySubject.next(true);
      return;
    }

    if (message.EventId === 'Ocs2Unavailable') {
      this.ocsIsHealthySubject.next(false);
      return;
    }

    if(message.EventId === 'DeviceOperationResultEvent') {
      this.deviceOperationResultEventSubject.next({
        DeviceId: message.DeviceId,
        IsExpired: message.IsExpired,
        IsSuccessful: message.IsSuccessful,
        ResultId: message.ResultId,
      });
    }

    if(message.EventId === 'HardwareLeaseGrantedEvent') {
      this.deviceLeaseGrantedSubject.next({
        DeviceId: message.DeviceId,
        RequestId: message.RequestId,
      })
    }

    if(message.EventId === 'HardwareLeaseDeniedEvent'){
      this.deviceLeaseDeniedSubject.next({
        DeviceId: message.DeviceId,
        RequestId: message.RequestId,
      })
    }
  }
}
