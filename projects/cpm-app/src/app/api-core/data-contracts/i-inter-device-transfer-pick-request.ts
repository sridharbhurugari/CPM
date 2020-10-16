import { ItemNeedsOperationOutcome } from '../../shared/enums/item-needs-operation-outcome';

export interface  IInterDeviceTransferPickRequest {
    ItemId: string;
    QuantityToPick: number;
    SourceDeviceLocationId: number;
}
