import { UnderfilledPicklistLine } from "./underfilled-picklist-line";

describe('UnderfilledPicklistLine', () => {
  var line: UnderfilledPicklistLine;
  beforeEach(() => {
    line = new UnderfilledPicklistLine({
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
      PriorityCode: '',
      PharmacyQOH: 0
    });
  });

  it('should create an instance', () => {
    expect(line).toBeTruthy();
  });

  describe('DestinationSortValue', () => {
    describe('given patient destination', () => {
      it('should return patient name', () => {
        line.DestinationType = 'P';
        line.PatientName = 'a name';
        expect(line.DestinationSortValue).toEqual(line.PatientName);
      })
    });
    describe('given area destination', () => {
      it('should return area description', () => {
        line.DestinationType = 'A';
        line.AreaDescription = 'a desc';
        expect(line.DestinationSortValue).toEqual(line.AreaDescription);
      })
    });
    describe('given cabinet destination', () => {
      it('should return omni name', () => {
        line.DestinationType = 'O';
        line.DestinationOmni = 'omni';
        expect(line.DestinationSortValue).toEqual(line.DestinationOmni);
      })
    });
    describe('given unknown destination', () => {
      it('should return patient name', () => {
        line.DestinationType = 'U';
        line.DestinationId = '3892';
        expect(line.DestinationSortValue).toEqual(line.DestinationId);
      })
    });
  })
});
