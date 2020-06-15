import { Component, OnInit, Input } from '@angular/core';
import { QuickPickDispenseBox } from './../model/quick-pick-dispense-box';

@Component({
  selector: 'app-quick-pick-scroll-view',
  templateUrl: './quick-pick-scroll-view.component.html',
  styleUrls: ['./quick-pick-scroll-view.component.scss']
})
export class QuickPickScrollViewComponent implements OnInit {

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
