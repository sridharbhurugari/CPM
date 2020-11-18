import { Guid } from 'guid-typescript';
import { IItemPicklistLine } from './i-item-picklist-line';


export interface IReleaseablePicklistQueueItem {
  OrderId: string;
  OrderGroupDestinationId: string;
  DeviceId: number;
  DeviceLocationId: number;
  RobotPickGroupId: Guid;
  OutputDeviceId: string;
}
