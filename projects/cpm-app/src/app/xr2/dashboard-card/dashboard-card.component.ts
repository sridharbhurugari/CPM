import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { QuickPickDrawerData } from '../model/quick-pick-drawer-data';
import { QuickPickControlDataStatus } from '../model/quick-pick-control-data-status'
import { QuickPickRobotDispenseBoxItem } from '../model/quick-pick-robot-dispense-box-item';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.scss']
})
export class DashboardCardComponent implements OnInit {

  controlDataStatus: typeof QuickPickControlDataStatus = QuickPickControlDataStatus;
  _dispenseBox: QuickPickRobotDispenseBoxItem;
  _drawer: QuickPickDrawerData;

  @Input() drawerIndex: number;

  @Input()
  set dispenseBox(value: QuickPickRobotDispenseBoxItem) {
    this._dispenseBox = value;
  }

  get dispenseBox(): QuickPickRobotDispenseBoxItem {
    return this._dispenseBox;
  }

  @Input()
  set drawer(value: QuickPickDrawerData) {
    this._drawer = value;
  }

  get drawer(): QuickPickDrawerData {
    return this._drawer;
  }

  @Output() showQuickPickDrawerDetails: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  onPrintClick() {
    this.showQuickPickDrawerDetails.emit(this.drawerIndex);
  }

  getHeaderStyle() {
    let headerStyle = {};

    if (this.drawer.Status !== QuickPickControlDataStatus.Empty) {
      headerStyle = {
        'background-color': this.drawer.ColorCode,
        'color': 'white',
      };
    }

    return headerStyle;
  }

}
