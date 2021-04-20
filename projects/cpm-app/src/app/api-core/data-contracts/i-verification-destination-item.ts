import { Guid } from 'guid-typescript';

export interface IVerificationDestinationItem {

  Id: Guid;
  OrderId: string;
  DestinationId: string;
  DestinationType: string;
  DestinationLine1: string;
  DestinationLine2: string;
  CompleteVerifications: number;
  TotalVerifications: number;
  CompleteExceptions: number;
  RequiredExceptions: number;
  CompleteOutputDevice: number;
  RequiredOutputDevice: number;
  FillDateTime: Date;
}
