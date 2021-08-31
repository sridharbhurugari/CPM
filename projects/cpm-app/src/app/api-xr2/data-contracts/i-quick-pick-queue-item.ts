import { Guid } from 'guid-typescript';

export class IQuickPickQueueItem {
  PriorityColor: string;
  PriorityDescription: string;
  DestinationLine1: string;
  DestinationLine2: string;
  PriorityCodeDescription: string;
  IncompleteBoxCount: number;
  TotalBoxCount: number;
  RobotDispenseBoxIds: Guid[];
  PicklistId: Guid;
  DeviceId: number;
  OrdersInDrawers: boolean;
  PendingXR2: boolean;
}
