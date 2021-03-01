import { IDestockTypeInfo } from "./i-destock-type-info";

export interface IDestockDataEvent {
  EventId: string; // = EventTypes.DestockDataEvent;
  DeviceId: number;
    //DestockDataMessage info:
    CorrelationId: string;
    EventDateString: string;
    DestockTypeInfoData: IDestockTypeInfo[];
}
