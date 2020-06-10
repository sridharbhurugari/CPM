import { Guid } from "guid-typescript";

export class IQuickPickQueueItem {
  BoxIdentifier: Guid;
  PriorityColor: string;
  PriorityDescription: string;
  DestinationDescription: string;
  PriorityCodeDescription: string;
  BoxNumber: number;
  BoxCount: number;
  BoxBarcode: string;
}
