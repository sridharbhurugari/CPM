import { IDestockDataEvent } from "../../api-xr2/data-contracts/i-destock-data-event";
import { DestockTypeInfo } from "./destock-type-info";

export class DestockDataEvent  implements IDestockDataEvent {
  constructor(destockDataEvent: IDestockDataEvent) {
    Object.assign(this, destockDataEvent);
  }
  EventId: string; // = EventTypes.DestockDataEvent;
  DeviceId: number;

  //DestockDataMessage info:
  CorrelationId: string;
  EventDateString: string;
  DestockTypeInfoData: DestockTypeInfo[];
}
