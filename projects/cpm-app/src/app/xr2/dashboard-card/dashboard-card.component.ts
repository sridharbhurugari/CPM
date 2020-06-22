import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { QuickPickDrawer } from '../model/quick-pick-drawer';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.scss']
})
export class DashboardCardComponent implements OnInit {

  @Input() drawer: QuickPickDrawer;
  @Input() drawerIndex: number;

  @Output() showQuickPickDrawerDetails: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  onPrintClick() {
    this.showQuickPickDrawerDetails.emit(this.drawerIndex);
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
