export interface IItemReplenishmentOnDemand {
    ItemId: string;
    ItemFormattedGenericName: string;
    ItemBrandName: string;
    DeviceQuantityOnHand: number;
    DeviceParLevel: number;
    DeviceRestockLevel: number;
    PendingDevicePickQuantity: number;
    DisplayPackageSize: string;
    DisplayNumberOfPackages: string;
    DisplayDeviceQuantityOnHand: string;
    DisplayQohNumberOfPackages: string;
    PackSize: number;
    Xr2Item: boolean;
    UnitOfIssue: string;
    AvailablePharmacyLocationCount: number;
    AvailablePharmacyQty: number;
}
