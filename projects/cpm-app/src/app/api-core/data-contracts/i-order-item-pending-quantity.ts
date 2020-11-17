export interface IOrderItemPendingQuantity {
    OrderId: string;
    ItemId: string;
    PendingPickQty: number;
    PendingStockQty: number;
}