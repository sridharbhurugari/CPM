import { Component, OnInit, Input } from '@angular/core';
import { QuickPickDispenseBox } from '../model/quick-pick-dispense-box';

@Component({
  selector: 'app-quick-pick-box-items-view',
  templateUrl: './quick-pick-box-items-view.component.html',
  styleUrls: ['./quick-pick-box-items-view.component.scss']
})
export class QuickPickBoxItemsView implements OnInit {

  _dispenseBox: QuickPickDispenseBox;

  @Input()
  set dispenseBox(value: QuickPickDispenseBox) {
    this._dispenseBox = value;
  }

  get dispenseBox(): QuickPickDispenseBox {
    return this._dispenseBox;
  }

  constructor() {
  }

  ngOnInit() {
  }

}
