import { Component, OnInit, Input } from '@angular/core';
import { QuickPickDrawer } from '../model/quick-pick-drawer';

@Component({
  selector: 'app-quick-pick-drawer-details-view',
  templateUrl: './quick-pick-drawer-details-view.component.html',
  styleUrls: ['./quick-pick-drawer-details-view.component.scss']
})
export class QuickPickDrawerDetailsViewComponent implements OnInit {

  private _detailedDrawer: QuickPickDrawer;

  @Input()
  set detailedDrawer(value: QuickPickDrawer) {
    this._detailedDrawer = value;
  }

  get detailedDrawer() {
    return this._detailedDrawer;
  }

  constructor() { }

  ngOnInit() {
  }

}
