import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { QuickPickDrawerData } from '../model/quick-pick-drawer-data';
import { QuickPickControlDataStatus } from '../model/quick-pick-control-data-status';
import { CpColorService } from '../../shared/services/cp-color.service';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.scss']
})
export class DashboardCardComponent implements OnInit {

  private _drawerData: QuickPickDrawerData;

  controlDataStatus: typeof QuickPickControlDataStatus = QuickPickControlDataStatus;

  @Input() drawerIndex: number;

  @Input()
  set drawerData(value: QuickPickDrawerData) {
    this._drawerData = value;
  }

  get drawerData(): QuickPickDrawerData {
    return this._drawerData;
  }

  @Output() printQuickPickDrawer: EventEmitter<number> = new EventEmitter<number>();
  @Output() unlockUnknownQuickPickDrawer: EventEmitter<number> = new EventEmitter<number>();
  @Output() rerouteQuickPickDrawer: EventEmitter<Guid> = new EventEmitter<Guid>();
  @Output() viewQuickPickDrawer: EventEmitter<number> = new EventEmitter<number>();

  constructor(private colorService: CpColorService) { }

  ngOnInit() {
  }

  onPrintClick() {
    this.printQuickPickDrawer.emit(this.drawerIndex);
  }

  onUnlockUnknownClick() {
    this.unlockUnknownQuickPickDrawer.emit(this.drawerIndex);
  }

  onViewClick() {
    this.viewQuickPickDrawer.emit(this.drawerIndex);
  }

  onRerouteClick() {
    this.rerouteQuickPickDrawer.emit(this._drawerData.RobotDispenseBoxId);
  }

  getHeaderStyle() {
    let headerStyle = {};

    if (this.drawerData.Status !== QuickPickControlDataStatus.Empty) {
      headerStyle = {
        'background-color': this.drawerData.ColorCode,
        'color': this.drawerData.ColorCode ?
        this.colorService.pickTextColorBasedOnBackgroundColor(this.drawerData.ColorCode, '#FFFFFF', '#000000') : 'black'
      };
    }

    return headerStyle;
  }

}
