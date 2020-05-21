import { PickListLineDetail } from './pick-list-line-detail';
import { Guid } from 'guid-typescript';

export class ReroutePickListLine {

  constructor() {
    this.PickListLineIds = new Array();
  }
  
  PickListLineIds: Array<String>;
}
