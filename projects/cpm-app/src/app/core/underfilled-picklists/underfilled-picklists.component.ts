import { Component, Input } from '@angular/core';
import { UnderfilledPicklist } from '../model/underfilled-picklist';
import { WindowRef } from '../../shared/services/window-ref';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';

@Component({
  selector: 'app-underfilled-picklists',
  templateUrl: './underfilled-picklists.component.html',
  styleUrls: ['./underfilled-picklists.component.scss']
})
export class UnderfilledPicklistsComponent {
  private _picklists: UnderfilledPicklist[];

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

  constructor(
    private windowRef: WindowRef,
    private wpfActionControllerService: WpfActionControllerService,
  ) { }

  navigate(orderId: string){
    this.wpfActionControllerService.ExecuteContinueNavigationAction(`picklists/underfilled/picklistLines`, {orderId: orderId});
  }
}
