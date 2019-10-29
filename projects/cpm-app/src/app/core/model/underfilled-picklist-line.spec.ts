import { UnderfilledPicklistLine } from "./underfilled-picklist-line";

describe('UnderfilledPicklistLine', () => {
  it('should create an instance', () => {
    expect(new UnderfilledPicklistLine({
      AreaDescription: '',
      DestinationId: '',
      DestinationOmni: '',
      DestinationType: '',
      FillDate: new Date(),
      FillQuantity: 5,
      ItemBrandName: '',
      ItemFormattedGenericName: '',
      ItemId: '',
      OrderQuantity: 5,
      PatientName: '',
      PatientRoom: '',
      PickItemLocationDescription: '',
      PicklistTypeDb: '',
      PriorityCode: ''
    })).toBeTruthy();
  });
});
