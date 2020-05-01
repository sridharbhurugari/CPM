import { DeviceOperationOutcome } from '../../shared/enums/device-operation-outcome';

export interface IDeviceOperationResult {
    IsSuccessful: boolean;
    Outcome: DeviceOperationOutcome;
    OutcomeText: string;
}