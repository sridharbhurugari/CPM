export interface IGuidedCycleCount {    
  DeviceLocationId: number,
  ItemId: string,
  BrandNameFormatted: string,
  GenericNameFormatted: string,
  ParLevel: number,
  ReorderLevel: number,
  ExpirationDate: Date,
  ExpirationDateFormatted: string,
  LocationDescription: string,
  QuantityOnHand: number,
  ReorderSource: string,
}