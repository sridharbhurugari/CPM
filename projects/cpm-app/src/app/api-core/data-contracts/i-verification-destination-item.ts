import { Guid } from 'guid-typescript';

export interface IVerificationDestinationItem {
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
