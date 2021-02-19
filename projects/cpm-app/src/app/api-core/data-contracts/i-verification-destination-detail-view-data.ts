import { IVerificationDestinationDetail } from './i-verification-destination-detail';

export interface IVerificationDestinationDetailViewData {
  DetailItems: IVerificationDestinationDetail[];
  OrderId: string;
  FillDate: Date;
  DeviceDescription: string;
  PriorityDescription: string;
}
