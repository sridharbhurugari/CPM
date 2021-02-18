import { Guid } from 'guid-typescript';

export interface IVerificationDestinationDetail {

  Id: Guid;
  OrderId: string;
  PicklistLineId: Guid;
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
  FillDate: Date;
  FillUserId: string;
  FillUserName: string;
  IsIssueScanRequired: boolean;
  VerifiedStatus: string;
  VerifiedDate: Date;
  Exception: boolean;
  HasOutputDeviceVerification: boolean;
  DeviceDescription: string;
  OutputDevice: string;
  PriorityDescription: string;
  IsSafetyStockItem: boolean;
}
