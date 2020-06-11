import { Guid } from 'guid-typescript';
import { IQuickPickQueueItem } from '../../api-xr2/data-contracts/i-quick-pick-queue-item';

export class QuickPickQueueItem implements IQuickPickQueueItem {
  constructor(quickPickQueueItem: IQuickPickQueueItem) {
    Object.assign(this, quickPickQueueItem);
  }

  BoxIdentifier: Guid;
  PriorityColor: string;
  PriorityDescription: string;
  DestinationLine1: string;
  DestinationLine2: string;
  PriorityCodeDescription: string;
  BoxNumber: number;
  BoxCount: number;
  BoxBarcode: string;
}
