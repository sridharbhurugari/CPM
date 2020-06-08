import { IItemPicklistLine } from '../../api-xr2/data-contracts/i-item-picklist-line';
import { IQuickPickOrderItem } from '../../api-xr2/data-contracts/i-quick-pick-order-item';
export class QuickPickOrderItem implements IQuickPickOrderItem {
  OrderId: string;
  DrawerId: string;
  PriorityCode: string;
  PriorityCodeColor: string;
  Destination: string;
  DestinationId: string;
  DestinationType: string;
  PriorityCodeDescription: string;
  ItemPicklistLines: Array<IItemPicklistLine>;
  BoxCount: number;
  FilledBoxCount: number;
  Date: string;
}
