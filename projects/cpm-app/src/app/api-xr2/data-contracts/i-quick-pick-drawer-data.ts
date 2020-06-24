import { QuickPickRobotDispenseBoxItem } from '../../xr2/model/quick-pick-robot-dispense-box-item';
import { QuickPickControlDataStatus } from './../../xr2/model/quick-pick-control-data-status';

export interface IQuickPickDrawerData {
  Id: number;
  QuickPickDispenseBoxItems: Array<QuickPickRobotDispenseBoxItem>;
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
  MedsWithCounts: Array<any>;
  ErrorInfo: any;
  IsPartOfMultipleBoxOrder: boolean;
  DestinationHasOrdersAtOtherProcess: boolean;
}
