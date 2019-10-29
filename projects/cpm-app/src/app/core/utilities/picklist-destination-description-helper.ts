import { PicklistTypeHelper } from './picklist-type-helper';

export class PicklistDestinationDescriptionHelper{
    public static DisplayPatientCount(patientCount: number, picklistTypeDb: string) : boolean{
        return PicklistTypeHelper.IsPatientMedOrder(picklistTypeDb) && patientCount > 1;
    }

    public static DisplayPatientRoomAndArea(patientCount: number, picklistTypeDb: string, patientRoom: string, area: string) : boolean{
        return PicklistTypeHelper.IsPatientMedOrder(picklistTypeDb) && patientCount == 1 && !!patientRoom && !!area;
    }

    public static DisplayPatientRoom(patientCount: number, picklistTypeDb: string, patientRoom: string, area: string) : boolean{
        return PicklistTypeHelper.IsPatientMedOrder(picklistTypeDb) && patientCount == 1 && !!patientRoom && !area;
    }

    public static DisplayMultiDestination(destinationCount: number, picklistTypeDb: string) : boolean{
        return !PicklistTypeHelper.IsPatientMedOrder(picklistTypeDb) && this.IsMultiDestination(destinationCount);
    }

    public static DisplayArea(patientCount: number, destinationCount: number, picklistTypeDb: string, priorityCode: string, patientRoom: string, area: string) : boolean{
        return this.DisplayPatientArea(patientCount, picklistTypeDb, patientRoom, area) ||
               this.DisplayGenericArea(destinationCount, picklistTypeDb, priorityCode);
    }

    public static DisplayOmniName(patientCount: number, destinationCount: number, picklistTypeDb: string, priorityCode: string, patientRoom: string, area: string){
        return this.DisplayOmniNameFirstLine(patientCount, destinationCount, picklistTypeDb, priorityCode, patientRoom, area) ||
               this.DisplayOmniNameSecondLine(destinationCount, picklistTypeDb, priorityCode)
    }

    public static DisplayPatientNameSecondLine(destinationCount: number, picklistTypeDb: string, priorityCode: string){
        return destinationCount <= 1 && !PicklistTypeHelper.IsManualDispense(picklistTypeDb, priorityCode);
    }

    private static DisplayPatientArea(patientCount: number, picklistTypeDb: string, patientRoom: string, area: string) : boolean{
        return PicklistTypeHelper.IsPatientMedOrder(picklistTypeDb) && patientCount == 1 && !patientRoom && !!area;
    }

    private static DisplayGenericArea(destinationCount: number, picklistTypeDb: string, priorityCode: string){
        return !PicklistTypeHelper.IsPatientMedOrder(picklistTypeDb) && !this.IsMultiDestination(destinationCount) &&
        (PicklistTypeHelper.IsStockOut(picklistTypeDb) || PicklistTypeHelper.IsManualDispense(picklistTypeDb, priorityCode) || PicklistTypeHelper.IsSelectiveRestock(picklistTypeDb, priorityCode))
    }

    private static IsMultiDestination(destinationCount: number): boolean {
        return destinationCount > 1;
    }

    private static DisplayOmniNameFirstLine(patientCount: number, destinationCount: number, picklistTypeDb: string, priorityCode: string, patientRoom: string, area: string){
        return !this.DisplayPatientCount(patientCount, picklistTypeDb) && 
        !this.DisplayPatientRoomAndArea(patientCount, picklistTypeDb, patientRoom, area) && 
        !this.DisplayPatientRoom(patientCount, picklistTypeDb, patientRoom, area) &&
        !this.DisplayArea(patientCount, destinationCount, picklistTypeDb, priorityCode, patientRoom, area) && 
        !this.DisplayMultiDestination(destinationCount, picklistTypeDb);
    }

    private static DisplayOmniNameSecondLine(destinationCount: number, picklistTypeDb: string, priorityCode: string){
        return destinationCount <= 1 && PicklistTypeHelper.IsManualDispense(picklistTypeDb, priorityCode);
    }
}