import { IItemManagement } from "../../api-core/data-contracts/i-item-management";

export class ItemManagement implements IItemManagement {
  ItemId: string;  ItemDescription: string;
  TotalQtyOnHand: number;
  UnitDoseQtyOnHand: number;
  BulkQtyOnHand: number;
  UnitDoseLocationCount: number;
  BulkLocationCount: number;
  UnitOfMeasure: string;
}
