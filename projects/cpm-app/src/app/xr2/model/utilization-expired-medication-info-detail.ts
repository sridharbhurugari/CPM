import { IExpiredMedicationInfoDetail } from '../../api-xr2/data-contracts/i-utilization-expired-medication-info-detail';

export class ExpiredMedicationInfoDetail implements IExpiredMedicationInfoDetail {
  constructor(utilizationTypeInfo: IExpiredMedicationInfoDetail) {
    Object.assign(this, ExpiredMedicationInfoDetail);
  }
  ItemId: string;
  ItemDescription: string;
  PocketTypeId: number;
  PocketTypeDescription: string;
  Inventory: number;
  ExpiredCount: number;
}
