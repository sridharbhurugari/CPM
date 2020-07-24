import { OutputDevice } from '../../api-xr2/data-contracts/output-device';
import { DeviceOutput } from '../../api-xr2/data-contracts/device-output';

export interface IDeviceSequenceOrder {
  SequenceOrder: number;
  DeviceId: number;
  DeviceDescription: string;
  DeviceType: string;
  DeviceOutput: DeviceOutput;
  OutputDevices: OutputDevice[];  
}
