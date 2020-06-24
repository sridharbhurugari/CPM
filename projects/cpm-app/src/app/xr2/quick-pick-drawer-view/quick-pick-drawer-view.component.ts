import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { QuickPickDrawerData } from '../model/quick-pick-drawer-data';

@Component({
  selector: 'app-quick-pick-drawer-view',
  templateUrl: './quick-pick-drawer-view.component.html',
  styleUrls: ['./quick-pick-drawer-view.component.scss']
})
export class QuickPickDrawerViewComponent implements OnInit {

  @Output() quickPickActive: EventEmitter<boolean> = new EventEmitter<boolean>();

  _quickpickDrawers: QuickPickDrawerData[];
  detailedDrawer: QuickPickDrawerData;

  get quickpickDrawers(): QuickPickDrawerData[] {
    return this._quickpickDrawers;
  }

  @Input()
  set quickpickDrawers(value: QuickPickDrawerData[]) {
    this._quickpickDrawers = value;
  }

  constructor() {
  }

  ngOnInit() {
  }

  onShowQuickPickDrawerDetails(drawerIndex: number) {
    this.detailedDrawer = this._quickpickDrawers[drawerIndex];
    this.printDrawerLabel();
    this.quickPickActive.emit(true);
  }

  onCloseQuickPickDrawerDetails(value?: any) {
    this.detailedDrawer = undefined;
    this.quickPickActive.emit(false);
  }

  printDrawerLabel() {
    // PRINT THE DRAWER LABELS for this.detailedDrawer
    console.log('Print clicked for drawer: ' + this.detailedDrawer.Id);
  }

}
