import { RestockTypes } from '../constants/restock-types';
import { DispensePriorityCodes } from '../constants/dispense-priority-codes';

export class PicklistTypeHelper {
    public static IsManualDispense(picklistTypeDb: string, priorityCode: string): boolean {
        return picklistTypeDb == RestockTypes.DispenseToDestination
            && (priorityCode == DispensePriorityCodes.Area || priorityCode == DispensePriorityCodes.Cabinet
                || priorityCode == DispensePriorityCodes.Patient ||
                priorityCode == DispensePriorityCodes.RemoteOrder);
    }

    public static IsPatientMedOrderOrManualDispense(picklistTypeDb: string, priorityCode: string): boolean{
        return this.IsPatientMedOrder(picklistTypeDb) || this.IsManualDispense(picklistTypeDb, priorityCode);
    }

    public static IsPatientMedOrder(pickListTypeDb: string): boolean {
        return pickListTypeDb == RestockTypes.PatientMedOrder;
    }

    public static IsSelectiveRestock(picklistTypeDb: string, priorityCode: string): boolean {
        return picklistTypeDb == RestockTypes.SelectiveRestock
            && priorityCode != DispensePriorityCodes.Cabinet
            && priorityCode != DispensePriorityCodes.Area;
    }

    public static IsCabinetRestock(picklistTypeDb: string, priorityCode: string): boolean {
        return picklistTypeDb == RestockTypes.NormalRestock
            || picklistTypeDb == RestockTypes.StockOut
            || picklistTypeDb == RestockTypes.CriticalLowRestock
            || this.IsSelectiveRestock(picklistTypeDb, priorityCode);
    }

    public static IsNormalCabinetRestock(picklistTypeDb: string, priorityCode: string): boolean {
        return picklistTypeDb == RestockTypes.NormalRestock && priorityCode == DispensePriorityCodes.Normal;
    }

    public static IsStockOut(picklistTypeDb: string) {
        return picklistTypeDb == RestockTypes.StockOut;
    }
}