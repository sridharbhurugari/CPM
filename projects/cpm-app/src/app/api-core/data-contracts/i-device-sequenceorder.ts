import { OutputDevice } from '../../api-xr2/data-contracts/output-device';

export interface IDeviceSequenceOrder {
  SequenceOrder: number;
  DeviceId: number;
  DeviceDescription: string;
  DeviceType: string;
  OutputDevices: OutputDevice[];
}
