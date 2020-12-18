import { IXR2InventoryLists } from '../../api-core/data-contracts/i-xr2-inventory-lists';

export class XR2InventoryLists implements IXR2InventoryLists {

  constructor(xr2InventoryLists: IXR2InventoryLists) {
    Object.assign(this, xr2InventoryLists);
  }


  ItemId: string;
  FormattedGenericName: string;
  TradeName: string;
  QuantityOnHand: number;
  FormattedQuantityOnHand: string;
  DeviceLocationID: number;
  DeviceID: number;
  DeviceDescription: string;
  PackSize: number;
  PackSizeMin: number;
  PackSizeMax: number;
  UnitsOfIssue: string;
  TotalPacks: number;
  ExpirationDate: string;
  FormattedPackSize: string;
  FormattedPackSizeMin: string;
  FormattedPackSizeMax: string;
  FormattedExpirationDate: string;
  OmniSiteID: string;
}
