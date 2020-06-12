import { Component, OnInit, Input } from '@angular/core';
import { QuickPickDrawer } from '../model/quick-pick-drawer';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.scss']
})
export class DashboardCardComponent implements OnInit {

  @Input() drawer: QuickPickDrawer;

  constructor() { }

  ngOnInit() {
  }

  onPrintClick() {
    this.drawer.DetailedView = true;
  }

  getHeaderStyle() {
    let headerStyle = {};

    if (this.drawer.QuickPickDispenseBox) {
      const currentBox = this.drawer.QuickPickDispenseBox;
      headerStyle = {
        'background-color': currentBox.PriorityCodeColor,
        'color': 'white',
      };
    }

    return headerStyle;
  }

}
