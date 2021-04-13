import { NumericComponent } from '@omnicell/webcorecomponents';
import { IExpiringMedicationInfo} from '../../api-xr2/data-contracts/i-utilization-expiring-medication-info';

export class ExpiringMedicationInfo implements IExpiringMedicationInfo {
  constructor(utilizationTypeInfo: IExpiringMedicationInfo) {
    Object.assign(this, utilizationTypeInfo);
  }
  ItemCode: string;
  PocketTypeId: number;
  Inventory: number;
  ExpiredCount: number;
  ExpiringCount: number;
}
