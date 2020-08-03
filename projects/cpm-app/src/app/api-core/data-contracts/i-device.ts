import { OutputDevice } from '../../api-xr2/data-contracts/output-device';

export interface IDevice {
  Id: number;
  Description: string;
  DeviceType: string;
  OutputDevices: OutputDevice[]
}
