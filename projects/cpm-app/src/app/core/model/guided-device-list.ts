import { IGuidedDeviceList } from '../../api-core/data-contracts/i-guided-device-list';

export class GuidedDeviceList implements IGuidedDeviceList {
  constructor(guidedDeviceList: IGuidedDeviceList){
    Object.assign(this, guidedDeviceList);

    if(this.EarliestExpirationDateInDevice != null){
      var now = new Date();
      var expired = new Date(this.EarliestExpirationDateInDevice);
      this.ContainsExpiredItem = expired.getTime() <= now.getTime();
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
