export class OutputDevice {

  constructor(outputDevice?: OutputDevice) {
    Object.assign(this, outputDevice);
  }

  DeviceId: string;
  Label: string;
  IsActive: boolean;

  static fromNonStandard(x: any): OutputDevice {
    return new this({
      DeviceId: x.DeviceId,
      Label: x.Label,
      IsActive: x.IsActive
    });
  }
}
