import { IPicklistQueueGrouped } from '../data-contracts/i-picklist-queue-grouped';
import { IPicklistQueueGroupedNonstandardJson } from './i-picklist-queue-grouped-nonstandard-json';

export interface IPicklistQueueGroupedListUpdateMessage {
    PicklistQueueGroupedList: IPicklistQueueGroupedNonstandardJson[];
}
