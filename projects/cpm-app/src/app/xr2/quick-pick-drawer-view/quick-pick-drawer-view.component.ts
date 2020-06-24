import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import * as _ from 'lodash';

import { QuickPickDrawerData } from '../model/quick-pick-drawer-data';
import { QuickPickEventConnectionService } from '../services/quick-pick-event-connection.service';

@Component({
  selector: 'app-quick-pick-drawer-view',
  templateUrl: './quick-pick-drawer-view.component.html',
  styleUrls: ['./quick-pick-drawer-view.component.scss']
})
export class QuickPickDrawerViewComponent implements OnInit {

  @Output() quickPickActive: EventEmitter<boolean> = new EventEmitter<boolean>();

  _quickpickDrawers: QuickPickDrawerData[];
  detailedDrawer: QuickPickDrawerData;

  get quickpickDrawers(): QuickPickDrawerData[] {
    return this._quickpickDrawers;
  }

  @Input()
  set quickpickDrawers(value: QuickPickDrawerData[]) {
    this._quickpickDrawers = value;
  }

  constructor(private quickPickEventConnectionService: QuickPickEventConnectionService) {
    this.configureEventHandlers();
  }

  ngOnInit() {
  }



  onShowQuickPickDrawerDetails(drawerIndex: number) {
    this.detailedDrawer = this._quickpickDrawers[drawerIndex];
    this.printDrawerLabel();
    this.quickPickActive.emit(true);
  }

  onCloseQuickPickDrawerDetails(value?: any) {
    this.detailedDrawer = undefined;
    this.quickPickActive.emit(false);
  }

  printDrawerLabel() {
    // PRINT THE DRAWER LABELS for this.detailedDrawer
    console.log('Print clicked for drawer: ' + this.detailedDrawer.Id);
  }

  private onUpdateQuickPickDrawer(quickPickDrawerUpdateMessage): void {
    const quickPickDrawerData = new QuickPickDrawerData(quickPickDrawerUpdateMessage.QuickPickDrawerData);
    quickPickDrawerData.MedsWithCounts = quickPickDrawerUpdateMessage.QuickPickDrawerData.MedsWithCounts.$values;
    console.log(quickPickDrawerData);
    let matchingQuickPickDrawerDataIndex = _.findIndex(this.quickpickDrawers, (x) => {
      return x.Id === quickPickDrawerData.Id;
    });

    this.quickpickDrawers[matchingQuickPickDrawerDataIndex] = quickPickDrawerData;

    if (this.detailedDrawer !== undefined) {
      if (this.detailedDrawer.Id === quickPickDrawerData.Id) {
        if (quickPickDrawerData.Status < 2) {
          this.detailedDrawer = undefined;
          this.quickPickActive.emit(false);
        }
      }
    }
  }

  private configureEventHandlers(): void {
    if (!this.quickPickEventConnectionService) {
      return;
    }

    this.quickPickEventConnectionService.QuickPickDrawerUpdateSubject
      .subscribe(message => this.onUpdateQuickPickDrawer(message));
  }

}
