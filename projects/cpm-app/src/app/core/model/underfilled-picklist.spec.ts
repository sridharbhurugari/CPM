import { UnderfilledPicklist } from "./underfilled-picklist";

describe('UnderfilledPicklist', () => {
  it('should create an instance', () => {
    expect(new UnderfilledPicklist({
      Area: '',
      CompletedDate: new Date(),
      DesinationOmni: '',
      ItemBrandName: '',
      ItemGenericName: '',
      ItemId: '',
      OrderId: '',
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
    })).toBeTruthy();
  });
});
