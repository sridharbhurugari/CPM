import { IUtilizationDataEvent } from "../../api-xr2/data-contracts/i-utilization-data-event";

export class UtilizationDataEvent  implements IUtilizationDataEvent {
  constructor(utilizationDataEvent: IUtilizationDataEvent) {
    Object.assign(this, utilizationDataEvent);
  }
  EventId: string; // = EventTypes.UtilizationDataEvent;
  DeviceId: number;
  //UtilizationDataMessage info:
  CorrelationId: string;
  EventDateTime: Date;
  UtilizationData: any[];
}
