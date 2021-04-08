import { Guid } from 'guid-typescript';
import { IVerificationOrderItem } from '../../api-core/data-contracts/i-verification-order-item';

export class VerificationOrderItem implements IVerificationOrderItem {

  constructor(verficationOrderItem: IVerificationOrderItem) {
    Object.assign(this, verficationOrderItem);
  }

  Id: Guid;
  OrderId: string;
  DeviceId: number;
  DeviceDescription: string;
  PriorityCode: string;
  PriorityCodeColor: string;
  PriorityCodeDescription: string;
  SequenceOrder: number;
  CompleteVerificationPercentage: number;
  RequiredVerificationPercentage: number;
  FillDate: Date;
  HasOutputDeviceVerification: boolean;
  HasExceptions: boolean;
  PriorityVerificationGrouping: boolean;
}
