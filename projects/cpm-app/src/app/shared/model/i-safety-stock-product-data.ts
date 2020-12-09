export interface ISafetyStockProductData {
    itemId: string;
    requireProductScan: boolean;
    requireBinScan: boolean;
    requireDispenseScan: boolean;
    dispenseIds: number[];
}
