import { IDeviceSequenceOrder } from './i-device-sequenceorder';

export class IPickRouteDevices {
  PickRouteId: number;
  RouteDescription: string;
  PickRouteDevices: IDeviceSequenceOrder[];
}
