import { IGuidedCycleCountUpdate } from '../../api-core/data-contracts/i-guided-cycle-count-update';

export class GuidedCycleCountUpdate implements IGuidedCycleCountUpdate {
  constructor(guidedCycleCountUpdate: IGuidedCycleCountUpdate){
    Object.assign(this, guidedCycleCountUpdate);
  }
  
  DeviceLocationId: number;
  ItemId: string;
  ExpirationData: Date;
  QuantityOnHand: number;
}
