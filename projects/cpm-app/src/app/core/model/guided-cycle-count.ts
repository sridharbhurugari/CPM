import { IGuidedCycleCount } from '../../api-core/data-contracts/i-guided-cycle-count';

export class GuidedCycleCount implements IGuidedCycleCount {

  constructor(guidedCycleCount: IGuidedCycleCount){
    Object.assign(this, guidedCycleCount);
  }


  DeviceLocationId: number;  
  ItemId: string;
  BrandNameFormatted: string;
  GenericNamdFormatted: string;
  ParLevel: number;
  ReorderLevel: number;
  ExpirationDate: Date;
  LocationDescription: string;
  QuantityOnHand: number;
  ReorderSource: string;
}
