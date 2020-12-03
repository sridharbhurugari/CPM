export interface IBarcodeOverrideData {
    acceptTrayBarcodes: boolean;
    acceptParsedNumbers: boolean;
    acceptParsedDates: boolean;

    itemId: string;
    dispenseIds: number[];

    allowOverride: boolean;
}