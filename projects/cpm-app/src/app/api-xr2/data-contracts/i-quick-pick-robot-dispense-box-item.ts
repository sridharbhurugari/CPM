import { Guid } from 'guid-typescript';

export class IQuickPickRobotDispenseBoxItem {
  OrderId: string;
  PicklistLineId: Guid;
  RobotPicklistLineId: Guid;
  RobotDispenseBoxId: Guid;
  PriorityCode: string;
  PriorityDescription: string;
  ColorCode: string;
  DestinationId: string;
  DestinationAreaId: string;
  DestinationType: string;
  Area: string;
  PatientName: string;
  PatientRoom: string;
  DispenseBoxId: number;
  BoxBarcode: string;
  CompletedDateTime: any;
  Exception: boolean;
  BoxNumber: number;
  BoxCount: number;
  FormattedGenericName: string;
  RequestQuantity: number;
  FillQuantity: number;
}
