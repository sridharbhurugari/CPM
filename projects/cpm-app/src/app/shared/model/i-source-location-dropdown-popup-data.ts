import { SingleselectRowItem } from '@omnicell/webcorecomponents';

export interface ISourceLocationDropdownPopupData {
    popuptitle: string,
    dropdowntitle: string,
    dropdownrows: SingleselectRowItem[],
    defaultrow: SingleselectRowItem,
    selectedrow: SingleselectRowItem,
}
