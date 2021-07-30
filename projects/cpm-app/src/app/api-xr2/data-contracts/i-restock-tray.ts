export interface IRestockTray {
    TrayId: string;
    TrayDescription: string;
    TrayTypeId: number;
    IsReturn: boolean;
    RestockTrayStatus: number;
    IsInvoiceTray: boolean;
    DeviceId: number;
}
