import { IItemPicklistLine } from '../../api-xr2/data-contracts/i-item-picklist-line';
import { IQuickPickDispenseBox } from '../../api-xr2/data-contracts/i-quick-pick-dispense-box';

export class QuickPickDispenseBox implements IQuickPickDispenseBox {
  OrderId: string;
  DrawerId: string;
  PriorityCode: string;
  PriorityCodeColor: string;
  Destination: string;
  DestinationId: string;
  DestinationType: string;
  PriorityCodeDescription: string;
  ItemPicklistLines: Array<IItemPicklistLine>;
  Date: string;
}
