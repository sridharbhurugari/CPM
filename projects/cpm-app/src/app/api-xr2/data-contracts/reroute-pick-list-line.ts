import { PickListLineDetail } from './pick-list-line-detail';
import { Guid } from 'guid-typescript';

export class ReroutePickListLine {

  constructor() {
    this.PickListLineDetails = new Array<PickListLineDetail>();
  }
  
  PickListLineId: Guid;
  PickListLineDetails: Array<PickListLineDetail>;
}
