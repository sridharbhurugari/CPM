import { Guid } from 'guid-typescript';
import { IVerificationDestinationDetail } from '../../api-core/data-contracts/i-verification-destination-detail';

export class VerificationDestinationDetail implements IVerificationDestinationDetail {

  constructor(verificationDestinationDetail: IVerificationDestinationDetail) {
    Object.assign(this, verificationDestinationDetail);
    if(verificationDestinationDetail) {
      this.DestinationStringValue = this.getDestinationStringValue();
    }
  }

  Id: Guid;
  OrderId: string;
  DestinationId: string;
  DestinationType: string;
  DestinationLine1: string;
  DestinationLine2: string;
  DestinationStringValue: string;

  ItemFormattedGenericName: string;
  ItemTradeName: string;
  UnitsOfIssue: string;
  ItemId: string;
  MedOrderId: string;
  RequestedQuantity: number;
  FillQuantity: number;
  FillDate: string;
  FillUserId: string;
  FillUserName: string;
  IsIssueScanRequired: boolean
  VerifiedStatus: string;
  VerifiedDate: string;

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
