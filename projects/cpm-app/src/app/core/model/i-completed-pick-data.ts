import { IBarcodeData } from '../../api-core/data-contracts/i-barcode-data';
import { IPicklistLine } from '../../api-core/data-contracts/i-picklist-line';

export interface ICompletePickData {
    line: IPicklistLine;
    pickTotal: number;
    isLast: boolean;
    productScanRequired: boolean;
    safetyStockScanInfo: IBarcodeData;
    secondaryScanInfo: IBarcodeData;
}