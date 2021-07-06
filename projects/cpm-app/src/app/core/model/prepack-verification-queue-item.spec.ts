import { PrepackVerificationQueueItem } from './prepack-verification-queue-item';

describe('PrepackVerificationQueueItem', () => {
  it('should create an instance', () => {
    expect(new PrepackVerificationQueueItem({
      PrepackVerificationQueueId: 1,
      ItemId: '12345',
      ItemDescription: 'test item',
      DeviceId: 99,
      DeviceDescription: 'test device',
      QuantityToPackage: 3,
      PackagedDate: new Date(),
      DrugIdentifier: "test drug id",
      PrepackLotNumber: "test lot",
      PrepackExpirationDate: new Date()
    })).toBeTruthy();
  });
});
