import { NonstandardJsonArray } from '../../shared/events/i-nonstandard-json-array';
import { IPicklistQueueItemNonstandardJson } from './i-picklist-queue-item-nonstandard-json';

export interface IPicklistQueueItemListUpdateMessage {
    PicklistQueueItems: NonstandardJsonArray<IPicklistQueueItemNonstandardJson>;
}
