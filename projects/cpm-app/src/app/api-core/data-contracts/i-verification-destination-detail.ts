import { Guid } from 'guid-typescript';

export interface IVerificationDestinationDetail {

  Id: Guid;
  OrderId: string;
  DestinationId: string;
  DestinationType: string;
  DestinationLine1: string;
  DestinationLine2: string;
  ItemFormattedGenericName: string;
  ItemTradeName: string;
  UnitsOfIssue: string;
  ItemId: string;
  MedOrderId: string;
  RequestedQuantity: number;
  FillQuantity: number;
  FillDate: string;
  FillUserId: string;
  FillUserName: string;
  IsIssueScanRequired: boolean
  VerifiedStatus: string;
  VerifiedDate: string;
  Exception: boolean;
  ForcedOutputDeviceChecking: boolean
}
