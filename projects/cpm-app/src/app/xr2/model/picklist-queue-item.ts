import { IPicklistQueueItem } from '../../api-xr2/data-contracts/i-picklist-queue-item';

export class PicklistQueueItem implements IPicklistQueueItem {

  constructor(picklistQueueItem: IPicklistQueueItem) {
    Object.assign(this, picklistQueueItem);
    this.GenerateStatusDisplay();
  }

  PriorityCode: string;
  PriorityCodeColor: string;
  Destination: string;
  PriorityCodeDescription: string;
  ItemCount: number;
  FilledItemCount: number;
  Status: string;
  StatusDisplay: string;
  DeviceDescription: string;
  OutputDevice: string;

  GenerateStatusDisplay() {
    if (this.Status === 'SENT') {
      this.StatusDisplay = this.FilledItemCount + ' of ' + this.ItemCount;
      return;
    }

    this.StatusDisplay = this.Status;
  }
}
