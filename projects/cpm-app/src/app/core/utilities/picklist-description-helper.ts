import { PicklistTypeHelper } from './picklist-type-helper';
import { } from 'oal-core';

export class PicklistDescriptionHelper{
    public static DisplayGenericName(itemCount: number, picklistTypeDb: string, priorityCode: string): boolean {
        return PicklistTypeHelper.IsMedOrderOrManualDispense(picklistTypeDb, priorityCode) && itemCount == 1;
    }

    public static DisplayItemCount(itemCount: number, picklistTypeDb: string, priorityCode: string): boolean {
        return PicklistTypeHelper.IsMedOrderOrManualDispense(picklistTypeDb, priorityCode) && itemCount > 1
    }

    public static DisplayBrandName(itemCount: number, picklistTypeDb: string, priorityCode: string): boolean {
        return PicklistTypeHelper.IsMedOrderOrManualDispense(picklistTypeDb, priorityCode) && itemCount == 1
    }
}