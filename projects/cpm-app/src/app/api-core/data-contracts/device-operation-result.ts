import { DeviceOperationOutcome } from './device-operation-outcome';

export class DeviceOperationResult {
  OutcomeText: string;
  IsSuccessful: boolean;
  Outcome: DeviceOperationOutcome;
}
