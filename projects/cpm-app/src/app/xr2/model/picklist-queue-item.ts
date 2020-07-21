import { IPicklistQueueItem } from '../../api-xr2/data-contracts/i-picklist-queue-item';
import { IItemPicklistLine } from '../../api-xr2/data-contracts/i-item-picklist-line';
import { Guid } from 'guid-typescript';
import { OutputDevice } from '../../api-xr2/data-contracts/output-device';
import { IPicklistQueueItemNonstandardJson } from '../../api-xr2/events/i-picklist-queue-item-nonstandard-json';

export class PicklistQueueItem implements IPicklistQueueItem {

  constructor(picklistQueueItem: IPicklistQueueItem) {
    Object.assign(this, picklistQueueItem);
    this.TrackById = Guid.create();
  }

  static fromNonstandardJson(picklistQueueItem: IPicklistQueueItemNonstandardJson){
    return new this({
      AvailableOutputDeviceList: picklistQueueItem.AvailableOutputDeviceList.$values,
      BoxCount: picklistQueueItem.BoxCount,
      Destination: picklistQueueItem.Destination,
      DestinationId: picklistQueueItem.DestinationId,
      DestinationType: picklistQueueItem.DestinationType,
      DeviceDescription: picklistQueueItem.DeviceDescription,
      DeviceId: picklistQueueItem.DeviceId,
      DeviceLocationId: picklistQueueItem.DeviceLocationId,
      FilledBoxCount: picklistQueueItem.FilledBoxCount,
      IsPrintable: picklistQueueItem.IsPrintable,
      ItemCount: picklistQueueItem.ItemCount,
      ItemPicklistLines: picklistQueueItem.ItemPicklistLines.$values,
      OrderId: picklistQueueItem.OrderId,
      OutputDeviceId: picklistQueueItem.OutputDeviceId,
      PicklistId: picklistQueueItem.PicklistId,
      PriorityCode: picklistQueueItem.PriorityCode,
      PriorityCodeColor: picklistQueueItem.PriorityCodeColor,
      PriorityCodeDescription: picklistQueueItem.PriorityCodeDescription,
      RobotPickGroupId: picklistQueueItem.RobotPickGroupId,
      Status: picklistQueueItem.Status,
      StatusDisplay: picklistQueueItem.StatusDisplay,
    });
  }

  PicklistId: string;
  OrderId: string;
  DeviceLocationId: number;
  ItemPicklistLines: Array<IItemPicklistLine>;
  PriorityCode: string;
  PriorityCodeColor: string;
  Destination: string;
  DestinationId: string;
  DestinationType: string;
  PriorityCodeDescription: string;
  BoxCount: number;
  FilledBoxCount: number;
  Status: number;
  StatusDisplay: string;
  DeviceDescription: string;
  DeviceId: number;
  OutputDeviceId: string;
  AvailableOutputDeviceList: Array<OutputDevice>;
  Saving: boolean;
  TrackById: Guid;
  ItemCount: number;
  IsPrintable: boolean;
  RobotPickGroupId: Guid;
}
