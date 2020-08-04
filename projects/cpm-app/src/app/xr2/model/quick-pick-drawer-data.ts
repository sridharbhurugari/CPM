import { Guid } from 'guid-typescript';

import { IQuickPickDrawerData } from '../../api-xr2/data-contracts/i-quick-pick-drawer-data';
import { QuickPickControlDataStatus } from './quick-pick-control-data-status';
import { MedsWithCount } from './meds-with-count';
import { QuickPickErrorInformation } from './quick-pick-error-information';

export class QuickPickDrawerData implements IQuickPickDrawerData {
  constructor(quickPickDrawerData: IQuickPickDrawerData) {
    Object.assign(this, quickPickDrawerData);
  }

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
  BoxNumber: number;
  BoxCount: number;
  TotalRequestQty: number;
  TotalFillQty: number;
  UnknownContents: boolean;
}
