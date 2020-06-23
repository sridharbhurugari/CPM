import { IQuickPickPicklistItem } from './../../api-xr2/data-contracts/i-quick-pick-picklist-item';

export class QuickPickPicklistItem implements IQuickPickPicklistItem {
  constructor(quickPickPicklistItem: IQuickPickPicklistItem) {
    Object.assign(this, quickPickPicklistItem);
  }

  Label: string;
  FilledQty: number;
  ReqQty: number;
}
