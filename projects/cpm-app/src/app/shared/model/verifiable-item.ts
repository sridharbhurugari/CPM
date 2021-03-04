import { Guid } from 'guid-typescript';
import { IVerifiableItem } from '../../api-core/data-contracts/i-verifiable-item';
import { VerificationDestinationDetail } from './verification-destination-detail';

export class VerifiableItem implements IVerifiableItem {

  constructor(verifiableItem:IVerifiableItem) {
    Object.assign(this, verifiableItem);
  }

  DestinationId: string
  DestinationType: string;
  ItemId: string;
  OrderId: string;
  MedOrderId: string
  PicklistLineId: Guid;
  FillDate: Date;
  VerifiedStatus: string;
  RejectReason: string;
  TransactionScannedBarcodeProductId: string;
  TransactionScannedBarcodeFormat: string;
  TransactionScannedRawBarcode: string;


  static fromVerificationDestinationDetail(verificationDestinationDetail: VerificationDestinationDetail) {
    return new this({
      DestinationId: verificationDestinationDetail.DestinationId,
      DestinationType: verificationDestinationDetail.DestinationType,
      ItemId: verificationDestinationDetail.ItemId,
      OrderId: verificationDestinationDetail.OrderId,
      MedOrderId: verificationDestinationDetail.MedOrderId,
      PicklistLineId: verificationDestinationDetail.PicklistLineId,
      FillDate: verificationDestinationDetail.FillDate,
      VerifiedStatus: verificationDestinationDetail.VerifiedStatus,
      RejectReason: verificationDestinationDetail.RejectReason,
      TransactionScannedBarcodeProductId: verificationDestinationDetail.TransactionScannedBarcodeProductId,
      TransactionScannedBarcodeFormat: verificationDestinationDetail.TransactionScannedBarcodeFormat,
      TransactionScannedRawBarcode: verificationDestinationDetail.TransactionScannedRawBarcode
    });
  }
}
