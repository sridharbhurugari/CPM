import { IPicklistQueueItem } from '../../api-xr2/data-contracts/i-picklist-queue-item';
import { IItemPicklistLine } from '../../api-xr2/data-contracts/i-item-picklist-line';
import { Guid } from 'guid-typescript';
import { IReleaseablePicklistQueueItem } from '../../api-xr2/data-contracts/i-releaseable-picklist-queue-item';

export class ReleasablePicklistQueueItem implements IReleaseablePicklistQueueItem {

  constructor(picklistQueueItem: IPicklistQueueItem) {
    Object.assign(this, picklistQueueItem);
  }

  OrderId: string;
  OrderGroupDestinationId: string;
  PicklistId: string;
  ItemPicklistLines: IItemPicklistLine[];
  DeviceId: number;
  DeviceLocationId: number;
  RobotPickGroupId: Guid;
}
