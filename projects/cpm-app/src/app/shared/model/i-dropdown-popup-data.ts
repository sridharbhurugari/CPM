import { SingleselectRowItem } from '@omnicell/webcorecomponents';

export interface IDropdownPopupData {
    popuptitle: string,
    dropdowntitle: string,    
    dropdownrows: SingleselectRowItem[],
    defaultrow: SingleselectRowItem,
    showCheckbox: boolean,
    checkboxLabel: string,
    checkboxSelected: boolean,
    checkboxHideSelection: SingleselectRowItem[],
    selectedrow: SingleselectRowItem,
    selectedcheckbox: boolean,
    selectText: string,
    autoSort:boolean
}
