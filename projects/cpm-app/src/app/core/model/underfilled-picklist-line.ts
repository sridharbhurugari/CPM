import { IUnderfilledPicklistLine } from '../../api-core/data-contracts/i-underfilled-picklist-line';
import { PicklistDestinationDescriptionHelper } from '../utilities/picklist-destination-description-helper';

export class UnderfilledPicklistLine implements IUnderfilledPicklistLine {
    constructor(data: IUnderfilledPicklistLine){
        Object.assign(this, data);
        this.DisplayPatientRoomAndArea = PicklistDestinationDescriptionHelper.DisplayPatientRoomAndArea(1, this.PicklistTypeDb, this.PatientRoom, this.AreaDescription);
        this.DisplayPatientRoom = PicklistDestinationDescriptionHelper.DisplayPatientRoom(1, this.PicklistTypeDb, this.PatientRoom, this.AreaDescription);
        this.DisplayArea = PicklistDestinationDescriptionHelper.DisplayArea(1, 1, this.PicklistTypeDb, this.PriorityCode, this.PatientRoom, this.AreaDescription);
        this.DisplayOmniName = PicklistDestinationDescriptionHelper.DisplayOmniName(1, 1, this.PicklistTypeDb, this.PriorityCode, this.PatientRoom, this.AreaDescription);
        this.DisplayPatientNameSecondLine = PicklistDestinationDescriptionHelper.DisplayPatientNameSecondLine(1, this.PicklistTypeDb, this.PriorityCode);
    }

    PriorityCode: string;
    PicklistTypeDb: string;
    ItemFormattedGenericName: string;    
    ItemBrandName: string;
    PatientRoom: string;
    PatientName: string;
    AreaDescription: string;
    DestinationOmni: string;
    FillDate: Date;
    PickItemLocationDescription: string;
    FillQuantity: number;
    OrderQuantity: number;

    DisplayPatientRoomAndArea: boolean;
    DisplayPatientRoom: boolean;
    DisplayArea: boolean;
    DisplayOmniName: boolean;
    DisplayPatientNameSecondLine: boolean;
}