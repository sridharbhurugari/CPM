import { IItemPicklistLine } from '../../api-xr2/data-contracts/i-item-picklist-line';
export class IQuickPickOrderItem {
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
