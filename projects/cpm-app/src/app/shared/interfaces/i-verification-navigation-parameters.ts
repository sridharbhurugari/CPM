import { VerificationRouting } from "../enums/verification-routing";

export interface IVerificationNavigationParameters {
  DeviceId: number;
  OrderId: string;
  DestinationId: string;
  Route: VerificationRouting;
}
