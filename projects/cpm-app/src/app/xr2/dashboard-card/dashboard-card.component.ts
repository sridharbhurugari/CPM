import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { QuickPickDrawerData } from '../model/quick-pick-drawer-data';
import { QuickPickControlDataStatus } from '../model/quick-pick-control-data-status';
import { CpColorService } from '../../shared/services/cp-color.service';

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

  @Output() showQuickPickDrawerDetails: EventEmitter<number> = new EventEmitter<number>();

  constructor(private colorService: CpColorService) { }

  ngOnInit() {
  }

  onPrintClick() {
    this.showQuickPickDrawerDetails.emit(this.drawerIndex);
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
