import { IPicklistQueueItem } from '../../api-xr2/data-contracts/i-picklist-queue-item';
import { IItemPicklistLine } from '../../api-xr2/data-contracts/i-item-picklist-line';
import { Guid } from 'guid-typescript';
import { OutputDevice } from '../../api-xr2/data-contracts/output-device';

export class PicklistQueueItem implements IPicklistQueueItem {

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
  PickListLineId: string;
}
