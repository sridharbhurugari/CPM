export interface IPicklistLine {
    ItemId: string;
    DestinationDeviceId: number;
    PriorityDescription: string;
    PriorityColorCode: string;
    EarliestExpirationDate: Date;
    OrderId: string;
    PicklistLineId: string;
    FormattedGenericName: string;
    BrandName: string;
    SourceDeviceLocationId: number;
    DestinationDeviceTypeId: number;
    PickQuantity: number;
}