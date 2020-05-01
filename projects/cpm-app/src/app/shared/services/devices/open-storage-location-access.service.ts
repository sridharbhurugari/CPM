import { Injectable } from '@angular/core';
import { IDeviceLocationAccessService } from './i-device-location-access-service';
import { DeviceLocationTypeId } from '../../constants/device-location-type-id';
import { IDeviceLocationAccessData } from '../../model/i-device-location-access-data';
import { IDeviceLocationAccessDisplayData } from '../../model/i-device-location-access-display-data';
import { Observable, of, forkJoin, merge, race } from 'rxjs';
import { DeviceLocationAccessResult } from '../../enums/device-location-access-result';
import { HardwareLeaseService } from '../../../api-core/services/hardware-lease-service';
import { map } from 'rxjs/operators';
import { LeaseVerificationResult } from '../../../api-core/data-contracts/lease-verification-result';

@Injectable({
  providedIn: 'root'
})
export class OpenStorageLocationAccessService implements IDeviceLocationAccessService {
  deviceLocationTypeId: string = DeviceLocationTypeId.OpenStorage;

  constructor(
    private hardwareLeaseService: HardwareLeaseService,
  ) { }

  accessLocation(deviceLocation: IDeviceLocationAccessData, displayData: IDeviceLocationAccessDisplayData): Observable<DeviceLocationAccessResult> {
    let hasLease$ = this.hardwareLeaseService.HasDeviceLease(deviceLocation.deviceId);
    return hasLease$.pipe(map(x => this.mapLeaseResult(x)));
  }

  mapLeaseResult(result: LeaseVerificationResult): DeviceLocationAccessResult {
    if(result === LeaseVerificationResult.Success){
      return DeviceLocationAccessResult.Succeeded;
    }

    return DeviceLocationAccessResult.LeaseNotAvailable;
  }
}
