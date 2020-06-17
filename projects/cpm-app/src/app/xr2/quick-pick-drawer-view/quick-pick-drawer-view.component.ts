import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { QuickPickDrawer } from './../model/quick-pick-drawer';

@Component({
  selector: 'app-quick-pick-drawer-view',
  templateUrl: './quick-pick-drawer-view.component.html',
  styleUrls: ['./quick-pick-drawer-view.component.scss']
})
export class QuickPickDrawerViewComponent implements OnInit {

  @Output() quickPickActive: EventEmitter<boolean> = new EventEmitter<boolean>();

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

  getDetailedViewDrawer() {
    return this._quickpickDrawers.find(item => item.DetailedView);
  }

  onShowQuickPickDrawerDetails(drawerIndex: number) {
    this.detailedDrawer = this.quickpickDrawers[drawerIndex];
    this.printDrawerLabel();
    this.quickPickActive.emit(true);
  }

  onCloseQuickPickDrawerDetails(value?: any) {
    this.detailedDrawer = undefined;
    this.quickPickActive.emit(false);
  }

  printDrawerLabel() {
    // PRINT THE DRAWER LABELS for this.detailedDrawer
    console.log('Print clicked for drawer: ' + this.detailedDrawer.Id.toString());
  }

}
