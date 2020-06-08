import { Component, OnInit, Input } from '@angular/core';

import { QuickPickDrawer } from './../model/quick-pick-drawer';

@Component({
  selector: 'app-quick-pick-drawer-view',
  templateUrl: './quick-pick-drawer-view.component.html',
  styleUrls: ['./quick-pick-drawer-view.component.scss']
})
export class QuickPickDrawerViewComponent implements OnInit {

  _quickpickDrawers: QuickPickDrawer[];
  detailedDrawer: QuickPickDrawer;

  get quickpickDrawers(): QuickPickDrawer[] {
    return this._quickpickDrawers;
  }

  @Input()
  set quickpickDrawers(value: QuickPickDrawer[]) {
    this._quickpickDrawers = value;
  }

  constructor() {
  }

  ngOnInit() {
  }

  openDetailedView(event) {
    this.detailedDrawer = event;
  }

  closeDetailedView() {
    this.detailedDrawer = null;
  }

}
