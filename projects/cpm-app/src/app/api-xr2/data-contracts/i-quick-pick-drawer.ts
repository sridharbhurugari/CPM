import { QuickPickDispenseBox } from '../../xr2/model/quick-pick-dispense-box';

export interface IQuickPickDrawer {
  Id: string;
  Status: string;
  QuickPickDispenseBox: QuickPickDispenseBox;
  DetailedView: boolean;
  CurrentBoxIndex: number;
  TotalBoxCount: number;
  State: number;
}
