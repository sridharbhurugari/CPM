import { IXr2EventsItem } from '../../api-xr2/data-contracts/i-xr2-events-item';
import { IXr2DevicesList } from '../../api-xr2/data-contracts/i-xr2-devices-list';

export class Xr2DevicesList implements IXr2DevicesList {

  constructor(Xr2DevicesList: IXr2DevicesList) {
    Object.assign(this, Xr2DevicesList);
  }
  DeviceId: number;
  DeviceDescription: string;
}
