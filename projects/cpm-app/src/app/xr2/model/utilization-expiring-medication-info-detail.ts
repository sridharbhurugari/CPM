import { IExpiringMedicationInfoDetail } from '../../api-xr2/data-contracts/i-utilization-expiring-medication-info-detail';

export class ExpiringMedicationInfoDetail implements IExpiringMedicationInfoDetail {
  constructor(utilizationTypeInfo: IExpiringMedicationInfoDetail) {
    Object.assign(this, ExpiringMedicationInfoDetail);
  }
  ItemId: string;
  ItemDescription: string;
  PocketTypeId: number;
  PocketTypeDescription: string;
  Inventory: number;
  ExpiringCount: number;
}
