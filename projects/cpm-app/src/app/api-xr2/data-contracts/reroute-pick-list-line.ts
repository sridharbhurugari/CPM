import { PickListLineDetail } from './pick-list-line-detail';

export class ReroutePickListLine {

  constructor() {
    this.PickListLineDetails = new Array<PickListLineDetail>();
  }

  PickListLineId: string;
  PickListLineDetails: Array<PickListLineDetail>;
}
