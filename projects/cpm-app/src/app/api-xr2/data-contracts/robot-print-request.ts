import { PickListLineDetail } from './pick-list-line-detail';
import { Guid } from 'guid-typescript';
import { PicklistQueueItem } from '../../xr2/model/picklist-queue-item';
import * as _ from 'lodash';

export class RobotPrintRequest {

  constructor(picklistQueueItem?: PicklistQueueItem) {

    this.PickListLineDetails = new Array<PickListLineDetail>();

    if (picklistQueueItem) {
      this.PickListIdentifier = picklistQueueItem.PicklistId;
      this.RobotPickGroupId = picklistQueueItem.RobotPickGroupId;
      this.DeviceId = picklistQueueItem.DeviceId;
      _.forEach(picklistQueueItem.ItemPicklistLines, (itemPicklistLine) => {
        const pickListLineDetail = new PickListLineDetail();
        pickListLineDetail.PickListLineIdentifier = itemPicklistLine.PicklistLineId;
        pickListLineDetail.ItemId = itemPicklistLine.ItemId;
        pickListLineDetail.Quantity = itemPicklistLine.Qty;
        pickListLineDetail.DestinationType = picklistQueueItem.DestinationType;
        pickListLineDetail.PickLocationDeviceLocationId = itemPicklistLine.PickLocationDeviceLocationId;
        pickListLineDetail.PickLocationDescription = itemPicklistLine.PickLocationDescription;
        this.PickListLineDetails.push(pickListLineDetail);
      });
    }
  }

  PickListIdentifier: string;
  RobotPickGroupId: Guid;
  PickListLineDetails: Array<PickListLineDetail>;
  DeviceId: number;
}
