import { IBarcodeOverrideData } from './i-barcode-override-data';

export class BarcodeOverrideDataPicking implements IBarcodeOverrideData {
    constructor(itemId: string, dispenseIds: number[]) {
        this.itemId = itemId;
        this.dispenseIds = dispenseIds;
    }

    acceptTrayBarcodes: boolean = false;
    acceptParsedNumbers: boolean = false;
    acceptParsedDates: boolean = false;
    allowOverride: boolean = true;;

    itemId: string;
    dispenseIds: number[];
}