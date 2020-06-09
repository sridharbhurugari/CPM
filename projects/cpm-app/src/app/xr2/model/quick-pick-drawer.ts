import { IQuickPickDrawer } from '../../api-xr2/data-contracts/i-quick-pick-drawer';
import { QuickPickDispenseBox } from './quick-pick-dispense-box';

export class QuickPickDrawer implements IQuickPickDrawer {

  Id: string;
  Status: string;
  QuickPickDispenseBoxes: QuickPickDispenseBox[];
  DetailedView: boolean;
}
