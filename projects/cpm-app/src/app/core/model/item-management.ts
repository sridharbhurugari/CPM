import { IItemManagement } from '../../api-core/data-contracts/i-item-management';

export class ItemManagement implements IItemManagement {

  constructor(itemManagement: IItemManagement) {
    Object.assign(this, itemManagement);
  }

  ItemId: string;
  ItemDescription: string;
  TotalQtyOnHand: number;
  UnitDoseQtyOnHand: number;
  BulkQtyOnHand: number;
  UnitDoseLocationCount: number;
  UnitOfMeasure: string;
}
