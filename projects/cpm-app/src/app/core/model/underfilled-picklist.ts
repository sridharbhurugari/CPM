import { IUnderfilledPicklist } from '../../api-core/data-contracts/i-underfilled-picklist';
import { PicklistDescriptionHelper } from '../utilities/picklist-description-helper';
import { PicklistDestinationDescriptionHelper } from '../utilities/picklist-destination-description-helper';

export class UnderfilledPicklist implements IUnderfilledPicklist{
    constructor(underfilledPicklist: IUnderfilledPicklist){
        Object.assign(this, underfilledPicklist);

        this.DisplayGenericName = PicklistDescriptionHelper.DisplayGenericName(this.UnderfilledItemCount, this.PicklistTypeDb, this.PriorityCode);
        this.DisplayItemCount = PicklistDescriptionHelper.DisplayItemCount(this.UnderfilledItemCount, this.PicklistTypeDb, this.PriorityCode);
        this.DisplayBrandName = PicklistDescriptionHelper.DisplayBrandName(this.UnderfilledItemCount, this.PicklistTypeDb, this.PriorityCode);

        this.DisplayPatientCount = PicklistDestinationDescriptionHelper.DisplayPatientCount(this.UnderfilledPatientCount, this.PicklistTypeDb);
        this.DisplayPatientRoomAndArea = PicklistDestinationDescriptionHelper.DisplayPatientRoomAndArea(this.UnderfilledPatientCount, this.PicklistTypeDb, this.PatientRoom, this.AreaDescription);
        this.DisplayPatientRoom = PicklistDestinationDescriptionHelper.DisplayPatientRoom(this.UnderfilledPatientCount, this.PicklistTypeDb, this.PatientRoom, this.AreaDescription);
        this.DisplayArea = PicklistDestinationDescriptionHelper.DisplayArea(this.UnderfilledPatientCount, this.UnderfilledDestinationCount, this.PicklistTypeDb, this.PriorityCode, this.PatientRoom, this.AreaDescription);
        this.DisplayMultiDestination = PicklistDestinationDescriptionHelper.DisplayMultiDestination(this.UnderfilledDestinationCount, this.PicklistTypeDb);
        this.DisplayPatientNameSecondLine = PicklistDestinationDescriptionHelper.DisplayPatientNameSecondLine(this.UnderfilledDestinationCount, this.PicklistTypeDb, this.PriorityCode);
        this.DisplayOmniName = PicklistDestinationDescriptionHelper.DisplayOmniName(this.UnderfilledPatientCount, this.UnderfilledDestinationCount, this.PicklistTypeDb, this.PriorityCode, this.PatientRoom, this.AreaDescription);
    }

    OrderId: string;
    SequenceOrder: number;
    RouteName: string;
    PicklistTypeDb: string;
    PriorityCode: string;
    PriorityDescription: string;
    PriorityColorCode: string;
    UnderfilledItemCount: number;
    UnderfilledPatientCount: number;
    UnderfilledDestinationCount: number;
    ItemId: string;
    ItemFormattedGenericName: string;
    ItemBrandName: string;
    PatientRoom: string;
    PatientName: string;
    PatientVisitId: string;
    PatientMedicalRecordNumber: string;
    AreaDescription: string;
    DestinationOmni: string;
    CompletedDate: Date;

    DisplayBrandName: boolean;
    DisplayGenericName: boolean;
    DisplayItemCount: boolean;

    DisplayPatientCount: boolean;
    DisplayPatientRoomAndArea: boolean;
    DisplayPatientRoom: boolean;
    DisplayArea: boolean;
    DisplayMultiDestination: boolean;

    DisplayPatientNameSecondLine: boolean;
    DisplayOmniName: boolean;

    get DisplayRouteName(): boolean{
        return !this.DisplayBrandName && !this.DisplayGenericName && ! this.DisplayItemCount;
    }
}