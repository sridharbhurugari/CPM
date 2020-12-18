export interface IXR2InventoryLists {
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
  FormattedPackSize: string;
  FormattedPackSizeMin: string;
  FormattedPackSizeMax: string;
  FormattedExpirationDate: string;
  OmniSiteID: string;
}
