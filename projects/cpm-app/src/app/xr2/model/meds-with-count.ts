import { IMedsWithCount } from '../../api-xr2/data-contracts/i-meds-with-count';

export class MedsWithCount implements IMedsWithCount {
  constructor(medsWithCount: IMedsWithCount) {
    Object.assign(this, medsWithCount);
  }

  MedicationName: string;
  FilledMedicationCount: number;
  RequestedMedicationCount: number;
}
