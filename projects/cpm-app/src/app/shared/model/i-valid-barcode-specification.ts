export interface IValidBarcodeSpecification {
    acceptProductBarcodes: boolean;
    acceptBinBarcodes: boolean;
    acceptDispenseBarcodes: boolean;
    acceptTrayBarcodes: boolean;
    acceptParsedNumbers: boolean;
    acceptParsedDates: boolean;

    requireProductBarcode: boolean;
    requireDispenseBarcode: boolean;
    requireBinBarcode: boolean;

    itemId: string;
    dispenseIds: number[];

    allowOverride: boolean;
}