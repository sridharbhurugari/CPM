export interface IItemReplenishmentNeed {
    ItemId: string;
    ItemFormattedGenericName: string;
    ItemBrandName: string;
    DeviceQuantityOnHand: number;
    DeviceQuantityNeeded: number;
    DeviceParLevel: number;
    DeviceRestockLevel: number;
    PendingDevicePickQuantity: number;
    PackageSize: string;
    NumberOfPackages: string;
    QohNumberOfPackages: string;
    PackSize: number;
    Xr2Item: boolean;
    UnitOfIssue: string;
    PickLocationDeviceLocationId: number;
    PickLocationDescription: string;
    PickLocationQoh: number;
    ItemFormattedDescription: string;  
    ItemBrandNameDescription: string; 
    ItemIdDescription: string; 
    SortFormattedName: string; 
}