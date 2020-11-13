import { NonstandardJsonArray } from '../../shared/events/i-nonstandard-json-array';
import { PicklistQueueGroupKey } from '../../xr2/model/picklist-queue-group-key';
import { IPicklistQueueItemNonstandardJson } from './i-picklist-queue-item-nonstandard-json';

export interface IPicklistQueueItemListUpdateMessage {
    PicklistQueueItems: NonstandardJsonArray<IPicklistQueueItemNonstandardJson>;
    AvailablePicklistQueueGroupKeys: Array<PicklistQueueGroupKey>;
    DeviceId: number;
    PickPriorityIdentity: number;
}
