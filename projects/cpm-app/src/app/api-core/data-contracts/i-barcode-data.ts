export interface IBarcodeData {
    BarCodeScanned: string;
    BarCodeFormat: string;
    ProductId: string;
    Ndc: string;
    ExpirationDate: Date;
    SerialNumber: string;
    LotNumber: string;
    Quantity: number;
    ItemId: string;
    BinId: string;
    TransactionId: string;
    DispenseId: number;
    OrderId: string;
    DestinationId: string;
    SourceOmniId: string;
    IsBarcodeOverride: boolean;
    IsDispenseBarcode: boolean;
    IsProductBarcode: boolean;
    IsBinBarcode: boolean;
    IsTrayBarcode: boolean;
    IsUnrecognizedBarcode: boolean;
    IsXr2PickingBarcode: boolean;
    DeviceId: number;
}
