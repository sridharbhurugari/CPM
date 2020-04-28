import { TestBed } from '@angular/core/testing';

import { DeviceLeaseService } from './device-lease.service';
import { CoreEventConnectionService } from '../../../api-core/services/core-event-connection.service';
import { HardwareLeaseService } from '../../../api-core/services/hardware-lease-service';
import { Subject } from 'rxjs';
import { IDeviceLeaseDeniedEvent } from '../../../api-core/events/i-device-lease-denied-event';
import { IDeviceLeaseGrantedEvent } from '../../../api-core/events/i-device-lease-granted-event';

describe('DeviceLeaseService', () => {
  beforeEach(() => {
    var coreEventConnectionService: Partial<CoreEventConnectionService> = {
      deviceLeaseGrantedSubject: new Subject<IDeviceLeaseGrantedEvent>(),
      deviceLeaseDeniedSubject: new Subject<IDeviceLeaseDeniedEvent>(),
    };
    TestBed.configureTestingModule({
      providers: [
        { provide: HardwareLeaseService, useValue: {} },
        { provide: CoreEventConnectionService, useValue: coreEventConnectionService },
      ]
    })
  });

  it('should be created', () => {
    const service: DeviceLeaseService = TestBed.get(DeviceLeaseService);
    expect(service).toBeTruthy();
  });
});
