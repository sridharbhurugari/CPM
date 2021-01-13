import { Guid } from "guid-typescript";
import { VerificationRouting } from "../enums/verification-routing";

export interface IVerificationNavigationParameters {
  OrderId: string;
  DestinationId: Guid,
  PriorityCodeDescription: string,
  Date: Date,
  Route: VerificationRouting;
}
