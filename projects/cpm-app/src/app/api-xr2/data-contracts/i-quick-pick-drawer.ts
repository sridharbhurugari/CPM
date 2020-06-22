import { QuickPickDispenseBox } from '../../xr2/model/quick-pick-dispense-box';

export interface IQuickPickDrawer {
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
