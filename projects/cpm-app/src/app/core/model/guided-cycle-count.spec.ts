import { GuidedCycleCount } from './guided-cycle-count';

describe('GuidedCycleCount', () => {
  it('should create an instance', () => {
    expect(new GuidedCycleCount({
      BrandNameFormatted: "Brand",
      GenericNameFormatted: "Generic",
      DeviceLocationId: 123,
      ExpirationDate: new Date(),
      ExpirationDateFormatted: "12/10/2020",
      ItemId: "ItemId",
      ParLevel: 10,
      QuantityOnHand: 50,
      ReorderSource: "I",
      ReorderLevel: 10,
      LocationDescription: "ER",
      InStockQuantity: 50
    })).toBeTruthy();
  });
});
