import { PickListLineDetail } from './pick-list-line-detail';

export class RobotPrintRequest {

  constructor() {
    this.PickListLineDetails = new Array<PickListLineDetail>();
  }

  PickListIdentifier: string;
  PickListLineDetails: Array<PickListLineDetail>;
}
