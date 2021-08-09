import { IXr2StorageCapacityDisplay } from '../../api-xr2/data-contracts/i-xr2-storage-capacity-display';

export class Xr2StorageCapacityDisplay implements IXr2StorageCapacityDisplay {

  constructor(xr2StorageCapacityDisplay: Xr2StorageCapacityDisplay) {
    Object.assign(this, xr2StorageCapacityDisplay);
  }
  DeviceId: number;
  PocketTypeId: string;
  PocketTypeDefinition: string;
  PercentageUsed: number;
  PocketsRemaining: number;
  PocketInventoryCount: number;
  IsOverStock: boolean;
}
