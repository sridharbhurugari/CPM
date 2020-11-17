import { OperationType } from "./operation-type";

export class WorkstationTrackerData {
  Id: string;
  WorkstationShortName: string;
  Operation: OperationType;
  ConnectionId: string;
}
