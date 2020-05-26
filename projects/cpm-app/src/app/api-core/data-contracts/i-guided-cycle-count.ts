export interface IGuidedCycleCount {
  SlotNumber: number;
  BinNumber: number;
  ShelfNumber: number;
  DeviceLocationTypeId: string;
  DeviceId: number;    
  DeviceDescription: string;
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
  InStockQuantity: number,
  ItemDateFormat: string,
  DosageForm: string,
  SafetyStockRestockScan: string
}
