export interface IGuidedCycleCount {    
  DeviceLocationId: number,
  ItemId: string,
  GenericNameFormatted: string,
  BrandNameFormatted: string,
  Units: string,
  ParLevel: number,
  ReorderLevel: number,
  ExpirationDate: Date,
  ExpirationDateFormatted: string,
  LocationDescription: string,
  QuantityOnHand: number,
  ReorderSource: string,
  ItmExpDateGranularity:string,
  QuantityMin: number,
  InStockQuantity: number;
  ItemDateFormat: string;
}
