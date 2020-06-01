import { IGuidedManualCycleCountItemid } from "./i-guided-manual-cycle-count-itemid";
import { IDeviceLocationAccessComponentData } from "../../shared/model/i-device-location-access-component-data";

export class GuidedManualCycleCountItemid
  implements IGuidedManualCycleCountItemid, IDeviceLocationAccessComponentData {
  constructor(manualcyclecountitem: IGuidedManualCycleCountItemid) {
    Object.assign(this, manualcyclecountitem);
    this.DeviceLocationAccessQuantity = this.QuantityOnHand;
    this.DeviceLocationAccessUnits = this.Units;
    this.ItemTradeName = this.ItemTradeName;
    this.ItemGenericNameFormatted = this.GenericNameFormatted;
  }

  DeviceLocationAccessQuantity: number;
  DeviceLocationAccessUnits: string;
  ItemTradeName: string;
  ItemGenericNameFormatted: string;

  SlotNumber: number;
  BinNumber: number;
  ShelfNumber: number;
  DeviceLocationTypeId: string;
  DeviceId: number;
  DeviceDescription: string;
  DeviceLocationId: number;
  ItemId: string;
  GenericNameFormatted: string;
  BrandNameFormatted: string;
  Units: string;
  ParLevel: number;
  ReorderLevel: number;
  ExpirationDate: Date;
  ExpirationDateFormatted: string;
  LocationDescription: string;
  QuantityOnHand: number;
  ReorderSource: string;
  ItmExpDateGranularity: string;
  QuantityMin: number;
  InStockQuantity: number;
  ItemDateFormat: string;
  PackageFormType: string;
  PackageFormName: string;
  DrugId: string;
  ManufacturerName: string;
}
