import { IItemPicklistLine } from './i-item-picklist-line';
export class IQuickPickDispenseBox {
  OrderId: string;
  PriorityCode: string;
  PriorityCodeColor: string;
  Destination: string;
  DestinationId: string;
  DestinationType: string;
  PriorityCodeDescription: string;
  ItemPicklistLines: Array<IItemPicklistLine>;
  Date: string;
  FilledQty: number;
  ReqQty: number;
  ItemsFilled: number;
}
