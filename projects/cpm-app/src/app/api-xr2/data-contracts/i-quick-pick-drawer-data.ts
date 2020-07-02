import { Guid } from 'guid-typescript';

import { QuickPickControlDataStatus } from './../../xr2/model/quick-pick-control-data-status';
import { MedsWithCount } from './../../xr2/model/meds-with-count';
import { QuickPickErrorInformation } from './../../xr2/model/quick-pick-error-information';

export interface IQuickPickDrawerData {
  Id: number;
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
  LineItems: number;
  Xr2ServiceBarcode: string;
  Status: QuickPickControlDataStatus;
  MedsWithCounts: Array<MedsWithCount>;
  ErrorInfo: QuickPickErrorInformation;
  IsPartOfMultipleBoxOrder: boolean;
  DestinationHasOrdersAtOtherProcess: boolean;
  BoxCount: number;
  BoxNumber: number;
  TotalRequestQty: number;
  TotalFillQty: number;
}
