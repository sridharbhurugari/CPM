import { IUnderfilledPicklistLine } from '../../api-core/data-contracts/i-underfilled-picklist-line';
import { PicklistDestinationDescriptionHelper } from '../utilities/picklist-destination-description-helper';

export class UnderfilledPicklistLine implements IUnderfilledPicklistLine {
    constructor(data: IUnderfilledPicklistLine) {
        Object.assign(this, data);
        this.DisplayPatientRoomAndArea = PicklistDestinationDescriptionHelper.DisplayPatientRoomAndArea(1, this.PicklistTypeDb, this.PatientRoom, this.AreaDescription);
        this.DisplayPatientRoom = PicklistDestinationDescriptionHelper.DisplayPatientRoom(1, this.PicklistTypeDb, this.PatientRoom, this.AreaDescription);
        this.DisplayArea = PicklistDestinationDescriptionHelper.DisplayArea(1, 1, this.PicklistTypeDb, this.PriorityCode, this.PatientRoom, this.AreaDescription);
        this.DisplayOmniName = PicklistDestinationDescriptionHelper.DisplayOmniName(1, 1, this.PicklistTypeDb, this.PriorityCode, this.PatientRoom, this.AreaDescription);
        this.DisplayPatientNameSecondLine = PicklistDestinationDescriptionHelper.DisplayPatientNameSecondLine(1, this.PicklistTypeDb, this.PriorityCode);
    }
    PicklistLineId: string;
    DestinationId: string;
    DestinationType: string;
    PriorityCode: string;
    PicklistTypeDb: string;
    ItemId: string;
    ItemFormattedGenericName: string;
    ItemBrandName: string;
    PatientRoom: string;
    PatientName: string;
    AreaDescription: string;
    DestinationOmni: string;
    FillDate: Date;
    PickItemLocationDescription: string;
    FillQuantity: number;
    OrderId: string;
    OrderQuantity: number;
    ItemFoundInCPM: string;  // unknown item identifier
    ItemLocation: string; // unassigned item identifier
    InDeviceItem: string; // missing route

    IsChecked = false;
    DisplayPatientRoomAndArea: boolean;
    DisplayPatientRoom: boolean;
    DisplayArea: boolean;
    DisplayOmniName: boolean;
    DisplayPatientNameSecondLine: boolean;
    PharmacyQOH: number;
    UnfilledReason: string;
    PrintFillDate: string;
    DisplayFillRequired: string;
    DisplayDestionationValue: string;
    ItemFormatedDescription: string;
    ItemBrandDescription: string;
    ItemIdDescription: string;
    AreaDesctiptionForReport: string;
    patientNameForReport: string;
    DestinationOmniForReport: string;

get canReroute(): boolean {
  return !(!(this.ItemFoundInCPM) || !(this.ItemLocation) || !(this.InDeviceItem));
}

    get DestinationSortValue(): string {
        if (this.DestinationType === 'P') {
            return this.PatientName;
        }

        if (this.DestinationType === 'A') {
            return this.AreaDescription;
        }

        if (this.DestinationType === 'O') {
            return this.DestinationOmni;
        }

        return this.DestinationId;
    }

    get DescriptionSortValue(): string {
        if (this.ItemFormattedGenericName) {
            return this.ItemFormattedGenericName.toLowerCase();
        }
    }
}
