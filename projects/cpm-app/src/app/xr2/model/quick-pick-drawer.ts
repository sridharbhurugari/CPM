import { IQuickPickDrawer } from '../../api-xr2/data-contracts/i-quick-pick-drawer';
import { QuickPickDispenseBox } from './quick-pick-dispense-box';

export class QuickPickDrawer implements IQuickPickDrawer {
  constructor(quickPickDrawer: IQuickPickDrawer) {
    Object.assign(this, quickPickDrawer);
  }
  Id: string;
  Status: string;
  QuickPickDispenseBox: QuickPickDispenseBox;
  DetailedView: boolean;
  BoxNumber: number;
  BoxCount: number;
  State: number;
  StateText: string;
  StateColor: string;
}
