import { Guid } from "guid-typescript";
import { Xr2VerificationRouting } from "../enums/xr2-verification-routing";

export interface IXr2VerificationNavigationParameters {
  OrderId: Guid;
  DestinationId: Guid,
  PriorityCodeDescription: String,
  Date: String,
  Route: Xr2VerificationRouting;
}
