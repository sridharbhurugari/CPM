import { IXR2InventoryLists } from '../../api-core/data-contracts/i-xr2-inventory-lists';

export class XR2InventoryLists implements IXR2InventoryLists {

  constructor(xr2InventoryLists: IXR2InventoryLists) {
    Object.assign(this, xr2InventoryLists);
  }

  ItemId: string;
  FormattedGenericName: string;
  TradeName: string;
  FormattedQuantityOnHand: string;
  DeviceLocationID: number;
  DeviceID: number;
  FormattedPackSize: string;
  FormattedPackSizeMin: string;
  FormattedPackSizeMax: string;
  DeviceDescription: string;
  ExpirationDate: string;
  OmniSiteID: string;
}
