import { Guid } from 'guid-typescript';

export interface IVerifiableItem {
  DestinationId: string
  DestinationType: string;
  ItemId: string;
  OrderId: string;
  MedOrderId: string
  PicklistLineId: Guid;
  FillDate: Date;
  VerifiedStatus: string;
  RejectReason: string;
}
