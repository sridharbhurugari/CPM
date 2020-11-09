import { Component, Input } from '@angular/core';
import { UnderfilledPicklistLine } from '../model/underfilled-picklist-line';
import { WindowService } from '../../shared/services/window-service';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import { nameof } from '../../shared/functions/nameof';
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
  destinationPropertyName = nameof<UnderfilledPicklistLine>('DestinationSortValue');
  qtyFillReqPropertyName = nameof<UnderfilledPicklistLine>('FillQuantity');
  fillDatePropertyName = nameof<UnderfilledPicklistLine>('FillDate');

  currentSortPropertyName: string;

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
    private pickingEventConnectionService: PickingEventConnectionService
  ) { 
    this.configureEventHandlers();
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

  columnSelected(event: IColHeaderSortChanged){
    this.currentSortPropertyName = event.ColumnPropertyName;
    this.picklistLines = _.orderBy(this._picklistLines, x => x[this.currentSortPropertyName], event.SortDirection)
  }
}
