import { Directive, Output, EventEmitter, ViewChildren, QueryList, ContentChildren, ElementRef } from '@angular/core';
import { CheckboxComponent } from '@omnicell/webcorecomponents';
import { IGridSelectionChanged } from '../events/i-grid-selection-changed';
import { SelectionChangeType } from '../constants/selection-change-type';
import { Subscription } from 'rxjs';
import { CheckboxValues } from '../constants/checkbox-values';
import { ISelectable } from '../model/i-selectable';


@Directive({
  selector: '[appGridMultiSelect]'
})
export class GridMultiSelectDirective {
  private _selectedValues: any[] = [];
  private _possibleValues: any[];
  private _subscriptions: Subscription[] = [];

  @Output('selectionChanged')
  selectionChanged: EventEmitter<IGridSelectionChanged<any>> = new EventEmitter();

  @ContentChildren(CheckboxComponent)
  set rows(values: QueryList<CheckboxComponent>) {
    this._possibleValues = values.filter(x => x.isEnabled && x.valueField !== CheckboxValues.ToggleAll).map(x => x.valueField);
    this._selectedValues = values.filter(x => x.selected && x.valueField !== CheckboxValues.ToggleAll).map(x => x.valueField);

    if(this._subscriptions.length) {
      this._subscriptions.forEach(x => x.unsubscribe());
      this._subscriptions = [];
    }

    values && values.forEach(x => this._subscriptions.push(x.selection && x.selection.subscribe(s => this.onRowCheckChanged(s))));
    if (this._possibleValues && this._possibleValues.length && this._possibleValues[0].SelectionStateChanged) {
      this._possibleValues.forEach(x => this._subscriptions.push(x.SelectionStateChanged.subscribe(s => this.onRowCheckChanged(s))));
    }
  }

  constructor() { }

  onRowCheckChanged(selectionEvent: any) {
    const checked: boolean = selectionEvent.selectedState;
    const value: any = selectionEvent.selectedValue;
    if (value === CheckboxValues.ToggleAll) {
      if (checked) {
        this._selectedValues = this._possibleValues;
      } else {
        this._selectedValues = [];
      }
    } else {
      if (checked) {
        this._selectedValues.push(value);
      } else {
        this._selectedValues = this._selectedValues.filter(x => x !== value);
      }
    }

    this.selectionChanged.emit({
      changeType: checked ? SelectionChangeType.selected : SelectionChangeType.unselected,
      changedValue: value,
      selectedValues: this._selectedValues,
      unselectedValues: this._possibleValues.filter(x => this._selectedValues.indexOf(x) === -1),
      areAllValuesSelected: this._selectedValues.length == this._possibleValues.length,
    });
  }
}
