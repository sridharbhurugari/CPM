import { ItemNeedsOperationOutcome } from '../../shared/enums/item-needs-operation-outcome';
import { IInterDeviceTransferPickPackSizeRequest } from './i-inter-device-transfer-pick-packsize-request';

export interface  IInterDeviceTransferPickRequest {
    ItemId: string;
    QuantityToPick: number;
    SourceDeviceLocationId: number;
    PackSizes: IInterDeviceTransferPickPackSizeRequest[];
}
