import { Component, Input } from '@angular/core';
import { UnderfilledPicklistLine } from '../model/underfilled-picklist-line';
import { WindowService } from '../../shared/services/window-service';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import { nameof } from '../../shared/functions/nameof';
import { Observable, Subject } from 'rxjs';
import * as _ from 'lodash';
import { PickingEventConnectionService } from '../../api-core/services/picking-event-connection.service';
import { IUnfilledPicklistlineAddedEvent } from '../../api-core/events/i-unfilled-picklistline-added-event';

@Component({
  selector: 'app-underfilled-picklist-lines',
  templateUrl: './underfilled-picklist-lines.component.html',
  styleUrls: ['./underfilled-picklist-lines.component.scss']
})
export class UnderfilledPicklistLinesComponent {
  _picklistLines: UnderfilledPicklistLine[];

  descriptionPropertyName = nameof<UnderfilledPicklistLine>('DescriptionSortValue');
  pharmacyQohPropertyName = nameof<UnderfilledPicklistLine>('PharmacyQOH');
  destinationPropertyName = nameof<UnderfilledPicklistLine>('DestinationSortValue');
  qtyFillReqPropertyName = nameof<UnderfilledPicklistLine>('FillQuantity');
  fillDatePropertyName = nameof<UnderfilledPicklistLine>('FillDate');
  isHeaderCheckboxChecked: boolean;
  currentSortPropertyName = 'fillDatePropertyName';

  @Input('picklistLines')
  set picklistLines(value: UnderfilledPicklistLine[]) {
    this._picklistLines = value;
    if (this.windowService.nativeWindow) {
      this.windowService.nativeWindow.dispatchEvent(new Event('resize'));
    }
  }
  get picklistLines(): UnderfilledPicklistLine[] {
    return this._picklistLines;
  }

  constructor(
    private windowService: WindowService,
    private pickingEventConnectionService: PickingEventConnectionService
  ) { 
    this.configureEventHandlers();
  }

   private obs = new Subject<number>();
   public SelectedItemCount$: Observable<number> = this.obs.asObservable();

   public SelectedItemCount(): number {
  if ( this._picklistLines == null ) { return 0;
  }
  const countOf = this._picklistLines.filter(l => l.IsChecked).length;
  return countOf;
  }

  public SelectedButCannotRerouteCount(): number {
    if ( this._picklistLines == null ) { return 0;
    }
    const countOf = this._picklistLines.filter(l => l.IsChecked && !l.canReroute).length;
    return countOf;
    }

public TotalItemCount(): number {
  if ( this._picklistLines == null ) {
     return 0;
   }
  const countOf = this._picklistLines.length;
  return countOf;
  }
  private configureEventHandlers(): void {
    if (!this.pickingEventConnectionService) {
      return;
    }

    this.pickingEventConnectionService.addedUnfilledPicklistLineSubject
      .subscribe(message => this.onAddedUnfilledPicklistLine(message));    
  }

  private onAddedUnfilledPicklistLine(unfilledPicklistLineAddedEvent: IUnfilledPicklistlineAddedEvent): void {
    try {
      const addedUnfilledPicklistLine = unfilledPicklistLineAddedEvent.UnderfilledPicklistLine;
      
      this.picklistLines.push(addedUnfilledPicklistLine);
      this.windowService.nativeWindow.dispatchEvent(new Event('resize'));
      return;
            
    } catch (e) {
      console.log('PicklistsQueueComponent.onAddedUnfilledPicklistLine ERROR');
      console.log(e);
    }
  }

 columnSelected(event: IColHeaderSortChanged) {
    this.currentSortPropertyName = event.ColumnPropertyName;
    this.picklistLines = _.orderBy(this._picklistLines, x => x[this.currentSortPropertyName], event.SortDirection);
  }

  onHeaderCheck(e: { selectedState: boolean; }) {
    const checked = e.selectedState;
    this.isHeaderCheckboxChecked = checked;
    this.updateAllCheckboxValues(checked);
    this.obs.next(this.SelectedItemCount());
  }

  updateAllCheckboxValues(checked: boolean) {
  this._picklistLines.forEach(l => l.IsChecked = checked);
  this.obs.next(this.SelectedItemCount());
  }

 onSelect(e: { selectedState: boolean; selectedValue: any; }) {
  const checked = e.selectedState;
  const id = e.selectedValue;
  this.updateCheckboxValue(id, checked);
  this.obs.next(this.SelectedItemCount());
  }

updateCheckboxValue(id: string, checked: boolean) {
  const pl = this._picklistLines.find(l => l.PicklistLineId === id);
  if (Object.keys(pl).length) {
    pl.IsChecked = checked;
  }
 }
}
