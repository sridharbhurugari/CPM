import { IQuickPickOrderItem } from '../../api-xr2/data-contracts/i-quick-pick-order-item';

export class QuickPickOrderItem implements IQuickPickOrderItem {

  constructor(quickPickOrderItem: IQuickPickOrderItem) {
    Object.assign(this, quickPickOrderItem);
  }
  OrderId: string;
  PriorityCode: string;
  PriorityCodeColor: string;
  Destination: string;
  DestinationId: string;
  DestinationType: string;
  PriorityCodeDescription: string;
  Date: string;
}
