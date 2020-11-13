export class PicklistQueueGroupKey {
  constructor(deviceId: number, pickPriorityIdentifier: number) {
    this.DeviceId = deviceId;
    this.PickPriorityIdentifier = pickPriorityIdentifier;
  }

  DeviceId: number;
  PickPriorityIdentifier: number;
}
