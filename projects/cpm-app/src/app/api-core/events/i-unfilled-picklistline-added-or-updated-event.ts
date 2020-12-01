import { IUnderfilledPicklistLine } from '../data-contracts/i-underfilled-picklist-line';

export interface IUnfilledPicklistlineAddedOrUpdatedEvent {
    PicklistLineUnderfilled: IUnderfilledPicklistLine;
}
