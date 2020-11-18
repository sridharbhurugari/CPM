import { IPicklistQueueItem } from '../../api-xr2/data-contracts/i-picklist-queue-item';
import { Guid } from 'guid-typescript';
import { IReleaseablePicklistQueueItem } from '../../api-xr2/data-contracts/i-releaseable-picklist-queue-item';

export class ReleasablePicklistQueueItem implements IReleaseablePicklistQueueItem {
  constructor(picklistQueueItem: IReleaseablePicklistQueueItem) {
    Object.assign(this, picklistQueueItem);
  }

  OrderId: string;
  OrderGroupDestinationId: string;
  OutputDeviceId: string;
  DeviceId: number;
  DeviceLocationId: number;
  RobotPickGroupId: Guid;

  static fromPicklistQueueItem(picklistQueueItem: IPicklistQueueItem) {
    return new this({
      OrderId: picklistQueueItem.OrderId,
      OrderGroupDestinationId: picklistQueueItem.OrderGroupDestinationId,
      OutputDeviceId: picklistQueueItem.OutputDeviceId,
      DeviceId: picklistQueueItem.DeviceId,
      DeviceLocationId: picklistQueueItem.DeviceLocationId,
      RobotPickGroupId: picklistQueueItem.RobotPickGroupId,
    });
  }
}
