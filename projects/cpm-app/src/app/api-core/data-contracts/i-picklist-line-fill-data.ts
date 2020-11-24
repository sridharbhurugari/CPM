import { IPicklistLinePackSizeFillData } from './i-picklist-line-pack-size-fill-data';

export interface IPicklistLineFillData {
    PicklistLineId: string;
    PickDeviceLocationId: number;
    TotalPickQuantity: number;
    PackSizeFills: IPicklistLinePackSizeFillData[];
}