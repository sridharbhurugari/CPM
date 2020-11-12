import { UnderfilledPicklistLine } from '../../core/model/underfilled-picklist-line';
import { IUnderfilledPicklistLine } from '../data-contracts/i-underfilled-picklist-line';

export interface IUnfilledPicklistlineAddedEvent {
    PicklistLineUnderfilled: IUnderfilledPicklistLine;
}
