import { IDeviceLocationAccessComponentData } from './i-device-location-access-component-data';

export interface IItemHeaderInfo extends IDeviceLocationAccessComponentData {
    ItemId: string;
    DeviceDescription: string;
    LocationDescription: string;
}