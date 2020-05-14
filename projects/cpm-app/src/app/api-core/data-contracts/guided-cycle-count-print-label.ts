import { IGuidedCycleCountPrintLabel } from './i-guided-cycle-count-print-label';

export class GuidedCycleCountPrintLabel implements IGuidedCycleCountPrintLabel {
  constructor(guidedCycleCountPrintLabel: IGuidedCycleCountPrintLabel){
    Object.assign(this, guidedCycleCountPrintLabel);
  }
  
    ItemId: string;
    DosageForm: string;
    DeviceId: number;
    DeviceLocationId: number;
    DeviceLocationDescription: string;
    TradeName: string;
    GenericName: string;
    UnitOfIssue: string;
}