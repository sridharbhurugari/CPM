import { IItemPicklistLine } from '../../api-xr2/data-contracts/i-item-picklist-line';
import { IQuickPickDispenseBox } from '../../api-xr2/data-contracts/i-quick-pick-dispense-box';
import { IQuickPickPicklistItem} from '../../api-xr2/data-contracts/i-quick-pick-picklist-item';

export class QuickPickDispenseBox implements IQuickPickDispenseBox {
  constructor(quickPickDispenseBox: IQuickPickDispenseBox) {
    Object.assign(this, quickPickDispenseBox);
  }
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
