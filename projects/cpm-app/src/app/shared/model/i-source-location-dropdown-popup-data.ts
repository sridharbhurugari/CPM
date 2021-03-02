import { SingleselectRowItem } from '@omnicell/webcorecomponents';

export interface ISourceLocationDropdownPopupData {
    popupTitle: string,
    dropdownTitle: string,
    dropdownRows: SingleselectRowItem[],
    defaultRow: SingleselectRowItem,
    selectedRow: SingleselectRowItem,
}
