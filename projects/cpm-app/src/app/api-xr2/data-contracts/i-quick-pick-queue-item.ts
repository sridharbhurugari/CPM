import { Guid } from "guid-typescript";

export class IQuickPickQueueItem {
  BoxIdentifier: Guid;
  PriorityColor: string;
  PriorityDescription: string;
  DestinationLine1: string;
  DestinationLine2: string;
  PriorityCodeDescription: string;
  BoxNumber: number;
  BoxCount: number;
  BoxBarcode: string;
}
