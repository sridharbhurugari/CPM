import { TranslationChangeEvent } from "@ngx-translate/core";

export interface IItemPicklistLine {
  ItemId: string;
  PicklistLineId: string;
  Qty: number;
  PickLocationDeviceLocationId: number;
  PickLocationDescription: string;
}
