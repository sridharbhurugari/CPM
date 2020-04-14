import { IItemPicklistLine } from "./i-item-picklist-line";

export interface IPicklistQueueItem {
  PicklistId: string;
  OrderId: string;
  DeviceLocationId: number;
  ItemPicklistLines: Array<IItemPicklistLine>;
  PriorityCode: string;
  PriorityCodeColor: string;
  Destination: string;
  DestinationId: string;
  PriorityCodeDescription: string;
  BoxCount: number;
  FilledBoxCount: number;
  Status: number;
  StatusDisplay: string;
  DeviceDescription: string;
  DeviceId: number;
  OutputDevice: string;
}