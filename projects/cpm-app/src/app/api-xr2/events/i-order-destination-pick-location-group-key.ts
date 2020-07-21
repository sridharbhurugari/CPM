import { Guid } from 'guid-typescript';

export interface IOrderDestinationPickLocationGroupKey {
    OrderId: string;
    DestinationId: string;
    DeviceLocationId: number;
    RobotPickGroupId: Guid;
}