import { IGuidedManualCycleCountItems } from "./i-guided-manual-cycle-count-items";
export class GuidedManualCycleCountItems {
  constructor(deviceCycleCountItem: IGuidedManualCycleCountItems) {
    Object.assign(this, deviceCycleCountItem);
  }

  ID: string;
  GenericNameFormatted: string;
  TradeNameFormatted: string;
  TradeName: string;
}
