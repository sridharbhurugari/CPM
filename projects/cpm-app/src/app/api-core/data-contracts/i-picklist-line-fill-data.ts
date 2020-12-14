import { IPicklistLinePackSizeFillData } from './i-picklist-line-pack-size-fill-data';
import { IPickTransactionScanDetails } from './picking/i-pick-transaction-scan-details';

export interface IPicklistLineFillData {
    PicklistLineId: string;
    PickDeviceLocationId: number;
    TotalPickQuantity: number;
    PackSizeFills: IPicklistLinePackSizeFillData[];
    PickTransactionScanDetails: IPickTransactionScanDetails;
}