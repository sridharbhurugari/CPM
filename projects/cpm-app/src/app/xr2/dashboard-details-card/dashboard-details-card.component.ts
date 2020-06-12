import { Component, OnInit, Input } from '@angular/core';

import { QuickPickDrawer } from '../model/quick-pick-drawer';

@Component({
  selector: 'app-dashboard-details-card',
  templateUrl: './dashboard-details-card.component.html',
  styleUrls: ['./dashboard-details-card.component.scss']
})
export class DashboardDetailsCardComponent implements OnInit {

  @Input() detailedDrawer: QuickPickDrawer;

  constructor() { }

  ngOnInit() {
  }

  onPrintMedicationsClick() {
  }

  onPrintClick() {
  }

  onBackClick() {
    this.detailedDrawer.DetailedView = false;
  }

  getHeaderStyle() {
    let headerStyle = {};

    if (this.detailedDrawer.QuickPickDispenseBox) {
      const currentBox = this.detailedDrawer.QuickPickDispenseBox;
      headerStyle = {
        'background-color': currentBox.PriorityCodeColor,
        'color': 'white',
      };
    }

    return headerStyle;
  }

}
