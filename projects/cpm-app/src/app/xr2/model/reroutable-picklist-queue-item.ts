import { IPicklistQueueItem } from '../../api-xr2/data-contracts/i-picklist-queue-item';
import { IItemPicklistLine } from '../../api-xr2/data-contracts/i-item-picklist-line';
import { IReroutablePicklistQueueItem } from '../../api-xr2/data-contracts/i-reroutable-picklist-queue-item';

export class ReroutablePicklistQueueItem implements IReroutablePicklistQueueItem {

  constructor(picklistQueueItem: IReroutablePicklistQueueItem) {
    Object.assign(this, picklistQueueItem);
  }

  PicklistId: string;
  ItemPicklistLines: IItemPicklistLine[];
  DeviceId: number;

  static fromPicklistQueueItem(picklistQueueItem: IPicklistQueueItem) {
    return new this({
      PicklistId: picklistQueueItem.PicklistId,
      ItemPicklistLines: picklistQueueItem.ItemPicklistLines,
      DeviceId: picklistQueueItem.DeviceId,
    });
  }
}
