import { IPicklistQueueItem } from '../../api-xr2/data-contracts/i-picklist-queue-item';
import { IItemPicklistLine } from '../../api-xr2/data-contracts/i-item-picklist-line';
import { ItemPicklistLine } from "../../api-xr2/data-contracts/item-picklist-line";
import { Guid } from 'guid-typescript';
import { OutputDevice } from '../../api-xr2/data-contracts/output-device';
import { IPicklistQueueItemNonstandardJson } from '../../api-xr2/events/i-picklist-queue-item-nonstandard-json';
import { IReroutablePicklistQueueItem } from '../../api-xr2/data-contracts/i-reroutable-picklist-queue-item';
import { IReleaseablePicklistQueueItem } from '../../api-xr2/data-contracts/i-releaseable-picklist-queue-item';

export class PicklistQueueItem implements IPicklistQueueItem, IReroutablePicklistQueueItem, IReleaseablePicklistQueueItem {

  constructor(picklistQueueItem: IPicklistQueueItem) {
    Object.assign(this, picklistQueueItem);
    this.TrackById = Guid.create();
  }

  PicklistId: string;
  OrderId: string;
  DeviceLocationId: number;
  ItemPicklistLines: Array<IItemPicklistLine>;
  PriorityCode: string;
  PriorityCodeColor: string;
  Destination: string;
  OrderGroupDestinationId: string;
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
  SequenceOrder: number;
  RobotPickGroupId: Guid;
  OrderDate: Date;
  PatientCount: number;
  PickPriorityIdentity: number;
  RouteName: string;

  get Releaseable() {
    return this.Status === 1 && !this.Saving;
  }

  get Printable() {
    return this.Status > 2 && this.IsPrintable && !this.Saving;
  }

  get Reroutable() {
    return !this.Saving;
  }

  static fromNonstandardJson(picklistQueueItem: IPicklistQueueItemNonstandardJson) : PicklistQueueItem {
    return new this({
      AvailableOutputDeviceList: picklistQueueItem.AvailableOutputDeviceList.$values.map((x) => { return OutputDevice.fromNonStandard(x); }),
      BoxCount: picklistQueueItem.BoxCount,
      Destination: picklistQueueItem.Destination,
      OrderGroupDestinationId: picklistQueueItem.OrderGroupDestinationId,
      DestinationType: picklistQueueItem.DestinationType,
      DeviceDescription: picklistQueueItem.DeviceDescription,
      DeviceId: picklistQueueItem.DeviceId,
      DeviceLocationId: picklistQueueItem.DeviceLocationId,
      FilledBoxCount: picklistQueueItem.FilledBoxCount,
      IsPrintable: picklistQueueItem.IsPrintable,
      ItemCount: picklistQueueItem.ItemCount,
      ItemPicklistLines: picklistQueueItem.ItemPicklistLines.$values.map((x) => { return ItemPicklistLine.fromNonStandard(x); }),
      OrderId: picklistQueueItem.OrderId,
      OutputDeviceId: picklistQueueItem.OutputDeviceId,
      PicklistId: picklistQueueItem.PicklistId,
      PriorityCode: picklistQueueItem.PriorityCode,
      PriorityCodeColor: picklistQueueItem.PriorityCodeColor,
      PriorityCodeDescription: picklistQueueItem.PriorityCodeDescription,
      RobotPickGroupId: picklistQueueItem.RobotPickGroupId,
      Status: picklistQueueItem.Status,
      StatusDisplay: picklistQueueItem.StatusDisplay,
      SequenceOrder: picklistQueueItem.SequenceOrder,
      OrderDate: picklistQueueItem.OrderDate,
      PatientCount: picklistQueueItem.PatientCount,
      PickPriorityIdentity: picklistQueueItem.PickPriorityIdentity,
      RouteName: picklistQueueItem.RouteName
    });
  }
}
