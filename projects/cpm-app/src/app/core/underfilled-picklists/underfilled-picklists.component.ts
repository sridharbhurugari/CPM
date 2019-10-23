import { Component, Input, AfterViewInit, AfterViewChecked } from '@angular/core';
import { UnderfilledPicklist } from '../model/underfilled-picklist';
import { WindowRef } from '../../services/window-ref';

@Component({
  selector: 'app-underfilled-picklists',
  templateUrl: './underfilled-picklists.component.html',
  styleUrls: ['./underfilled-picklists.component.scss']
})
export class UnderfilledPicklistsComponent {
  _picklists: UnderfilledPicklist[];

  @Input()
  set picklists(value: UnderfilledPicklist[]){
    this._picklists = value;
    if(this.windowRef.nativeWindow){
      this.windowRef.nativeWindow.dispatchEvent(new Event('resize'));
    }
  }
  
  get picklists(): UnderfilledPicklist[]{
    return this._picklists;
  }

  constructor(private windowRef: WindowRef) { }
}
