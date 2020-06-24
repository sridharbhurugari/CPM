import { Component, OnInit, Input } from '@angular/core';
import { QuickPickDrawerData } from '../model/quick-pick-drawer-data';

@Component({
  selector: 'app-quick-pick-box-items-view',
  templateUrl: './quick-pick-box-items-view.component.html',
  styleUrls: ['./quick-pick-box-items-view.component.scss']
})
export class QuickPickBoxItemsView implements OnInit {

  _drawerData: QuickPickDrawerData;

  @Input()
  set drawerData(value: QuickPickDrawerData) {
    this._drawerData = value;
  }

  get drawerData(): QuickPickDrawerData {
    return this._drawerData;
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
