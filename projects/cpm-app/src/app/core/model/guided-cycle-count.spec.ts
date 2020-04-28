import { GuidedCycleCount } from './guided-cycle-count';

describe('GuidedCycleCount', () => {
  it('should create an instance', () => {
    expect(new GuidedCycleCount({
      DeviceId: 5,
      DeviceLocationTypeId: '2023',
      ShelfNumber: 3,
      BinNumber: 2,
      SlotNumber: 1,
      BrandNameFormatted: "Brand",
      GenericNameFormatted: "Generic",
      DeviceLocationId: 123,
      ExpirationDate: new Date(),
      ExpirationDateFormatted: "12/10/2020",
      Units:"EA",
      ItemId: "ItemId",
      ParLevel: 10,
      QuantityOnHand: 50,
      ReorderSource: "I",
      ReorderLevel: 10,
      LocationDescription: "ER",
      ItmExpDateGranularity:"Month",
      QuantityMin:10,
      InStockQuantity:10,
      ItemDateFormat: "MM/DD/YYYY",
    })).toBeTruthy()
  });
});
