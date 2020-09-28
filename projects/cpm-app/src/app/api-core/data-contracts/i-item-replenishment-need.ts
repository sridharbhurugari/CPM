export interface IItemReplenishmentNeed {
    ItemId: string;
    ItemFormattedGenericName: string;
    ItemBrandName: string;
    DeviceQuantityOnHand: number;
    DeviceQuantityNeeded: number;
    DeviceParLevel: number;
    DeviceRestockLevel: number;
    PendingDevicePickQuantity: number;
    DisplayPackageSize: string;
    DisplayNumberOfPackages: string;
    DisplayQohNumberOfPackages: string;
    PackSize: number;
    Xr2Item: boolean;
    UnitOfIssue: string;
}
