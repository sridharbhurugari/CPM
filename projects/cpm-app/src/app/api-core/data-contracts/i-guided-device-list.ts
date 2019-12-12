export interface IGuidedDeviceList{
  DeviceId: number,
  DeviceDescription: string,
  NumberOfLocationsWithOutdatedCycleCount: number,
  NumberOfLocationsExpiringSoon: number,
  EarliestExpirationDateInDevice: Date,
  DeviceDefaultOwner: string,
}