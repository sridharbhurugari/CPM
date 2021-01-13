import { Guid } from 'guid-typescript';

export interface IVerificationOrderItem {
  OrderId: string;
  PriorityCode: string;
  PriorityCodeColor: string;
  PriorityCodeDescription: string;
  SequenceOrder: number;
  CompleteVerificationPercentage: number;
  RequiredVerificationPercentage: number;
  CompleteExceptions: number;
  RequiredExceptions: number;
  FillDate: Date;
}
