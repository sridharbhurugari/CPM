export interface IPrepackVerificationQueueItem {
    PrepackVerificationQueueId: number;
    ItemId: string;
    ItemDescription: string;
    DeviceId: number;
    DeviceDescription: string;
    QuantityToPackage: number;
    PackagedDate: Date;
    DrugIdentifier: string;
}
