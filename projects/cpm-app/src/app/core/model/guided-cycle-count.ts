import { IGuidedCycleCount } from '../../api-core/data-contracts/i-guided-cycle-count';
import { IDeviceLocationAccessComponentData } from '../../shared/model/i-device-location-access-component-data';

export class GuidedCycleCount implements IGuidedCycleCount, IDeviceLocationAccessComponentData {

  constructor(guidedCycleCount: IGuidedCycleCount){
    Object.assign(this, guidedCycleCount);
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
  BrandNameFormatted: string;
  GenericNameFormatted: string;
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
  DosageForm: string;
}
