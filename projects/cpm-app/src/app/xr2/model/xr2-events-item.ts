import { IXr2EventsItem } from '../../api-xr2/data-contracts/i-xr2-events-item';

export class Xr2EventsItem implements IXr2EventsItem {

  constructor(Xr2EventsItem: IXr2EventsItem) {
    Object.assign(this, Xr2EventsItem);
  }
  RobotEventId: number;
  EventLevel: string;
  EventDescription: string;
  EventDateTime: string;
  EventDeviceName: string;
  RobotEventDetails:string;
  EventSeverity:number;
  Active: boolean;
}
