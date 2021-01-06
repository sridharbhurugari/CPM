import { Guid } from "guid-typescript";

export interface IXr2VerificationNavigationParameters {
  OrderId: Guid;
  PriorityCodeDescription: String
  Route: String;
}
