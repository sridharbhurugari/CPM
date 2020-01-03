import { IUnderfilledPicklist } from '../../api-core/data-contracts/i-underfilled-picklist';
import { PicklistDescriptionHelper } from '../utilities/picklist-description-helper';
import { PicklistDestinationDescriptionHelper } from '../utilities/picklist-destination-description-helper';
import { formatDate } from '@angular/common';

export class UnderfilledPicklist implements IUnderfilledPicklist{
    constructor(
        underfilledPicklist: IUnderfilledPicklist,
        locale: string,
        translatedItems: string,
        translatedPatients: string,
        translatedCabinets: string,
    ){
        Object.assign(this, underfilledPicklist);

        this.UnderfilledItemCountDisplay = `${this.UnderfilledItemCount} ${translatedItems}`;
        this.UnderfilledPatientCountDisplay = `${this.UnderfilledPatientCount} ${translatedPatients}`;
        this.UnderfilledDestinationCountDisplay = `${this.UnderfilledDestinationCount} ${translatedCabinets}`;

        this.DisplayGenericName = PicklistDescriptionHelper.DisplayGenericName(this.UnderfilledItemCount, this.PicklistTypeDb, this.PriorityCode);
        this.DisplayItemCount = PicklistDescriptionHelper.DisplayItemCount(this.UnderfilledItemCount, this.PicklistTypeDb, this.PriorityCode);
        this.DisplayBrandName = PicklistDescriptionHelper.DisplayBrandName(this.UnderfilledItemCount, this.PicklistTypeDb, this.PriorityCode);
        this.DisplayRouteName = !this.DisplayBrandName && !this.DisplayGenericName && ! this.DisplayItemCount;

        this.DisplayPatientCount = PicklistDestinationDescriptionHelper.DisplayPatientCount(this.UnderfilledPatientCount, this.PicklistTypeDb);
        this.DisplayPatientRoomAndArea = PicklistDestinationDescriptionHelper.DisplayPatientRoomAndArea(this.UnderfilledPatientCount, this.PicklistTypeDb, this.PatientRoom, this.AreaDescription);
        this.DisplayPatientRoom = PicklistDestinationDescriptionHelper.DisplayPatientRoom(this.UnderfilledPatientCount, this.PicklistTypeDb, this.PatientRoom, this.AreaDescription);
        this.DisplayArea = PicklistDestinationDescriptionHelper.DisplayArea(this.UnderfilledPatientCount, this.UnderfilledDestinationCount, this.PicklistTypeDb, this.PriorityCode, this.PatientRoom, this.AreaDescription);
        this.DisplayMultiDestination = PicklistDestinationDescriptionHelper.DisplayMultiDestination(this.UnderfilledDestinationCount, this.PicklistTypeDb);
        this.DisplayPatientNameSecondLine = PicklistDestinationDescriptionHelper.DisplayPatientNameSecondLine(this.UnderfilledDestinationCount, this.PicklistTypeDb, this.PriorityCode);
        this.DisplayOmniName = PicklistDestinationDescriptionHelper.DisplayOmniName(this.UnderfilledPatientCount, this.UnderfilledDestinationCount, this.PicklistTypeDb, this.PriorityCode, this.PatientRoom, this.AreaDescription);

        this.DescriptionSearchValue = this.getDescriptionSearchValue();
        this.DesintationSearchValue = this.getDestinationSearchValue();
        this.DateSearchValue = this.getDateSearchValue(locale);
    }

    OrderId: string;
    OrderDate: Date;
    SequenceOrder: number;
    RouteName: string;
    PicklistTypeDb: string;
    PriorityCode: string;
    PriorityDescription: string;
    PriorityColorCode: string;
    UnderfilledItemCount: number;
    UnderfilledItemCountDisplay: string;
    UnderfilledPatientCount: number;
    UnderfilledPatientCountDisplay: string;
    UnderfilledDestinationCount: number;
    UnderfilledDestinationCountDisplay: string;
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
    DisplayRouteName: boolean;

    DisplayPatientCount: boolean;
    DisplayPatientRoomAndArea: boolean;
    DisplayPatientRoom: boolean;
    DisplayArea: boolean;
    DisplayMultiDestination: boolean;

    DisplayPatientNameSecondLine: boolean;
    DisplayOmniName: boolean;

    DescriptionSearchValue: string;
    DesintationSearchValue: string;
    DateSearchValue: string;

    private getDateSearchValue(locale: string): string {
        var searchValues = [];
        searchValues.push(formatDate(this.CompletedDate, 'shortDate', locale));
        searchValues.push(formatDate(this.CompletedDate, 'shortTime', locale));

        return searchValues.join(' ');
    }

    private getDestinationSearchValue(): string {
        var searchValues = [];
        if(this.DisplayPatientCount){
            searchValues.push(this.UnderfilledPatientCountDisplay);
        }

        if(this.DisplayPatientRoomAndArea){
            searchValues.push(this.PatientRoom);
            searchValues.push(this.AreaDescription);
        }

        if(this.DisplayPatientRoom){
            searchValues.push(this.PatientRoom);
        }

        if(this.DisplayArea){
            searchValues.push(this.AreaDescription);
        }

        if(this.DisplayMultiDestination){
            searchValues.push(this.UnderfilledDestinationCountDisplay);
        }

        if(this.DisplayOmniName){
            searchValues.push(this.DestinationOmni);
        }

        if(this.DisplayPatientNameSecondLine){
            searchValues.push(this.PatientName);
        }

        return searchValues.join(' ');
    }

    private getDescriptionSearchValue(): string {
        var searchValues = [];
        if(this.DisplayGenericName){
            searchValues.push(this.ItemFormattedGenericName);
        }

        if(this.DisplayGenericName){
            searchValues.push(this.ItemBrandName);
        }

        if(this.DisplayItemCount){
            searchValues.push(this.UnderfilledItemCountDisplay);
        }

        if(this.DisplayRouteName){
            searchValues.push(this.RouteName);
        }

        return searchValues.join(' ');
    }
}