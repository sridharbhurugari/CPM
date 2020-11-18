import { Guid } from 'guid-typescript';
import { IItemPicklistLine } from './i-item-picklist-line';


export interface IReleaseablePicklistQueueItem {
  OrderId: string;
  OrderGroupDestinationId: string;
  PicklistId: string;
  ItemPicklistLines: Array<IItemPicklistLine>;
  DeviceId: number;
  DeviceLocationId: number;
  RobotPickGroupId: Guid;
}
