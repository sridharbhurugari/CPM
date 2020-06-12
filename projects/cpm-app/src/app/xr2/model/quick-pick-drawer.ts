import { IQuickPickDrawer } from '../../api-xr2/data-contracts/i-quick-pick-drawer';
import { QuickPickDispenseBox } from './quick-pick-dispense-box';

export class QuickPickDrawer implements IQuickPickDrawer {
  Id: string;
  Status: string;
  QuickPickDispenseBox: QuickPickDispenseBox;
  DetailedView: boolean;
  CurrentBoxIndex: number;
  TotalBoxCount: number;
  State: number;
}
