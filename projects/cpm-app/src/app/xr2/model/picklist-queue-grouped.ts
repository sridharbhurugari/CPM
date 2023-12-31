import { Guid } from 'guid-typescript';
import { OutputDevice } from '../../api-xr2/data-contracts/output-device';
import { IPicklistQueueGrouped } from '../../api-xr2/data-contracts/i-picklist-queue-grouped';
import { IPicklistQueueGroupedNonstandardJson } from '../../api-xr2/events/i-picklist-queue-grouped-nonstandard-json';

export class PicklistQueueGrouped implements IPicklistQueueGrouped {

  constructor(picklistQueueGrouped: IPicklistQueueGrouped) {
    Object.assign(this, picklistQueueGrouped);
    this.TrackById = Guid.create();
  }

  DeviceLocationId: number;
  PriorityCode: string;
  PriorityCodeColor: string;
  Destination: string;
  DestinationType: string;
  PriorityCodeDescription: string;
  DeviceDescription: string;
  DeviceId: number;
  OutputDeviceId: string;
  AvailableOutputDeviceList: Array<OutputDevice>;
  Saving: boolean;
  SequenceOrder: number;
  NewCount: number;
  ReleasedCount: number;
  AreaCount: number;
  TrackById: Guid;
  UnsentPickListLineIds: Array<Guid>;
  PickPriorityIdentity: number;

  static fromNonstandardJson(picklistQueueGrouped: IPicklistQueueGroupedNonstandardJson) {
    return new this({
      AvailableOutputDeviceList: picklistQueueGrouped.AvailableOutputDeviceList.$values,
      Destination: picklistQueueGrouped.Destination,
      DestinationType: picklistQueueGrouped.DestinationType,
      DeviceDescription: picklistQueueGrouped.DeviceDescription,
      DeviceId: picklistQueueGrouped.DeviceId,
      DeviceLocationId: picklistQueueGrouped.DeviceLocationId,
      OutputDeviceId: picklistQueueGrouped.OutputDeviceId,
      PriorityCode: picklistQueueGrouped.PriorityCode,
      PriorityCodeColor: picklistQueueGrouped.PriorityCodeColor,
      PriorityCodeDescription: picklistQueueGrouped.PriorityCodeDescription,
      SequenceOrder: picklistQueueGrouped.SequenceOrder,
      NewCount: picklistQueueGrouped.NewCount,
      ReleasedCount: picklistQueueGrouped.ReleasedCount,
      AreaCount: picklistQueueGrouped.AreaCount,
      UnsentPickListLineIds : picklistQueueGrouped.UnsentPickListLineIds,
      PickPriorityIdentity : picklistQueueGrouped.PickPriorityIdentity
    });
  }

}
