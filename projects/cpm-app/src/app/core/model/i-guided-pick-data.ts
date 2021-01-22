import { IItemLocationDetail } from '../../api-core/data-contracts/i-item-location-detail';
import { IOrderItemPendingQuantity } from '../../api-core/data-contracts/i-order-item-pending-quantity';
import { IPicklistLine } from '../../api-core/data-contracts/i-picklist-line';
import { IItemHeaderInfo } from '../../shared/model/i-item-header-info';

export interface IGuidedPickData {
  quickAdvanceOnScan: boolean;
  picklistLineIndex: number;
  totalLines: number;
  pharmacyQoh: number;
  itemHeaderInfo: IItemHeaderInfo;
  orderItemPendingQtys: IOrderItemPendingQuantity;
  pickLocation: IItemLocationDetail;
  isProductScanRequired: boolean;
  isLastLine: boolean;
  picklistLine: IPicklistLine;
  highPriorityAvailable: boolean;
}