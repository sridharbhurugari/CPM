import { QuickPickDispenseBox } from '../../xr2/model/quick-pick-dispense-box';

export interface IQuickPickDrawer {
  Id: string;
  Status: string;
  QuickPickDispenseBoxes: QuickPickDispenseBox[];
  DetailedView: boolean;
  CurrentBoxIndex: number;
}
