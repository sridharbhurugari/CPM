import { Guid } from 'guid-typescript';
import { IQuickPickRobotDispenseBoxItem} from '../../api-xr2/data-contracts/i-quick-pick-robot-dispense-box-item';

export class QuickPickRobotDispenseBoxItem implements IQuickPickRobotDispenseBoxItem {
  constructor(quickPickDispenseBox: IQuickPickRobotDispenseBoxItem) {
    Object.assign(this, quickPickDispenseBox);
  }
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
  ItemName: string;
  RequestQuantity: number;
  FillQuantity: number;
}
