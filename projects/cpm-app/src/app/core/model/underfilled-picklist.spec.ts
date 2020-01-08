import { UnderfilledPicklist } from "./underfilled-picklist";

describe('UnderfilledPicklist', () => {
  it('should create an instance', () => {
    const displayObject = new UnderfilledPicklist({
      AreaDescription: '',
      CompletedDate: new Date(),
      DestinationOmni: '',
      ItemBrandName: '',
      ItemFormattedGenericName: '',
      ItemId: '',
      OrderId: '',
      OrderDate: new Date(),
      PatientMedicalRecordNumber: '',
      PatientName: '',
      PatientRoom: '',
      PatientVisitId: '',
      PicklistTypeDb: '',
      PriorityCode: '',
      PriorityColorCode: '',
      PriorityDescription: '',
      RouteName: '',
      SequenceOrder: 1,
      UnderfilledDestinationCount: 1,
      UnderfilledItemCount: 1,
      UnderfilledPatientCount: 1
    },
    'en-us',
    'items',
    'patients',
    'cabinets');
    expect(displayObject).toBeTruthy();
  });
});
