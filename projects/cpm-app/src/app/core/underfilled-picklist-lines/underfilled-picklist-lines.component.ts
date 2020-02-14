import { Component, Input } from '@angular/core';
import { UnderfilledPicklistLine } from '../model/underfilled-picklist-line';
import { WindowService } from '../../shared/services/window-service';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import { nameof } from '../../shared/functions/nameof';
import * as _ from 'lodash';

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
  ) { }

  columnSelected(event: IColHeaderSortChanged){
    this.currentSortPropertyName = event.ColumnPropertyName;
    this.picklistLines = _.orderBy(this._picklistLines, x => x[this.currentSortPropertyName], event.SortDirection)
  }
}
