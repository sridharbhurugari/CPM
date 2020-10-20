export interface IGridSelectionChanged<T> {
    changeType: 'selected' | 'unselected';
    changedValue: T;
    selectedValues: T[];
    unselectedValues: T[];
    areAllValuesSelected: boolean;
}
