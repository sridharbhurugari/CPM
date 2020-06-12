import { IGuidedCycleCountUpdate } from './i-guided-cycle-count-update';

export class deviceCycleCountItemUpdate implements IGuidedCycleCountUpdate {
  constructor(deviceCycleCountItemUpdate: IGuidedCycleCountUpdate){
    Object.assign(this, deviceCycleCountItemUpdate);
  }
  
  DeviceLocationId: number;
  ItemId: string;
  ExpirationDate: Date;
  QuantityOnHand: number;
  BarCodeFormat: string;
  ProductID: string;
}
