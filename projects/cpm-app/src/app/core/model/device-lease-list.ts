import { IDeviceLeaseList } from '../../api-core/data-contracts/i-device-lease-list';

export class DeviceLeaseList implements IDeviceLeaseList {
  constructor(deviceLeaseList: IDeviceLeaseList) {
    Object.assign(this, deviceLeaseList);
  }
    DeviceId: number;
    DeviceDescription: string;
    DeviceOwner: string;
}

