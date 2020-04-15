import { IDeviceConfiguration } from '../../api-core/data-contracts/i-device-configuration';

export class DeviceConfigurationList implements IDeviceConfiguration {
  constructor(deviceConfiguration: IDeviceConfiguration) {
    Object.assign(this, deviceConfiguration);
  }
   Active: boolean;
   DefaultOwner: string;
   DefaultOwnerShortname: string;
   DeviceDescription: string;
   DeviceId: number;
   DeviceType: string;
   IsValid: boolean;
   Json: string;
   LeaseRequired: boolean;
   Model: string;
   Order: number;
   PrinterName: string;
}

