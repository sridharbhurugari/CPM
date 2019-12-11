import { IGuidedDeviceList } from '../../api-core/data-contracts/i-guided-device-list';

export class GuidedDeviceList implements IGuidedDeviceList {
  constructor(guidedDeviceList: IGuidedDeviceList){
    Object.assign(this, guidedDeviceList);

    if(this.EarliestExpirationDateInDevice != null){
      this.ContainsExpiredItem = this.EarliestExpirationDateInDevice <= new Date;
    }
  }

  DeviceId: number;
  DeviceDescription: string;
  NumberOfLocationsWithOutdatedCycleCount: number;
  NumberOfLocationsExpiringSoon: number;
  EarliestExpirationDateInDevice: Date;
  DeviceDefaultOwner: string;

  ContainsExpiredItem: boolean;
}
