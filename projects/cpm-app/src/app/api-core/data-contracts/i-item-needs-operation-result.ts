import { ItemNeedsOperationOutcome } from '../../shared/enums/item-needs-operation-outcome';

export interface IItemNeedsOperationResult {
    IsSuccessful: boolean;
    DeviceId: number;
    ItemId: string;
    Outcome: ItemNeedsOperationOutcome;
    OutcomeText: string;
}