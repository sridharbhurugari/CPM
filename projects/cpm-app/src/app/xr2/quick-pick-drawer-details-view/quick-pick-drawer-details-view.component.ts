import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { QuickPickDrawerData } from '../model/quick-pick-drawer-data';
import { QuickPickControlDataStatus } from '../model/quick-pick-control-data-status';
import { QuickPickRobotDispenseBoxItem } from '../model/quick-pick-robot-dispense-box-item';

@Component({
  selector: 'app-quick-pick-drawer-details-view',
  templateUrl: './quick-pick-drawer-details-view.component.html',
  styleUrls: ['./quick-pick-drawer-details-view.component.scss']
})
export class QuickPickDrawerDetailsViewComponent implements OnInit {

  private _detailedDrawer: QuickPickDrawerData;
  private _dispenseBox: QuickPickRobotDispenseBoxItem;

  controlDataStatus: typeof QuickPickControlDataStatus = QuickPickControlDataStatus;

  @Output() closeQuickPickDetailsCard: EventEmitter<any> = new EventEmitter<any>();
  @Output() printQuickPickDrawerLabel: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  set detailedDrawer(value: QuickPickDrawerData) {
    this._detailedDrawer = value;
  }

  get detailedDrawer(): QuickPickDrawerData {
    return this._detailedDrawer;
  }

  @Input()
  set dispenseBox(value: QuickPickRobotDispenseBoxItem) {
    this._dispenseBox = value;
  }

  get dispenseBox(): QuickPickRobotDispenseBoxItem {
    return this._dispenseBox;
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
  }

  getHeaderStyle() {
    let headerStyle = {};

    if (this.detailedDrawer.Status !== this.controlDataStatus.Empty) {
      headerStyle = {
        'background-color': this.detailedDrawer.ColorCode,
        'color': 'white',  // TODO this needs to be based on the background...
        // White text on white, yellow or other light priority will not be good.
        // CPM has a determiner for this, we probably need to match that in Angular
      };
    }

    return headerStyle;
  }
}
