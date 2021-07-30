import { Guid } from "guid-typescript";

export interface IRestockTray {
    RestockTrayId: number;
    DeviceId: number;
    DeviceDescription;
    TrayId: string;
    TrayTypeId: number;
    IsReturn: boolean;
    TrayExpDate: Date;
    TrayDescription: string;
    RestockTrayStatus: number;
    CreatedDateTime: Date;
    LastUpdatedDateTime: Date;
    CompletedDateTime: Date;
    CorrelationId: Guid;
    MultiDoseEnabled: boolean;
    UserId: string;
    IsStockInternal: boolean;
    IsInvoiceTray: boolean;
    InvoiceOriginScreen;
}
