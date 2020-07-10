import {IGuidedManualCycleCountScanItem } from "./IGuidedMaualCycleCountScanItem"
export class GuidedManualCycleCountScanItem {
    constructor(scanCycleCountItem: IGuidedManualCycleCountScanItem) {
        Object.assign(this, scanCycleCountItem);
      }
    ItemId: string;
    Barcode: string;
    ProductId: string;
    
  }
  