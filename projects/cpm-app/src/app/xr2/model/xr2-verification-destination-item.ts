import { Guid } from 'guid-typescript';
import { IXr2VerificationDestinationItem } from '../../api-xr2/data-contracts/i-xr2-verification-destination-item';

export class Xr2VerificationDestinationItem implements IXr2VerificationDestinationItem {

  constructor(xr2DestinationItem: IXr2VerificationDestinationItem) {
    Object.assign(this, xr2DestinationItem);
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
