import { ISelectableDeviceInfo } from './i-selectable-device-info';
import { Guid } from 'guid-typescript';

export class SelectableDeviceInfo implements ISelectableDeviceInfo {

  constructor(deviceInfo?: Partial<SelectableDeviceInfo>) {
    Object.assign(this, deviceInfo);
  }

  DeviceId: number;
  Description: string;
  DefaultOwnerName: string;
  DeviceTypeId: string;
  CurrentLeaseHolder: Guid;
  IsActive: boolean;
}
