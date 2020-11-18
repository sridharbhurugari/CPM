import { IItemPicklistLine } from './i-item-picklist-line';

export interface IReroutablePicklistQueueItem {
  PicklistId: string;
  ItemPicklistLines: Array<IItemPicklistLine>;
  DeviceId: number;
}
