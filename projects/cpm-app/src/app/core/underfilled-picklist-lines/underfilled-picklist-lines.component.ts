import { Component, Input } from '@angular/core';
import { UnderfilledPicklistLine } from '../model/underfilled-picklist-line';
import { WindowRef } from '../../shared/services/window-ref';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';

@Component({
  selector: 'app-underfilled-picklist-lines',
  templateUrl: './underfilled-picklist-lines.component.html',
  styleUrls: ['./underfilled-picklist-lines.component.scss']
})
export class UnderfilledPicklistLinesComponent {
  _picklistLines: UnderfilledPicklistLine[];

  @Input('picklistLines')
  set picklistLines(value: UnderfilledPicklistLine[]){
    this._picklistLines = value;
    if(this.windowRef.nativeWindow){
      this.windowRef.nativeWindow.dispatchEvent(new Event('resize'));
    }
  }
  
  get picklistLines(): UnderfilledPicklistLine[]{
    return this._picklistLines;
  }

  constructor(
    private windowRef: WindowRef,
    private wpfActionControllerService: WpfActionControllerService
  ) { }

  navigateBack(){
    this.wpfActionControllerService.ExecuteBackAction();
  }
}
