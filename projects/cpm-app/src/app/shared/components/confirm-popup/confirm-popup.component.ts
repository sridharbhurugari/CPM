import { Component, OnInit, Output } from '@angular/core';
import { IPopupWindowContainer } from '@omnicell/webcorecomponents';
import { Subject } from 'rxjs';
import { IConfirmPopupData } from '../../model/i-confirm-popup-data';

@Component({
  selector: 'app-confirm-popup',
  templateUrl: './confirm-popup.component.html',
  styleUrls: ['./confirm-popup.component.scss']
})
export class ConfirmPopupComponent implements OnInit, IPopupWindowContainer {

  confirmTextboxResourceKey: string;
  data: IConfirmPopupData;

  @Output()
  dismiss: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  ngOnInit() {
    this.confirmTextboxResourceKey = this.data.confirmTextboxResourceKey;
  }

  cancel() {
    this.dismiss.next(false);
  }

  continue() {
    this.dismiss.next(true);
  }
}
