import { Directive, Output, EventEmitter, ViewChildren, QueryList, ContentChildren, ElementRef } from '@angular/core';
import { CheckboxComponent } from '@omnicell/webcorecomponents';
import { IGridSelectionChanged } from '../events/i-grid-selection-changed';
import { SelectionChangeType } from '../constants/selection-change-type';
import { Subscription } from 'rxjs';
import { CheckboxValues } from '../constants/checkbox-values';


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
    this._possibleValues = values.map(x => x.valueField).filter(x => x != CheckboxValues.ToggleAll);
    this._selectedValues = values.filter(x => x.selected && x.valueField != CheckboxValues.ToggleAll).map(x => x.valueField);

    if(this._subscriptions.length){
      this._subscriptions.forEach(x => x.unsubscribe());
      this._subscriptions = [];
    }

    values && values.forEach(x => this._subscriptions.push(x.selection && x.selection.subscribe(x => this.onRowCheckChanged(x))));
  }

  constructor() { }

  onRowCheckChanged(selectionEvent: any) {
    var checked: boolean = selectionEvent.selectedState;
    var value: any = selectionEvent.selectedValue;
    if(value == CheckboxValues.ToggleAll){
      if(checked){
        this._selectedValues = this._possibleValues;
      }else{
        this._selectedValues = [];
      }
    } else {
      if (checked) {
        this._selectedValues.push(value);
      } else {
        this._selectedValues = this._selectedValues.filter(x => x != value);
      }
    }

    this.selectionChanged.emit({
      changeType: checked ? SelectionChangeType.selected : SelectionChangeType.unselected,
      changedValue: value,
      selectedValues: this._selectedValues,
      unselectedValues: this._possibleValues.filter(x => this._selectedValues.indexOf(x) == -1)
    });
  }
}
