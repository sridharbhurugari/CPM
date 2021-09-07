import { Guid } from 'guid-typescript';
import { IQuickPickQueueItem } from '../../api-xr2/data-contracts/i-quick-pick-queue-item';

export class QuickPickQueueItem implements IQuickPickQueueItem {
  constructor(quickPickQueueItem: IQuickPickQueueItem) {
    Object.assign(this, quickPickQueueItem);
  }

  PriorityColor: string;
  PriorityDescription: string;
  DestinationLine1: string;
  DestinationLine2: string;
  PriorityCodeDescription: string;
  IncompleteBoxCount: number;
  TotalBoxCount: number;
  RobotDispenseBoxIds: Guid[];
  PicklistId: Guid;
  DeviceId: number;
  OrdersInDrawers: boolean;
  PendingXR2: boolean;
}
