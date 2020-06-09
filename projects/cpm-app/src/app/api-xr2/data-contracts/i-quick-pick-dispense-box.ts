import { IItemPicklistLine } from './i-item-picklist-line';
export class IQuickPickDispenseBox {
  OrderId: string;
  DrawerId: string;
  PriorityCode: string;
  PriorityCodeColor: string;
  Destination: string;
  DestinationId: string;
  DestinationType: string;
  PriorityCodeDescription: string;
  ItemPicklistLines: Array<IItemPicklistLine>;
  Index: number;
  Date: string;
}
