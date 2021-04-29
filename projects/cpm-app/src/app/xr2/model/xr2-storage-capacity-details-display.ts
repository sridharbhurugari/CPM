import { IXr2StorageCapacityDisplay } from '../../api-xr2/data-contracts/i-xr2-storage-capacity-display';

export class Xr2StorageCapacityDetailsDisplay {

  constructor(xr2StorageCapacityDisplay: Xr2StorageCapacityDetailsDisplay) {
    Object.assign(this, xr2StorageCapacityDisplay);
  }
  ItemId: string;
  ItemDescription: string;
  TrayTypeQoh: number;
  TotalXr2Qoh: number;
  Overstock: string;
  Packsize: string;
}
