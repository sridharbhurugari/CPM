import { ItemManagement } from './item-management';

describe('ItemManagement', () => {
  it('should create an instance', () => {
    expect(new ItemManagement({
      ItemId: 'test',
      ItemDescription: 'test',
      TotalQtyOnHand: 1,
      UnitDoseQtyOnHand: 2,
      BulkQtyOnHand: 3,
      UnitDoseLocationCount: 4,
      UnitOfMeasure: 'test' })).toBeTruthy();
  });
});
