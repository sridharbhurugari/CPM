import { IQuickPickDrawer } from '../../api-xr2/data-contracts/i-quick-pick-drawer';
import { QuickPickOrderItem } from '../model/quick-pick-order-item';

export class QuickPickDrawer implements IQuickPickDrawer {

  Id: string;
  Status: string;
  QuickPickOrderItem: QuickPickOrderItem;
}
