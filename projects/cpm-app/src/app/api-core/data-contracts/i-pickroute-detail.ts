import { IDeviceSequenceOrder } from './i-device-sequenceorder';

export interface IPickRouteDetail {
    Id: number;
    Description: string;
    DeviceSequence: IDeviceSequenceOrder[];
    AssignedPriorities: string[]
}