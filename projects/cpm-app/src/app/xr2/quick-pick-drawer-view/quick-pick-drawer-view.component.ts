import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import * as _ from 'lodash';
import { PopupDialogProperties, PopupDialogType, PopupDialogService } from '@omnicell/webcorecomponents';

import { QuickPickDrawerData } from '../model/quick-pick-drawer-data';
import {SelectableDeviceInfo } from '../../shared/model/selectable-device-info';
import { QuickPickEventConnectionService } from '../services/quick-pick-event-connection.service';
import { Xr2QuickPickDrawerService } from '../../api-xr2/services/quick-pick-drawer.service';
import { QuickPickDrawerRequest } from '../model/quick-pick-drawer-request';
import { BarcodeScanMessage } from '../model/barcode-scan-message';
import { QuickPickError } from '../model/quick-pick-error';

@Component({
  selector: 'app-quick-pick-drawer-view',
  templateUrl: './quick-pick-drawer-view.component.html',
  styleUrls: ['./quick-pick-drawer-view.component.scss']
})
export class QuickPickDrawerViewComponent implements OnInit {

  @Output() quickPickActive: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() failedEvent: EventEmitter<QuickPickError> = new EventEmitter<QuickPickError>();

  private _scanMessage: BarcodeScanMessage;
  private _quickpickDrawers: QuickPickDrawerData[];
  detailedDrawer: QuickPickDrawerData;

  @Input() selectedDeviceInformation: SelectableDeviceInfo;

  @Input()
  set quickpickDrawers(value: QuickPickDrawerData[]) {
    this._quickpickDrawers = value;
    this.loadDetailedDrawer();
  }

  get quickpickDrawers(): QuickPickDrawerData[] {
    return this._quickpickDrawers;
  }

  @Input()
  set scanMessage(value: BarcodeScanMessage) {
    this._scanMessage = value;

    if (this.loadDetailedDrawerOnScan()) {
      this.scanDrawerLabel();
    }
  }

  get scanMessage(): BarcodeScanMessage {
    return this._scanMessage;
  }

  constructor(
    private quickPickEventConnectionService: QuickPickEventConnectionService,
    private quickPickDrawerService: Xr2QuickPickDrawerService,
  ) {
  }

  ngOnInit() {
    this.configureEventHandlers();
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

  scanDrawerLabel() {
    if (!this.scanMessage) {
      return;
    }

    const scanRequest = new QuickPickDrawerRequest(this.detailedDrawer.Id, this.detailedDrawer.Xr2ServiceBarcode);
    this.quickPickDrawerService.scanLabel(this.selectedDeviceInformation.DeviceId.toString(), scanRequest).subscribe(
      () => {
        this.unlockDrawer();
      }, error => {
        this.failedEvent.emit(QuickPickError.ScanNotFound);
      });
  }

  printDrawerLabel() {
    const printRequest = new QuickPickDrawerRequest(this.detailedDrawer.Id, this.detailedDrawer.Xr2ServiceBarcode);
    this.quickPickDrawerService.printLabel(this.selectedDeviceInformation.DeviceId.toString(), printRequest).subscribe(
      () => {
      }, error => {
        this.failedEvent.emit(QuickPickError.PrintFailure);
      });
  }

  unlockDrawer() {
    const unlockRequest = new QuickPickDrawerRequest(this.detailedDrawer.Id, this.detailedDrawer.Xr2ServiceBarcode);
    this.quickPickDrawerService.unlockDrawer(this.selectedDeviceInformation.DeviceId.toString(), unlockRequest).subscribe(
      () => {
      }, error => {
        this.failedEvent.emit(QuickPickError.UnlockFailure);
      });
  }

  /* istanbul ignore next */
  private onUpdateQuickPickDrawer(quickPickDrawerUpdateMessage): void {
    if (quickPickDrawerUpdateMessage.DeviceId !== undefined
      && quickPickDrawerUpdateMessage.DeviceId !== this.selectedDeviceInformation.DeviceId) {
      return;
    }

    const quickPickDrawerData = new QuickPickDrawerData(quickPickDrawerUpdateMessage.QuickPickDrawerData);
    quickPickDrawerData.MedsWithCounts = quickPickDrawerUpdateMessage.QuickPickDrawerData.MedsWithCounts.$values;
    let matchingQuickPickDrawerDataIndex = _.findIndex(this.quickpickDrawers, (x) => {
      return x.Id === quickPickDrawerData.Id;
    });

    this.quickpickDrawers[matchingQuickPickDrawerDataIndex] = quickPickDrawerData;

    if (this.detailedDrawer !== undefined) {
      if (this.detailedDrawer.Id === quickPickDrawerData.Id) {
        this.detailedDrawer = quickPickDrawerData;
        if (quickPickDrawerData.Status < 2) {
          this.detailedDrawer = undefined;
          this.quickPickActive.emit(false);
        }
      }
    }
  }

  private loadDetailedDrawer(): boolean {
    if (!this.quickpickDrawers) {
      return false;
    }

    const matchingDrawerIndex = _.findIndex(this.quickpickDrawers, (drawerToDisplay) => {
      return drawerToDisplay.Status > 1;
    });
    if (matchingDrawerIndex !== -1) {
      this.detailedDrawer = this.quickpickDrawers[matchingDrawerIndex];
      this.quickPickActive.emit(true);
      return true;
    }
  }

  private loadDetailedDrawerOnScan(): boolean {
    if (!this.scanMessage || !this.selectedDeviceInformation) {
      return false;
    }

    if (!this.selectedDeviceInformation.IsActive) {
      this.failedEvent.emit(QuickPickError.InActive)
    } else if (this.detailedDrawer && this.detailedDrawer.Status > 1) {
      this.failedEvent.emit(QuickPickError.ScanUnavailable);
      return false;
    }

    const matchingDrawerIndex = _.findIndex(this.quickpickDrawers, (drawerToDisplay) => {
      return drawerToDisplay.Xr2ServiceBarcode === this.scanMessage.barcode;
    });
    if (matchingDrawerIndex !== -1) {
      this.detailedDrawer = this.quickpickDrawers[matchingDrawerIndex];
      this.quickPickActive.emit(true);
      return true;
    } else {
      this.failedEvent.emit(QuickPickError.ScanNotFound);
      return false;
    }
  }

  /* istanbul ignore next */
  private configureEventHandlers(): void {
    if (!this.quickPickEventConnectionService) {
      return;
    }

    this.quickPickEventConnectionService.QuickPickDrawerUpdateSubject
      .subscribe(message => this.onUpdateQuickPickDrawer(message));
  }
}
