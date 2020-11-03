import { OutputDevice } from './output-device';
import { Guid } from 'guid-typescript';

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
  UnsentPickListLineIds: Array<Guid>;
  PickPriorityIdentity: number;
}
