export interface IDeviceReplenishmentNeed {
    DeviceId: number;
    DeviceDescription: string;
    ItemsBelowReorderLevel: number;
    AssignedItems: number;
}
