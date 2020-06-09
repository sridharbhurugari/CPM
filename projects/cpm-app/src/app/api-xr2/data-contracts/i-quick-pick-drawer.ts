import { QuickPickOrderItem } from './../../xr2/model/quick-pick-order-item';

export interface IQuickPickDrawer {
  Id: string;
  Status: string;
  QuickPickOrderItem: QuickPickOrderItem;
  DetailedView: boolean;
}
