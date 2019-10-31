import { PicklistTypeHelper } from './picklist-type-helper';

export class PicklistDescriptionHelper{
    public static DisplayGenericName(itemCount: number, picklistTypeDb: string, priorityCode: string): boolean {
        return (PicklistTypeHelper.IsPatientMedOrderOrManualDispense(picklistTypeDb, priorityCode) && itemCount == 1) || PicklistTypeHelper.IsStockOut(picklistTypeDb);
    }

    public static DisplayItemCount(itemCount: number, picklistTypeDb: string, priorityCode: string): boolean {
        return PicklistTypeHelper.IsPatientMedOrderOrManualDispense(picklistTypeDb, priorityCode) && itemCount > 1
    }

    public static DisplayBrandName(itemCount: number, picklistTypeDb: string, priorityCode: string): boolean {
        return PicklistTypeHelper.IsPatientMedOrderOrManualDispense(picklistTypeDb, priorityCode) && itemCount == 1
    }
}