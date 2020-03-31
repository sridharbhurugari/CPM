import { PickListLineDetail } from "./pick-list-line-detail";

export class GlobalDispenseSyncRequest {

  constructor() {
    this.PickListLineDetails = new Array<PickListLineDetail>();
  }

  PickListIdentifier: string;
  DestinationType: string;
  PickListLineDetails: Array<PickListLineDetail>;
}
