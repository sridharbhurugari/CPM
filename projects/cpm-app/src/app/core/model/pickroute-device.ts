import { IPickRouteDevice } from '../../api-core/data-contracts/i-pickroute-device';
import { IDeviceSequenceOrder } from '../../api-core/data-contracts/i-device-sequenceorder';

export class PickRouteDevice implements IPickRouteDevice {
    constructor(pickRouteDevice: IPickRouteDevice, pickRouteId: number) {
        Object.assign(this, pickRouteDevice);

        this.SelectedFlag = pickRouteDevice.PickRouteId === pickRouteId;
   }

   PickRouteId: number;
   RouteDescription: string;
   PickRouteGuid: string;
   PickRouteDevices: IDeviceSequenceOrder[];

   SelectedFlag: boolean;
}
