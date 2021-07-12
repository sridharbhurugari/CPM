export interface IPrepackVerificationQueueDetail {
  ItemId: string;
  DeviceId: number;
  ManufacturerName: string;
  ManufacturerLotNumber: string;
  ManufacturerExpirationDate: Date | string;
  PrepackLotNumber: string;
  PrepackExpirationDate: Date | string;
  DrugIdentifier: string;
  QuantityToPackage: number;
  DestinationDeviceLocationId: number | null;
  PackagedDate: Date | string;
  DestinationLocationDescription: string;
  GenericNameFormatted: string;
  BrandNameFormatted: string;
  UnitOfIssue: string;
  PackagedByUserId: string;
  PackagedByUsername: string;
}
