import { IPicklistQueueGroupKeyNonStandardJson } from '../../api-xr2/events/i-picklist-queue-group-key-nonstandard.json';

export class PicklistQueueGroupKey {
  constructor(picklistQueueGroupKey: PicklistQueueGroupKey) {
    Object.assign(this, picklistQueueGroupKey);
  }

  DeviceId: number;
  PickPriorityIdentity: number;

  static fromNonstandardJson(picklistQueueGroupKey: IPicklistQueueGroupKeyNonStandardJson) {
    return new this({
      DeviceId: picklistQueueGroupKey.DeviceId,
      PickPriorityIdentity: picklistQueueGroupKey.PickPriorityIdentity
    });
  }
}
