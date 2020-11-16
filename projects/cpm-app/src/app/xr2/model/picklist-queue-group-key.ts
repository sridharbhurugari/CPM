export class PicklistQueueGroupKey {
  constructor(deviceId: number, pickPriorityIdentity: number) {
    this.DeviceId = deviceId;
    this.PickPriorityIdentity = pickPriorityIdentity;
  }

  DeviceId: number;
  PickPriorityIdentity: number;
}
