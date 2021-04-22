import { IErroredMedicationInfo } from '../../api-xr2/data-contracts/i-utilization-errored-medication-info';

export class ErroredMedicationInfo implements IErroredMedicationInfo {
  constructor(utilizationTypeInfo: IErroredMedicationInfo) {
    Object.assign(this, utilizationTypeInfo);
  }
  ItemCode: string;
  PocketTypeId: number;
  ErrorsCount: number;
}
