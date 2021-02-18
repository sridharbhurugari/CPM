import { IVerificationDestinationItem } from "./i-verification-destination-item";

export interface IVerificationDestinationViewData {
  DetailItems: IVerificationDestinationItem[];
  OrderId: string;
  FillDate: Date;
  DeviceDescription: string;
  PriorityDescription: string;
}
