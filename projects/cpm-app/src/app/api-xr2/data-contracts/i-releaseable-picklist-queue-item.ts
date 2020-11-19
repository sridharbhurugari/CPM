import { Guid } from 'guid-typescript';


export interface IReleaseablePicklistQueueItem {
  OrderId: string;
  OrderGroupDestinationId: string;
  DeviceId: number;
  DeviceLocationId: number;
  RobotPickGroupId: Guid;
  OutputDeviceId: string;
}
