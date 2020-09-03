import { PickListLineDetail } from './pick-list-line-detail';
import { Guid } from 'guid-typescript';

export class RobotPrintRequest {

  constructor(picklistIdentifier: string, robotPickGroupId: Guid) {
    this.PickListLineDetails = new Array<PickListLineDetail>();
    this.PickListIdentifier = picklistIdentifier;
    this.RobotPickGroupId = robotPickGroupId;
  }

  PickListIdentifier: string;
  RobotPickGroupId: Guid;
  PickListLineDetails: Array<PickListLineDetail>;
}
