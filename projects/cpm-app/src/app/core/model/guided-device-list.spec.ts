import { GuidedDeviceList } from './guided-device-list';

describe('GuidedDeviceList', () => {
  it('should create an instance', () => {
    expect(new GuidedDeviceList({
      DeviceId: 79,
      DeviceDescription: 'Carousel1',
      EarliestExpirationDateInDevice: new Date(),
      NumberOfLocationsExpiringSoon: 10,
      NumberOfLocationsWithOutdatedCycleCount: 10,
      DeviceDefaultOwner: 'Wks01'
    })).toBeTruthy();
  });
});
