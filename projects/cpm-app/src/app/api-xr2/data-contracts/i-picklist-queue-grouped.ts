import { OutputDevice } from './output-device';

export interface IPicklistQueueGrouped {
  PriorityCode: string;
  PriorityCodeColor: string;
  Destination: string;
  DestinationType: string;
  PriorityCodeDescription: string;
  DeviceDescription: string;
  DeviceId: number;
  AvailableOutputDeviceList: Array<OutputDevice>;
  OutputDeviceId: string;
  SequenceOrder: number;
  NewCount: number;
  ReleasedCount: number;
  AreaCount: number;
  DeviceLocationId: number;
}
