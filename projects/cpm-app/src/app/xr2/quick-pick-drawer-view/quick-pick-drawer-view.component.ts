import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import * as _ from 'lodash';

import { QuickPickDrawerData } from '../model/quick-pick-drawer-data';
import { QuickPickEventConnectionService } from '../services/quick-pick-event-connection.service';
import { Xr2QuickPickDrawerService } from '../../api-xr2/services/quick-pick-drawer.service';
import { QuickPickDrawerRequest } from '../model/quick-pick-drawer-request';
import { Guid } from 'guid-typescript';
import { BarcodeScanMessage } from '../model/barcode-scan-message';
import { QuickPickError } from '../model/quick-pick-error';
import { NavigationExtras, Router } from '@angular/router';
import { LeaseVerificationResult } from '../../api-core/data-contracts/lease-verification-result';
import { HardwareLeaseService } from '../../api-core/services/hardware-lease-service';

@Component({
  selector: 'app-quick-pick-drawer-view',
  templateUrl: './quick-pick-drawer-view.component.html',
  styleUrls: ['./quick-pick-drawer-view.component.scss']
})
export class QuickPickDrawerViewComponent implements OnInit {

  @Output() quickPickActive: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() rerouteQuickPick: EventEmitter<Guid> = new EventEmitter<Guid>();
  @Output() failedEvent: EventEmitter<QuickPickError> = new EventEmitter<QuickPickError>();

  private _selectedDeviceId: string;
  private _scanMessage: BarcodeScanMessage;
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
  set scanMessage(value: BarcodeScanMessage) {
    this._scanMessage = value;
    if (!value) {
      return;
    }

    this.checkForHardwareLease(
      () => {
        if (this.loadDetailedDrawerOnScan()) {
          this.scanDrawerLabel();
        }});
  }

  get scanMessage(): BarcodeScanMessage {
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
    private router: Router,
    private hardwareLeaseService: HardwareLeaseService
  ) {
  }

  ngOnInit() {
    this.configureEventHandlers();
  }

  checkForHardwareLease(success: () => void) {
    return this.hardwareLeaseService.HasDeviceLease(Number(this.selectedDeviceId)).subscribe(leaseVerificationResults => {
      console.log('Lease Verification Results : ' + LeaseVerificationResult[leaseVerificationResults]);
      if (Number(leaseVerificationResults) === Number(LeaseVerificationResult.Success)) {
        console.log('was a Success');
        success();
      } else {
        console.log('was a failure');
        this.navigateToDeviceLeasePage();
      }
    });
  };

  navigateToDeviceLeasePage() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        deviceId: this.selectedDeviceId,
        routeToPath: 'quickpick' } ,
      fragment: 'anchor'
    };
    this.router.navigate(['hardwareLease/requestLease'], navigationExtras );
  }

  onShowQuickPickDrawerDetails(drawerIndex: number) {
    this.detailedDrawer = this._quickpickDrawers[drawerIndex];
  }

  // Called from Quick Pick Card
  onPrintQuickPickDrawer(drawerIndex: number) {
    this.checkForHardwareLease(
      () => {
        this.detailedDrawer = this._quickpickDrawers[drawerIndex];
        this.printDrawerLabel();
        this.quickPickActive.emit(true);
        });
  }

  // Called from Details View
  onPrintCurrentQuickPickDrawer() {
    this.checkForHardwareLease(
      () => {
        this.printDrawerLabel();
        this.quickPickActive.emit(true);
        });
  }

  onRerouteQuickPickDrawer(robotDispenseBoxId: Guid) {
    this.rerouteQuickPick.emit(robotDispenseBoxId);
  }

  onCloseQuickPickDrawerDetails() {
    this.detailedDrawer = undefined;
    this.quickPickActive.emit(false);
  }

  onUnlockUnknownDrawer(drawerIndex: number) {
    this.checkForHardwareLease(
      () => {
        this.detailedDrawer = this._quickpickDrawers[drawerIndex];
        // shortcut right to unlock, there is no printed label here
        this.unlockDrawer();
        this.quickPickActive.emit(true);
        });
  }

  scanDrawerLabel() {
    if (!this.scanMessage) {
      return;
    }

    const scanRequest = new QuickPickDrawerRequest(this.detailedDrawer.Id, this.scanMessage.barcode);
    this.quickPickDrawerService.unlockDrawer(this.selectedDeviceId, scanRequest).subscribe(
      () => { },
      () => {
        this.failedEvent.emit(QuickPickError.ScanNotFound);
      });
  }

  printDrawerLabel() {
    const printRequest = new QuickPickDrawerRequest(this.detailedDrawer.Id, this.detailedDrawer.Xr2ServiceBarcode);
    this.quickPickDrawerService.printLabel(this.selectedDeviceId, printRequest).subscribe(
      () => { },
      () => {
        this.failedEvent.emit(QuickPickError.PrintFailure);
      });
  }

  unlockDrawer() {
    const unlockRequest = new QuickPickDrawerRequest(this.detailedDrawer.Id, this.detailedDrawer.Xr2ServiceBarcode);
    this.quickPickDrawerService.unlockDrawer(this.selectedDeviceId, unlockRequest).subscribe(
      () => { },
      () => {
        this.failedEvent.emit(QuickPickError.UnlockFailure);
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
