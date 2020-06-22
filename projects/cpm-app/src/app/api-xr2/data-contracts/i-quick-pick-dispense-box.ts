import { IItemPicklistLine } from './i-item-picklist-line';
import { IQuickPickPicklistItem } from './i-quick-pick-picklist-item';
export class IQuickPickDispenseBox {
  OrderId: string;
  PriorityCode: string;
  PriorityCodeColor: string;
  DestinationLine1: string;
  DestinationLine2: string;
  DestinationId: string;
  DestinationType: string;
  PriorityCodeDescription: string;
  ItemPicklistLines: Array<IItemPicklistLine>;
  PicklistItems: Array<IQuickPickPicklistItem>;
  Date: string;
  FilledQty: number;
  ReqQty: number;
  ItemsFilled: number;
}
