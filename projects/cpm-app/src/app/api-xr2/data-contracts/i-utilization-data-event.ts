export interface IUtilizationDataEvent {
  EventId: string; // = EventTypes.UtilizationDataEvent;
  DeviceId: number;
  EventDateTime: Date;
  UtilizationData: any[];
}
