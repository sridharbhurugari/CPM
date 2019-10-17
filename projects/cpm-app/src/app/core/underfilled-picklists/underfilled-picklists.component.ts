import { Component, Input } from '@angular/core';
import { UnderfilledPicklist } from '../model/underfilled-picklist';
import { Router } from '@angular/router';
import { WindowRef } from '../../shared/services/window-ref';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';

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

  constructor(
    private windowRef: WindowRef,
    private wpfActionControllerService: WpfActionControllerService,
  ) { }

  navigate(orderId: string){
    // this.router.navigate([`/picklists/${orderId}/underfilled/picklistLines`]);
    this.wpfActionControllerService.ExecuteContinueNavigationAction(`picklists/${orderId}/underfilled/picklistLines`);
  }
}
