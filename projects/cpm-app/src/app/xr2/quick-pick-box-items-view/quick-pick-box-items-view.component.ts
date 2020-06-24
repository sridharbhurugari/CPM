import { Component, OnInit, Input } from '@angular/core';
import { QuickPickRobotDispenseBoxItem } from '../model/quick-pick-robot-dispense-box-item';
import { QuickPickDrawerData } from '../model/quick-pick-drawer-data';

@Component({
  selector: 'app-quick-pick-box-items-view',
  templateUrl: './quick-pick-box-items-view.component.html',
  styleUrls: ['./quick-pick-box-items-view.component.scss']
})
export class QuickPickBoxItemsView implements OnInit {

  _dispenseBox: QuickPickRobotDispenseBoxItem;
  _drawer: QuickPickDrawerData;

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

  constructor() {
  }

  ngOnInit() {
  }

  getItemStyle(medication: any) {
    return medication.FilledMedicationCount !== medication.RequestedMedicationCount
    ? { background: 'yellow' } : null;
  }

}
