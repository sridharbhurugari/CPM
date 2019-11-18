export class IDeviceSequenceOrder {
    SequenceOrder: number;
    DeviceId: string;
    DeviceDescription: string;
    public constructor(init?: Partial<IDeviceSequenceOrder >) {
      Object.assign(this, init);
  }
}
