import { ItemNeedsOperationOutcome } from '../../shared/enums/item-needs-operation-outcome';

export interface  IInterDeviceTransferOnDemandPickRequest {
    ItemId: string;
    QuantityToPick: number;
    SourceDeviceLocationId: number;
    PackSize: number;
    RequestedQuantityInPacks: number;

}
