export interface IUtilizationDataEvent {
  EventId: string; // = EventTypes.UtilizationDataEvent;
  DeviceId: number;
    //UtilizationDataMessage info:
    CorrelationId: string;
    EventDateTime: Date;
    UtilizationData: any[];
}
