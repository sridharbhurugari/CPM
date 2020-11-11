import { UnderfilledPicklist } from '../../core/model/underfilled-picklist';
import { IUnderfilledPicklist } from '../data-contracts/i-underfilled-picklist';
import { Observable } from 'rxjs';

export interface IUnfilledPicklistAddedOrUpdatedEvent {
    PicklistUnderfilled: IUnderfilledPicklist;
}
