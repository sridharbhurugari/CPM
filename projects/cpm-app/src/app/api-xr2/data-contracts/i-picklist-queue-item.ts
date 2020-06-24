import { Guid } from 'guid-typescript';
import { IItemPicklistLine } from './i-item-picklist-line';
import { OutputDevice } from '../../api-xr2/data-contracts/output-device';

export interface IPicklistQueueItem {
  PicklistId: string;
  OrderId: string;
  DeviceLocationId: number;
  ItemPicklistLines: Array<IItemPicklistLine>;
  PriorityCode: string;
  PriorityCodeColor: string;
  Destination: string;
  DestinationId: string;
  DestinationType: string;
  PriorityCodeDescription: string;
  BoxCount: number;
  FilledBoxCount: number;
  Status: number;
  StatusDisplay: string;
  DeviceDescription: string;
  DeviceId: number;
  AvailableOutputDeviceList: Array<OutputDevice>;
  OutputDeviceId: string;
  ItemCount: number;
  IsPrintable: boolean;
}
