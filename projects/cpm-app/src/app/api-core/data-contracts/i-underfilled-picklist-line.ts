export interface IUnderfilledPicklistLine{
  PicklistLineId: string;
  DestinationId: string;
  DestinationType: string;
  PriorityCode: string;
  PicklistTypeDb: string;
  ItemId: string;
  ItemFormattedGenericName: string;
  ItemBrandName: string;
  PatientRoom: string;
  PatientName: string;
  AreaDescription: string;
  DestinationOmni: string;
  FillDate: Date;
  FillQuantity: number;
  OrderQuantity: number;
  PickItemLocationDescription: string;
  PharmacyQOH: number;
  UnfilledReason: string;
  ItemFoundInCPM: string;  // unknown item identifier
  ItemLocation: string; // unassigned item identifier
  InDeviceItem: string; // missing route
}
