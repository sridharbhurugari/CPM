import { IPicklistQueueGroupedNonstandardJson } from './i-picklist-queue-grouped-nonstandard-json';
import { NonstandardJsonArray } from '../../shared/events/i-nonstandard-json-array';

export interface IPicklistQueueGroupedListUpdateMessage {
    PicklistQueueGroupedList: NonstandardJsonArray<IPicklistQueueGroupedNonstandardJson>;
}
