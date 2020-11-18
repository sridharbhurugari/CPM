import { IItemLocationDetail } from '../../api-core/data-contracts/i-item-location-detail';
import { IPicklistLine } from '../../api-core/data-contracts/i-picklist-line';
import { IItemHeaderInfo } from './i-item-header-info';

export class ItemHeaderInfo implements IItemHeaderInfo {
    constructor(pickLocation: IItemLocationDetail, line: IPicklistLine, productScanRequired: boolean, dispenseScanRequired: boolean, binScanRequired: boolean) {
        this.DeviceDescription = pickLocation.DeviceDescription;
        this.ShelfNumber = pickLocation.DeviceLocation.Shelf;
        this.BinNumber = pickLocation.DeviceLocation.Bin;
        this.SlotNumber = pickLocation.DeviceLocation.Slot;
        this.DeviceLocationTypeId = pickLocation.DeviceLocation.LocationTypeId;
        this.DeviceId = pickLocation.DeviceId;
        this.DeviceLocationId = pickLocation.DeviceLocationId;
        this.DeviceLocationAccessQuantity = line.PickQuantity;
        this.DeviceLocationAccessUnits = pickLocation.UnitOfIssue;
        this.ItemGenericNameFormatted = line.FormattedGenericName;
        this.ItemTradeName = line.BrandName;
        this.ItemId = line.ItemId;
        this.LocationDescription = pickLocation.LocationDescription;
        this.RequireItemProductScan = productScanRequired;
        this.RequireDispenseScan = dispenseScanRequired;
        this.RequireBinScan = binScanRequired;
    }

    ItemId: string;
    DeviceDescription: string;
    LocationDescription: string;
    RequireItemProductScan: boolean;
    SlotNumber: number;
    BinNumber: number;
    ShelfNumber: number;
    DeviceLocationTypeId: string;
    DeviceId: number;
    DeviceLocationId: number;
    DeviceLocationAccessQuantity: number;
    DeviceLocationAccessUnits: string;
    ItemTradeName: string;
    ItemGenericNameFormatted: string;
    RequireDispenseScan: boolean;
    RequireBinScan: boolean;
}