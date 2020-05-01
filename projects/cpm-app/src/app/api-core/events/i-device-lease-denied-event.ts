import { Guid } from 'guid-typescript';

export interface IDeviceLeaseDeniedEvent {
    RequestId: Guid;
    DeviceId: number;
}