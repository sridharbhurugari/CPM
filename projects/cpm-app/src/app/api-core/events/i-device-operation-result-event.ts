import { Guid } from 'guid-typescript';

export interface IDeviceOperationResultEvent {
    ResultId: Guid;
    DeviceId: number;
    IsSuccessful: boolean;
    IsExpired: boolean;
}