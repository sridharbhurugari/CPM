import { IDeviceSequenceOrder } from './i-device-sequenceorder';

export interface IPickRouteDevice {
  PickRouteId: number;
  RouteDescription: string;
  PickRouteDevices: IDeviceSequenceOrder[];
}
