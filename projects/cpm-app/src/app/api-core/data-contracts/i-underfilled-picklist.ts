export interface IUnderfilledPicklist {
    OrderId: string,
    OrderDate: Date;
    SequenceOrder: number,
    RouteName: string,
    PicklistTypeDb: string,
    PriorityCode: string,
    PriorityDescription: string,
    PriorityColorCode: string,
    UnderfilledItemCount: number,
    UnderfilledPatientCount: number,
    UnderfilledDestinationCount: number,
    ItemId: string,
    ItemFormattedGenericName: string,
    ItemBrandName: string,
    PatientRoom: string,
    PatientName: string,
    PatientVisitId: string,
    PatientMedicalRecordNumber: string,
    AreaDescription: string,
    DestinationOmni: string,
    CompletedDate: Date
}
