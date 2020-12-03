import * as _ from 'lodash';
import { PicklistQueueItem } from '../../xr2/model/picklist-queue-item';
import { PickListLineDetail } from './pick-list-line-detail';

export class GlobalDispenseSyncRequest {

  constructor(picklistQueueItem?: PicklistQueueItem) {
    this.PickListLineDetails = new Array<PickListLineDetail>();

    if (picklistQueueItem) {
      this.PickListIdentifier = picklistQueueItem.PicklistId;
      this.DestinationType = picklistQueueItem.DestinationType;
      this.OutputDeviceId = picklistQueueItem.OutputDeviceId;
      this.DeviceId = picklistQueueItem.DeviceId;
      _.forEach(picklistQueueItem.ItemPicklistLines, (itemPicklistLine) => {
        const pickListLineDetail = new PickListLineDetail();
        pickListLineDetail.PickListLineIdentifier = itemPicklistLine.PicklistLineId;
        pickListLineDetail.DestinationId = itemPicklistLine.DestinationId;
        pickListLineDetail.ItemId = itemPicklistLine.ItemId;
        pickListLineDetail.Quantity = itemPicklistLine.Qty;
        pickListLineDetail.PickLocationDeviceLocationId = itemPicklistLine.PickLocationDeviceLocationId;
        this.PickListLineDetails.push(pickListLineDetail);
      });
    }
  }

  PickListIdentifier: string;
  DestinationType: string;
  PickListLineDetails: Array<PickListLineDetail>;
  OutputDeviceId: string;
  DeviceId: number;
}
