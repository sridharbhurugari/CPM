import { NumericComponent } from '@omnicell/webcorecomponents';
import { IUnassignedMedicationInfo} from '../../api-xr2/data-contracts/i-utilization-unassigned-medication-info';

export class UnassignedMedicationInfo implements IUnassignedMedicationInfo {
  constructor(utilizationTypeInfo: IUnassignedMedicationInfo) {
    Object.assign(this, utilizationTypeInfo);
  }
  ItemCode: string;
  PocketTypeId: number;
  Inventory: number;
}
