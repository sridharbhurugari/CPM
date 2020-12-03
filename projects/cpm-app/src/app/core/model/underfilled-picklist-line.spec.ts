import { UnderfilledPicklistLine } from './underfilled-picklist-line';

describe('UnderfilledPicklistLine', () => {
  let line: UnderfilledPicklistLine;
  beforeEach(() => {
    line = new UnderfilledPicklistLine({
      PicklistLineId: 'pllid',
      AreaDescription: '',
      DestinationId: '',
      DestinationOmni: '',
      DestinationType: '',
      FillDate: new Date(),
      FillQuantity: 5,
      ItemBrandName: '',
      ItemFormattedGenericName: '',
      ItemId: '',
      OrderId: '',
      OrderQuantity: 5,
      PatientName: '',
      PatientRoom: '',
      PickItemLocationDescription: '',
      PicklistTypeDb: '',
      PriorityCode: '',
      PharmacyQOH: 0,
      UnfilledReason: '',
      ItemFoundInCPM: '',
      ItemLocation: '',
      InDeviceItem: ''
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
      });
    });
    describe('given area destination', () => {
      it('should return area description', () => {
        line.DestinationType = 'A';
        line.AreaDescription = 'a desc';
        expect(line.DestinationSortValue).toEqual(line.AreaDescription);
      });
    });
    describe('given cabinet destination', () => {
      it('should return omni name', () => {
        line.DestinationType = 'O';
        line.DestinationOmni = 'omni';
        expect(line.DestinationSortValue).toEqual(line.DestinationOmni);
      });
    });
    describe('given unknown destination', () => {
      it('should return patient name', () => {
        line.DestinationType = 'U';
        line.DestinationId = '3892';
        expect(line.DestinationSortValue).toEqual(line.DestinationId);
      });
    });
    describe('canReroute when the item is legit and has a route', () => {
      it('canReroute should return false when all are empty', () => {
        line.ItemFoundInCPM = '';
        line.ItemLocation =   '';
        line.InDeviceItem =   '';
        expect(line.canReroute).toBe(false);
      });
      it('canReroute should return true when all are populated', () => {
        line.ItemFoundInCPM = 'known item identifier';
        line.ItemLocation = 'assigned item identifier';
        line.InDeviceItem = 'not missing the route';
        expect(line.canReroute).toBe(true);
      });
      it('canReroute should return false when foundInCPM is missing', () => {
        line.ItemFoundInCPM = '';
        line.ItemLocation = 'assigned item identifier';
        line.InDeviceItem = 'not missing the route';
        expect(line.canReroute).toBe(false);
      });

      it('canReroute should return false when itemLocation is missing', () => {
        line.ItemFoundInCPM = 'known item identifier';
        line.ItemLocation = '';
        line.InDeviceItem = 'not missing the route';
        expect(line.canReroute).toBe(false);
      });

      it('canReroute should return false when device is missing', () => {
        line.ItemFoundInCPM = 'known item identifier';
        line.ItemLocation = 'assigned item identifier';
        line.InDeviceItem = '';
        expect(line.canReroute).toBe(false);
      });
    });
  });
});
