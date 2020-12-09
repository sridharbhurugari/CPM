export interface IPickTransactionScanDetails {
    ItemId: string;
    TransactionScannedBarcodeProductId: string;
    TransactionScannedBarcodeFormat: string;
    TransactionScannedRawBarcode: string;
    ScannedBarcode: string;
    IsIssueScanRequired: boolean;
    IsScanVerified: boolean;
    IsTransactionLabelBarcodeScanVerified: boolean;
    IsScanOverride: boolean;
}