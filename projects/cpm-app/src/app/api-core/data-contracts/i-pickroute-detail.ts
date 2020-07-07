import { IDeviceSequenceOrder } from './i-device-sequenceorder';

export interface IPickRouteDetail {
    Id: number;
    Description: string;
    PickRouteGuid: string;
    DeviceSequence: IDeviceSequenceOrder[];
    AssignedPriorities: string[];
    IsDefault: boolean;
}
