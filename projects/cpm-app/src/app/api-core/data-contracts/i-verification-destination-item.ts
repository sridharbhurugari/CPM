import { Guid } from 'guid-typescript';

export interface IVerificationDestinationItem {

  Id: Guid;
  DeviceId: number;
  OrderId: string;
  DestinationId: string;
  DestinationType: string;
  DestinationLine1: string;
  DestinationLine2: string;
  DestinationStringValue: string;
  PriorityCode: string;
  PriorityCodeDescription: string;
  CompleteVerifications: number;
  TotalVerifications: number;
  CompleteExceptions: number;
  RequiredExceptions: number;
  CompleteOutputDevice: number;
  RequiredOutputDevice: number;
  FillDateTime: Date;
  PriorityVerificationGrouping: boolean;
}
