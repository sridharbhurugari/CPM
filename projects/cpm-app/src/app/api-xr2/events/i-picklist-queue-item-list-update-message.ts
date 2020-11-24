import { NonstandardJsonArray } from '../../shared/events/i-nonstandard-json-array';
import { IPicklistQueueGroupKeyNonStandardJson } from './i-picklist-queue-group-key-nonstandard.json';
import { IPicklistQueueItemNonstandardJson } from './i-picklist-queue-item-nonstandard-json';

export interface IPicklistQueueItemListUpdateMessage {
    PicklistQueueItems: NonstandardJsonArray<IPicklistQueueItemNonstandardJson>;
    AvailablePicklistQueueGroupKeys: NonstandardJsonArray<IPicklistQueueGroupKeyNonStandardJson>;
    DeviceId: number;
    PickPriorityIdentity: number;
}
