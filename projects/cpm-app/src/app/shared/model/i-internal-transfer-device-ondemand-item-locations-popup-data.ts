import { IItemLocationDetail } from "../../api-core/data-contracts/i-item-location-detail";

export interface IInternalTransferDeviceOnDemandItemLocationsPopupData {
    popupTitle: string,

    windowInfo: boolean;
    windowFilter: boolean;
    windowFooter: boolean;

    itemDescritpion: string,
    itemPackSize: number,
    itemLocations: IItemLocationDetail[],
    selectedLocation: IItemLocationDetail,
}
