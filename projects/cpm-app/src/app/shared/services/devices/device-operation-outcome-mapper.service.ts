import { Injectable } from '@angular/core';
import { DeviceOperationOutcome } from '../../enums/device-operation-outcome';
import { DeviceLocationAccessResult } from '../../enums/device-location-access-result';

@Injectable({
  providedIn: 'root'
})
export class DeviceOperationOutcomeMapperService {

  constructor() { }

  mapOutcomeToAccessResult(outcome: DeviceOperationOutcome): DeviceLocationAccessResult {
    if(outcome === DeviceOperationOutcome.DeviceOfflineOrNotFound){
      return DeviceLocationAccessResult.DeviceNotOnline;
    }

    if(outcome === DeviceOperationOutcome.DeviceInactive){
      return DeviceLocationAccessResult.DeviceInactive;
    }

    if(outcome === DeviceOperationOutcome.DeviceNotLeasedToClient){
      return DeviceLocationAccessResult.LeaseNotAvailable;
    }

    return DeviceLocationAccessResult.Failed;
  }
}
