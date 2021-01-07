import { Guid } from 'guid-typescript';
import { IXr2VerificationOrderItem } from '../../api-xr2/data-contracts/i-xr2-verification-order-item';

export class Xr2VerificationOrderItem implements IXr2VerificationOrderItem {

  constructor(xr2VerficationItem: IXr2VerificationOrderItem) {
    Object.assign(this, xr2VerficationItem);
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
