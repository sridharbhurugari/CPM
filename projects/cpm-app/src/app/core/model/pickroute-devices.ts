import { IPickRouteDevices } from '../../api-core/data-contracts/i-pickroute-devices';
import { IDeviceSequenceOrder } from '../../api-core/data-contracts/i-device-sequenceorder';

export class PickRouteDevices implements IPickRouteDevices {
    constructor(pickRouteDevices: IPickRouteDevices, pickRouteId: number) {
        Object.assign(this, pickRouteDevices);

        this.SelectedFlag = pickRouteDevices.PickRouteId === pickRouteId;
   }

   PickRouteId: number;
   RouteDescription: string;
   PickRouteDevices: IDeviceSequenceOrder[];

   SelectedFlag: boolean;
}
