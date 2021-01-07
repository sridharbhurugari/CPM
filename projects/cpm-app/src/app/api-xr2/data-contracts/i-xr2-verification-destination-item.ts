import { Guid } from 'guid-typescript';

export interface IXr2VerificationDestinationItem {
  Id: Guid;
  DestinationId: Guid;
  SequenceOrder: number;
  Destination: String;
  CompleteVerifications: number;
  TotalVerifications: number;
  RequiredVerifications: number;
  CompleteExceptions: number;
  RequiredExceptions: number;
}
