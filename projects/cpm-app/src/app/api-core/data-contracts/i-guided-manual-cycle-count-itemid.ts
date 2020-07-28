export interface IGuidedManualCycleCountItemid {
  SlotNumber: number;
  BinNumber: number;
  ShelfNumber: number;
  DeviceLocationTypeId: string;
  DeviceId: number;
  DosageForm:string;
  DeviceDescription: string;
  DeviceLocationId: number;
  ItemId: string;
  GenericNameFormatted: string;
  BrandNameFormatted: string;
  Units: string;
  ParLevel: number;
  ReorderLevel: number;
  ExpirationDate: Date;
  ExpirationDateFormatted: string;
  LocationDescription: string;
  QuantityOnHand: number;
  ReorderSource: string;
  ItmExpDateGranularity: string;
  QuantityMin: number;
  InStockQuantity: number;
  ItemDateFormat: string;
  PackageFormType: string;
  PackageFormName: string;
  DrugId: string;
  ManufacturerName: string;
}
