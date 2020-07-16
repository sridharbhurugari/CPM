import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import * as _ from 'lodash';
import { PopupDialogProperties, PopupDialogType, PopupDialogService } from '@omnicell/webcorecomponents';

import { QuickPickDrawerData } from '../model/quick-pick-drawer-data';
import { QuickPickEventConnectionService } from '../services/quick-pick-event-connection.service';
import { Xr2QuickPickDrawerService } from '../../api-xr2/services/quick-pick-drawer.service';
import { TranslateService } from '@ngx-translate/core';
import { QuickPickDrawerRequest } from '../model/quick-pick-print-request';
import { ScanMessage } from '../model/scan-message';
import { QuickPickScanError } from '../model/quick-pick-scan-error';

@Component({
  selector: 'app-quick-pick-drawer-view',
  templateUrl: './quick-pick-drawer-view.component.html',
  styleUrls: ['./quick-pick-drawer-view.component.scss']
})
export class QuickPickDrawerViewComponent implements OnInit {

  @Output() quickPickActive: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() failedScanEvent: EventEmitter<QuickPickScanError> = new EventEmitter<QuickPickScanError>();
  @Output() failedSaveEvent: EventEmitter<void> = new EventEmitter<void>();

  private _selectedDeviceId: string;
  private _scanMessage: ScanMessage;
  private _quickpickDrawers: QuickPickDrawerData[];
  detailedDrawer: QuickPickDrawerData;

  @Input()
  set quickpickDrawers(value: QuickPickDrawerData[]) {
    this._quickpickDrawers = value;
    this.loadDetailedDrawer();
  }

  get quickpickDrawers(): QuickPickDrawerData[] {
    return this._quickpickDrawers;
  }

  @Input()
  set scanMessage(value: ScanMessage) {
    this._scanMessage = value;

    if (this.loadDetailedDrawerOnScan()) {
      this.scanDrawerLabel();
    }
  }

  get scanMessage(): ScanMessage {
    return this._scanMessage;
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
    private quickPickDrawerService: Xr2QuickPickDrawerService,
  ) {
  }

  ngOnInit() {
    this.configureEventHandlers();
  }

  onShowQuickPickDrawerDetails(drawerIndex: number) {
    this.detailedDrawer = this._quickpickDrawers[drawerIndex];
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

    const printRequest = new QuickPickDrawerRequest(this.detailedDrawer.Id, this.detailedDrawer.Xr2ServiceBarcode);
    this.quickPickDrawerService.scanLabel(this.selectedDeviceId, printRequest).subscribe(
      () => {
        this.unlockDrawer();
      }, error => {
        this.failedScanEvent.emit(QuickPickScanError.NotFound);
      });
  }

  printDrawerLabel() {
    const printRequest = new QuickPickDrawerRequest(this.detailedDrawer.Id, this.detailedDrawer.Xr2ServiceBarcode);
    this.quickPickDrawerService.printLabel(this.selectedDeviceId, printRequest).subscribe(
      () => {
      }, error => {
        this.failedSaveEvent.emit();
      });
  }

  unlockDrawer() {
    const printRequest = new QuickPickDrawerRequest(this.detailedDrawer.Id, this.detailedDrawer.Xr2ServiceBarcode);
    this.quickPickDrawerService.unlockDrawer(this.selectedDeviceId, printRequest).subscribe(
      () => {
      }, error => {
        this.failedSaveEvent.emit();
      });
  }

  /* istanbul ignore next */
  private onUpdateQuickPickDrawer(quickPickDrawerUpdateMessage): void {
    if (quickPickDrawerUpdateMessage.DeviceId !== undefined
      && quickPickDrawerUpdateMessage.DeviceId.toString() !== this.selectedDeviceId) {
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
    if (!this.scanMessage) {
      return false;
    }

    if (this.detailedDrawer && this.detailedDrawer.Status > 1) {
      this.failedScanEvent.emit(QuickPickScanError.Unavailable);
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
      this.failedScanEvent.emit(QuickPickScanError.NotFound);
      return false;
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
