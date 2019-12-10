import { Component, Input } from '@angular/core';
import { UnderfilledPicklistLine } from '../model/underfilled-picklist-line';
import { WindowService } from '../../shared/services/window-service';

@Component({
  selector: 'app-underfilled-picklist-lines',
  templateUrl: './underfilled-picklist-lines.component.html',
  styleUrls: ['./underfilled-picklist-lines.component.scss']
})
export class UnderfilledPicklistLinesComponent {
  _picklistLines: UnderfilledPicklistLine[];

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
}
