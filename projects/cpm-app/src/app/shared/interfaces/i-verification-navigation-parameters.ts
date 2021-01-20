import { Guid } from "guid-typescript";
import { VerificationRouting } from "../enums/verification-routing";

export interface IVerificationNavigationParameters {
  OrderId: Guid;
  DestinationId: Guid,
  PriorityCodeDescription: String,
  Date: String,
  Route: VerificationRouting;
}
