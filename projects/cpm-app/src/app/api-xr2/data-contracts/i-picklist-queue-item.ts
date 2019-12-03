import { IItemPicklistLine } from "./i-item-picklist-line";

export interface IPicklistQueueItem {
  PicklistId: string;
  ItemPicklistLines: Array<IItemPicklistLine>;
  PriorityCode: string;
  PriorityCodeColor: string;
  Destination: string;
  PriorityCodeDescription: string;
  ItemCount: number;
  FilledItemCount: number;
  Status: number;
  StatusDisplay: string;
  DeviceDescription: string;
  DeviceId: number;
  OutputDevice: string;
}
