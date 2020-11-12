import { IPicklistQueueItemNonstandardJson } from './i-picklist-queue-item-nonstandard-json';

export interface IPicklistQueueItemUpdateMessage {
    PicklistQueueItem: IPicklistQueueItemNonstandardJson;
    PriorityCode: string;
    DeviceId: number;
}
