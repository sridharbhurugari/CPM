import { DeviceConfigurationList } from './device-configuration-list';

describe('DeviceConfigurationList', () => {
  it('should create an instance', () => {
    expect(new DeviceConfigurationList({
      Active: true,
      DefaultOwner: '1',
      DefaultOwnerShortname: 'WKS0000001',
      DeviceDescription: 'Workstation 1',
      DeviceId: 1,
      DeviceType: '',
      IsValid: true,
      Json: '',
      LeaseRequired: true,
      Model: '',
      Order: 1,
      PrinterName: '',
    })).toBeTruthy();
  });
});
