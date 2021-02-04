import { VerificationRouting } from "../enums/verification-routing";

export interface IVerificationNavigationParameters {
  DeviceId: number;
  DeviceDescription: string;
  OrderId: string;
  DestinationId: string;
  DestinationLine1: string;
  DestinationLine2: string;
  PriorityCodeDescription: string,
  Date: Date,
  Route: VerificationRouting;
}
