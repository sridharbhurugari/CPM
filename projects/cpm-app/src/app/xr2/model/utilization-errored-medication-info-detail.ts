import { IErroredMedicationInfoDetail } from '../../api-xr2/data-contracts/i-utilization-errored-medication-info-detail';

export class ErroredMedicationInfoDetail implements IErroredMedicationInfoDetail {
  constructor(utilizationTypeInfo: IErroredMedicationInfoDetail) {
    Object.assign(this, ErroredMedicationInfoDetail);
  }
  ItemId: string;
  ItemDescription: string;
  PocketTypeId: number;
  PocketTypeDescription: string;
  ErrorsCount: number;
  ErrorDescription: string;
}
