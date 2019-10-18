export interface IUnderfilledPicklistLine{
  PriorityCode: string;
  PicklistTypeDb: string;
  ItemId: string;
  ItemFormattedGenericName: string;
  ItemBrandName: string
  PatientRoom: string;
  PatientName: string;
  AreaDescription: string;
  DestinationOmni: string;
  FillDate: Date
  FillQuantity: number;
  OrderQuantity: number;
  PickItemLocationDescription: string;
}