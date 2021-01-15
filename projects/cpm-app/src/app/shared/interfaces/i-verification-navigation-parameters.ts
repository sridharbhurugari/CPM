import { VerificationRouting } from "../enums/verification-routing";

export interface IVerificationNavigationParameters {
  OrderId: string;
  DestinationId: string;
  PriorityCodeDescription: string,
  Date: Date,
  Route: VerificationRouting;
}
