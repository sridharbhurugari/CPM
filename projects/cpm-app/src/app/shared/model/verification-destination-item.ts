import { Guid } from 'guid-typescript';
import { IVerificationDestinationItem } from '../../api-core/data-contracts/i-verification-destination-item';

export class VerificationDestinationItem implements IVerificationDestinationItem {

  constructor(verificationDestinationItem: IVerificationDestinationItem) {
    Object.assign(this, verificationDestinationItem);
    if(verificationDestinationItem) {
      this.DestinationStringValue = this.getDestinationStringValue();
    }
  }

  Id: Guid;
  DeviceId: number;
  OrderId: string;
  DestinationId: string;
  DestinationType: string;
  DestinationLine1: string;
  DestinationLine2: string;
  DestinationStringValue: string;
  CompleteVerifications: number;
  TotalVerifications: number;
  CompleteExceptions: number;
  RequiredExceptions: number;
  CompleteOutputDevice: number;
  RequiredOutputDevice: number;
  FillDateTime: Date;

  private getDestinationStringValue(): string {
    var stringValues = [];

    if(this.DestinationLine2) {
        stringValues.push(this.DestinationLine2);
    }

    if(this.DestinationLine1) {
      stringValues.push(this.DestinationLine1);
    }

    return stringValues.join(' ');
  }
}
