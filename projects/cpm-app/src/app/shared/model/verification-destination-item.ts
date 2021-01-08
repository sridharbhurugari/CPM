import { Guid } from 'guid-typescript';
import { IVerificationDestinationItem } from '../../api-core/data-contracts/i-verification-destination-item';

export class VerificationDestinationItem implements IVerificationDestinationItem {

  constructor(verificationDestinationItem: IVerificationDestinationItem) {
    Object.assign(this, verificationDestinationItem);
  }

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
