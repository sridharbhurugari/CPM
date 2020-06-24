import { IQuickPickDrawerData } from '../../api-xr2/data-contracts/i-quick-pick-drawer-data';
import { QuickPickRobotDispenseBoxItem } from './quick-pick-robot-dispense-box-item';
import { QuickPickControlDataStatus } from './quick-pick-control-data-status';

export class QuickPickDrawerData implements IQuickPickDrawerData {
  constructor(quickPickDrawerData: IQuickPickDrawerData) {
    Object.assign(this, quickPickDrawerData);
  }

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
