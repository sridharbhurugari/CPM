import { Guid } from 'guid-typescript';
import { IXr2VerificationOrder } from '../../api-xr2/data-contracts/i-xr2-verification-order-item';

export class Xr2VerificationOrder implements IXr2VerificationOrder {

  constructor(picklistQueueGrouped: IXr2VerificationOrder) {
    Object.assign(this, picklistQueueGrouped);
  }

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
