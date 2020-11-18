import { IInternalTransferPackSizePick } from '../../../core/model/i-internal-transfer-pack-size-pick';
import { IBarcodeData } from '../i-barcode-data';
import { IPicklistLine } from '../i-picklist-line';
import { IPicklistLineFillData } from '../i-picklist-line-fill-data';
import { IPicklistLinePackSizeFillData } from '../i-picklist-line-pack-size-fill-data';
import { IPickTransactionScanDetails } from './i-pick-transaction-scan-details';

export class PicklistLineFillData implements IPicklistLineFillData {
    constructor(line: IPicklistLine, packSizeFills: IInternalTransferPackSizePick[], pickTotal: number, barcodeData: IBarcodeData, productScanRequired: boolean) {
        this.PicklistLineId = line.PicklistLineId;
        this.PickDeviceLocationId = line.SourceDeviceLocationId;
        this.TotalPickQuantity = pickTotal;
        this.PackSizeFills = new Array<IPicklistLinePackSizeFillData>();

        packSizeFills.forEach(pick => {
            const packFill: IPicklistLinePackSizeFillData = {
                PackSize: pick.PackSize,
                FillQuantityInPacks: pick.PacksToPick,
            };

            this.PackSizeFills.push(packFill);
        });
        
        if(barcodeData){
            this.PickTransactionScanDetails = {
                IsIssueScanRequired: productScanRequired,
                IsScanOverride: barcodeData.IsBarcodeOverride,
                IsScanVerified: barcodeData.IsProductBarcode,
                IsTransactionLabelBarcodeScanVerified: false,
                ItemId: barcodeData.ItemId,
                ScannedBarcode: barcodeData.BarCodeScanned,
                TransactionScannedBarcodeFormat: barcodeData.BarCodeFormat,
                TransactionScannedBarcodeProductId: barcodeData.ProductId,
                TransactionScannedRawBarcode: barcodeData.BarCodeScanned,
            };
        }
    }

    PicklistLineId: string;
    PickDeviceLocationId: number;
    TotalPickQuantity: number;
    PackSizeFills: IPicklistLinePackSizeFillData[];
    PickTransactionScanDetails: IPickTransactionScanDetails;
}