import { Guid } from 'guid-typescript';

export interface IXr2VerificationOrder {
  Id: Guid;
  OrderId: Guid;
  PriorityCode: string;
  PriorityCodeColor: string;
  PriorityCodeDescription: string;
  SequenceOrder: number;
  CompleteVerifications: number;
  TotalVerifications: number;
  RequiredVerificationPercentage: number;
  CompleteExceptions: number;
  RequiredExceptions: number;
  Date: string;
}
