import { IDeviceLocationAccessData } from '../../model/i-device-location-access-data';
import { IDeviceLocationAccessDisplayData } from '../../model/i-device-location-access-display-data';
import { Observable } from 'rxjs';
import { DeviceLocationAccessResult } from '../../enums/device-location-access-result';

export interface IDeviceLocationAccessService {

  deviceLocationTypeId: string;

  accessLocation(deviceLocation: IDeviceLocationAccessData, displayData: IDeviceLocationAccessDisplayData): Observable<DeviceLocationAccessResult>;
}
