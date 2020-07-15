import { Component, OnInit, Output } from '@angular/core';
import { IPopupWindowContainer, SingleselectRowItem } from '@omnicell/webcorecomponents';
import { Subject } from 'rxjs';
import { IDropdownPopupData } from '../../model/i-dropdown-popup-data';

@Component({
  selector: 'app-dropdown-popup',
  templateUrl: './dropdown-popup.component.html',
  styleUrls: ['./dropdown-popup.component.scss']
})
export class DropdownPopupComponent implements OnInit, IPopupWindowContainer {

  data: IDropdownPopupData;  

  @Output()
  dismiss: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  ngOnInit() {
  }

  cancel() {
    this.dismiss.next(false);
  }

  continue() {
    this.dismiss.next(true);
  }
}
