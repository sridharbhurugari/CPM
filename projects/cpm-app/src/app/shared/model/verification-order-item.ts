import { Guid } from 'guid-typescript';
import { IVerificationOrderItem } from '../../api-core/data-contracts/i-verification-order-item';

export class VerificationOrderItem implements IVerificationOrderItem {

  constructor(verficationOrderItem: IVerificationOrderItem) {
    Object.assign(this, verficationOrderItem);
  }

  Id: Guid;
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
