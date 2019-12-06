import { IGuidedDeviceList } from '../../api-core/data-contracts/i-guided-device-list';

export class GuidedDeviceList implements IGuidedDeviceList {
  constructor(guidedDeviceList: IGuidedDeviceList){
    Object.assign(this, guidedDeviceList);

    this.ContainsExpiredItem = this.EarliestExpirationDateInDevice >= new Date;
  }

  DeviceId: number;
  DeviceDescription: string;
  NumberOfLocationsWithOutdatedCycleCount: number;
  NumberOfLocationsExpiringSoon: number;
  EarliestExpirationDateInDevice: Date;

  ContainsExpiredItem: boolean;
}
