export interface IGuidedCycleCountUpdate{
  DeviceLocationId: number,
  ItemId: string,
  ExpirationDate: Date,
  QuantityOnHand: number,
  BarCodeFormat: string,
  ProductID:string
  OriginalQuantityOnHand: number;
  OriginalExpirationDate: Date;
}
