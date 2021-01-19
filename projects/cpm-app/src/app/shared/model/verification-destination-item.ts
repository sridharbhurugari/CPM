import { Guid } from 'guid-typescript';
import { IVerificationDestinationItem } from '../../api-core/data-contracts/i-verification-destination-item';

export class VerificationDestinationItem implements IVerificationDestinationItem {

  constructor(verificationDestinationItem: IVerificationDestinationItem) {
    Object.assign(this, verificationDestinationItem);
  }

  Id: Guid;
  OrderId: string;
  DestinationId: string;
  DestinationType: string;
  Area: string;
  PatientArea: string;
  PatientName: string;
  PatientRoom: string;
  DestinationOmni: string;
  CompleteVerifications: number;
  TotalVerifications: number;
  CompleteExceptions: number;
  RequiredExceptions: number;
  CompleteRequiredVerifications: number;
  RequiredRequiredVerifications: number;
}
