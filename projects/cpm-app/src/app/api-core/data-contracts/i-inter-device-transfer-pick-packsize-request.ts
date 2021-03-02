import { ItemNeedsOperationOutcome } from '../../shared/enums/item-needs-operation-outcome';

export interface  IInterDeviceTransferPickPackSizeRequest {
    PackSize: number;
    RequestedQuantityInPacks: number;
    IsOnDemand: boolean;
}
