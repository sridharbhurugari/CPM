import { VerificationRouting } from "../enums/verification-routing";

export interface IVerificationNavigationParameters {
  PriorityCode: string;
  DeviceId: number;
  OrderId: string;
  DestinationId: string;
  Route: VerificationRouting;
  RoutedByScan: boolean;
  PriorityVerificationGrouping: boolean;
}
