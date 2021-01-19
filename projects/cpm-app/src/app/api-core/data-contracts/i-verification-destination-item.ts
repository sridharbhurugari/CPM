import { Guid } from 'guid-typescript';

export interface IVerificationDestinationItem {
  Id: Guid;
  OrderId: string;
  DestinationId: string;
  DestinationType: string;
  Area: string;
  PatientArea: string;
  PatientName: string;
  PatientRoom: string;
  DestinationOmni: string;
  CompleteVerifications: number;
  TotalVerifications: number;
  CompleteExceptions: number;
  RequiredExceptions: number;
  CompleteRequiredVerifications: number;
  RequiredRequiredVerifications: number;
}
