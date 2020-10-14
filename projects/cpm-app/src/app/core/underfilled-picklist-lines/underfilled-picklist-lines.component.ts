import { Component, Input, EventEmitter } from '@angular/core';
import { UnderfilledPicklistLine } from '../model/underfilled-picklist-line';
import { WindowService } from '../../shared/services/window-service';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import { nameof } from '../../shared/functions/nameof';
import { CheckboxValues } from '../../shared/constants/checkbox-values';
import { IGridSelectionChanged } from '../../shared/events/i-grid-selection-changed';
import { IGridOrderChanged } from '../../shared/events/i-grid-order-changed';
import * as _ from 'lodash';
import { Observable, Observer, Subject } from 'rxjs';

@Component({
  selector: 'app-underfilled-picklist-lines',
  templateUrl: './underfilled-picklist-lines.component.html',
  styleUrls: ['./underfilled-picklist-lines.component.scss']
})
export class UnderfilledPicklistLinesComponent {
  _picklistLines: UnderfilledPicklistLine[];

  isHeaderCheckboxChecked: boolean;
  currentSortPropertyName: string = "fillDatePropertyName";

  @Input('picklistLines')
  set picklistLines(value: UnderfilledPicklistLine[]) {
    this._picklistLines = value;
    if(this.windowService.nativeWindow){
      this.windowService.nativeWindow.dispatchEvent(new Event('resize'));
    }
  }
  get picklistLines(): UnderfilledPicklistLine[] {
    return this._picklistLines;
  }

  constructor(
    private windowService: WindowService,
  ) {
   }

   private obs = new Subject();
   public obs$ = this.obs.asObservable();
public SelectedItemCountObserver: Observer<number>;
public SelectedItemCount$: Observable<number>;
public SelectedItemCount(): number
{
  if ( this._picklistLines == null )
  { return 0;
  }
  const countOf = this._picklistLines.filter(l => l.IsChecked).length;
  return countOf;
}

public TotalItemCount(): number
{
  if ( this._picklistLines == null )
  { return 0;
  }
  const countOf = this._picklistLines.length;
  return countOf;
}

 onSelectionChanged(gridSelectionChanged: IGridSelectionChanged<UnderfilledPicklistLine>){
  }
 onOrderChanged(gridOrderChanged: IGridOrderChanged<UnderfilledPicklistLine>){
  }

 columnSelected(event: IColHeaderSortChanged){
    this.currentSortPropertyName = event.ColumnPropertyName;
    this.picklistLines = _.orderBy(this._picklistLines, x => x[this.currentSortPropertyName], event.SortDirection)
  }

  onHeaderCheck(e){
    var checked = e.selectedState;
    this.isHeaderCheckboxChecked = checked;
    this.updateAllCheckboxValues(checked);
    this.SelectedItemCount$(next: this.SelectedItemCount());
  }

  updateAllCheckboxValues(checked: boolean)
  {
  this._picklistLines.forEach(l => l.IsChecked = checked);
  }

 onSelect(e)
{
  var checked = e.selectedState;
  var id = e.selectedValue;
  this.updateCheckboxValue(id, checked);
  this.obs.next(this.SelectedItemCount());
  this.SelectedItemCount$.next(this.SelectedItemCount());
}

updateCheckboxValue(id, checked: boolean)
{
var pl = this._picklistLines.find(l => l.PicklistLineId === id);
if (Object.keys(pl).length)
{
  pl.IsChecked = checked;
}
}
}
