import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import * as _ from 'lodash';

import { QuickPickDrawerData } from '../model/quick-pick-drawer-data';
import { QuickPickEventConnectionService } from '../services/quick-pick-event-connection.service';
import { Xr2QuickPickDrawerService } from '../../api-xr2/services/quick-pick-drawer.service';
import { QuickPickPrintRequest } from '../model/quick-pick-print-request';

@Component({
  selector: 'app-quick-pick-drawer-view',
  templateUrl: './quick-pick-drawer-view.component.html',
  styleUrls: ['./quick-pick-drawer-view.component.scss']
})
export class QuickPickDrawerViewComponent implements OnInit {

  @Output() quickPickActive: EventEmitter<boolean> = new EventEmitter<boolean>();

  private _selectedDeviceId: string;
  private _quickpickDrawers: QuickPickDrawerData[];
  detailedDrawer: QuickPickDrawerData;

  @Input()
  set quickpickDrawers(value: QuickPickDrawerData[]) {
    this._quickpickDrawers = value;
  }

  get quickpickDrawers(): QuickPickDrawerData[] {
    return this._quickpickDrawers;
  }

  @Input()
  set selectedDeviceId(value: string) {
    this._selectedDeviceId = value;
  }

  get selectedDeviceId(): string {
    return this._selectedDeviceId;
  }

  constructor(
    private quickPickEventConnectionService: QuickPickEventConnectionService,
    private quickPickDrawerService: Xr2QuickPickDrawerService
  ) {
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
    const printRequest = new QuickPickPrintRequest(this.detailedDrawer.Id, this.detailedDrawer.Xr2ServiceBarcode);
    this.quickPickDrawerService.printLabel(this.selectedDeviceId, printRequest);
    console.log('Print clicked for drawer: ' + this.detailedDrawer.Id);
  }

  private onUpdateQuickPickDrawer(quickPickDrawerUpdateMessage): void {
    const quickPickDrawerData = new QuickPickDrawerData(quickPickDrawerUpdateMessage.QuickPickDrawerData);
    let matchingQuickPickDrawerData = _.find(this.quickpickDrawers, (x) => {
      return x.Id === quickPickDrawerData.Id;
    });

    matchingQuickPickDrawerData = quickPickDrawerData;
  }

  private configureEventHandlers(): void {
    if (!this.quickPickEventConnectionService) {
      return;
    }

    this.quickPickEventConnectionService.QuickPickDrawerUpdateSubject
      .subscribe(message => this.onUpdateQuickPickDrawer(message));
  }

}
