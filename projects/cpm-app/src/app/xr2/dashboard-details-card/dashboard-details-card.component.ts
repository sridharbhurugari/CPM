import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { QuickPickDrawer } from '../model/quick-pick-drawer';

@Component({
  selector: 'app-dashboard-details-card',
  templateUrl: './dashboard-details-card.component.html',
  styleUrls: ['./dashboard-details-card.component.scss']
})
export class DashboardDetailsCardComponent implements OnInit {

  private _detailedDrawer: QuickPickDrawer;

  @Output() closeQuickPickDetailsCard: EventEmitter<any> = new EventEmitter<any>();
  @Output() printQuickPickDrawerLabel: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  set detailedDrawer(value: QuickPickDrawer) {
    this._detailedDrawer = value;
  }

  get detailedDrawer(): QuickPickDrawer {
    return this._detailedDrawer;
  }

  constructor() { }

  ngOnInit() {
  }

  onPrintMedicationsClick() {
  }

  onPrintClick() {
    this.printQuickPickDrawerLabel.emit();
  }

  onBackClick() {
    this.closeQuickPickDetailsCard.emit();
    this.detailedDrawer.DetailedView = false;
  }

  getHeaderStyle() {
    let headerStyle = {};

    if (this.detailedDrawer.QuickPickDispenseBox) {
      const currentBox = this.detailedDrawer.QuickPickDispenseBox;
      headerStyle = {
        'background-color': currentBox.PriorityCodeColor,
        'color': 'white',  // TODO this needs to be based on the background...
        // White text on white, yellow or other light priority will not be good.
        // CPM has a determiner for this, we probably need to match that in Angular
      };
    }

    return headerStyle;
  }

}
