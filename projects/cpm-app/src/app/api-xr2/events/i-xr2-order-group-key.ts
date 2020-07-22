import { Guid } from 'guid-typescript';

export interface IXr2OrderGroupKey {
    OrderId: string;
    OrderGroupDestinationId: string;
    DeviceLocationId: number;
    RobotPickGroupId: Guid;
}