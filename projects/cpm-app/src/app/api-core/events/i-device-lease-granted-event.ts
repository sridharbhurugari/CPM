import { Guid } from 'guid-typescript';

export interface IDeviceLeaseGrantedEvent {
    RequestId: Guid;
    DeviceId: number;
}