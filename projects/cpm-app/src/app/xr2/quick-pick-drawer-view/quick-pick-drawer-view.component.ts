import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import * as _ from 'lodash';
import { PopupDialogProperties, PopupDialogType, PopupDialogService } from '@omnicell/webcorecomponents';

import { QuickPickDrawerData } from '../model/quick-pick-drawer-data';
import { QuickPickEventConnectionService } from '../services/quick-pick-event-connection.service';
import { Xr2QuickPickDrawerService } from '../../api-xr2/services/quick-pick-drawer.service';
import { TranslateService } from '@ngx-translate/core';
import { QuickPickDrawerRequest } from '../model/quick-pick-print-request';
import { HardwareLeaseService } from '../../api-core/services/hardware-lease-service';
import { LeaseVerificationResult } from '../../api-core/data-contracts/lease-verification-result';
import { ActivatedRoute, Router, Params, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-quick-pick-drawer-view',
  templateUrl: './quick-pick-drawer-view.component.html',
  styleUrls: ['./quick-pick-drawer-view.component.scss']
})
export class QuickPickDrawerViewComponent implements OnInit {

  @Output() quickPickActive: EventEmitter<boolean> = new EventEmitter<boolean>();
  queryParams: Params;
  private _selectedDeviceId: string;
  private _quickpickDrawers: QuickPickDrawerData[];
  detailedDrawer: QuickPickDrawerData;
  deviceLeaseOwner = false;

  @Input()
  set quickpickDrawers(value: QuickPickDrawerData[]) {
    this._quickpickDrawers = value;
    this.loadDetailedDrawerIfAvailable();
  }

  get quickpickDrawers(): QuickPickDrawerData[] {
    return this._quickpickDrawers;
  }

  @Input()
  set selectedDeviceId(value: string) {
    this._selectedDeviceId = value;
    if (value !== undefined) {
      console.log('Selected DeviceID :' + this.selectedDeviceId);
      this.hardwareLeaseService.HasDeviceLease(Number(this.selectedDeviceId)).subscribe(
        leaseVerificationResults => {
          console.log('Lease Verification Results : ' + leaseVerificationResults);
          if (leaseVerificationResults === LeaseVerificationResult.Success) {
            this.deviceLeaseOwner = true;
          } else {
            this.deviceLeaseOwner = false;
          }
          console.log('Current Lease Owner : ' + this.deviceLeaseOwner);
        });
    }
  }

  get selectedDeviceId(): string {
    return this._selectedDeviceId;
  }

  constructor(
    private quickPickEventConnectionService: QuickPickEventConnectionService,
    private quickPickDrawerService: Xr2QuickPickDrawerService,
    private translateService: TranslateService,
    private dialogService: PopupDialogService,
    private hardwareLeaseService: HardwareLeaseService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.configureEventHandlers();
  }

  onShowQuickPickDrawerDetails(drawerIndex: number) {
    if (this.deviceLeaseOwner === false) {
      this.detailedDrawer = this._quickpickDrawers[drawerIndex];
      this.printDrawerLabel();
      this.quickPickActive.emit(true);
    } else {
      const navigationExtras: NavigationExtras = {
        queryParams: { deviceId: this.selectedDeviceId, routeToPath: 'quickPick' },
        fragment: 'anchor'
      };
      this.router.navigate(['hardwareLease/requestLease'], navigationExtras );
    }
  }

  onCloseQuickPickDrawerDetails(value?: any) {
    this.detailedDrawer = undefined;
    this.quickPickActive.emit(false);
  }

  printDrawerLabel() {
      const printRequest = new QuickPickDrawerRequest(this.detailedDrawer.Id, this.detailedDrawer.Xr2ServiceBarcode);
      this.quickPickDrawerService.printLabel(this.selectedDeviceId, printRequest).subscribe(
        () => {
        }, error => {
          this.displayFailedToSaveDialog();
        });

        // TODO:  THIS IS HERE UNTIL PRINT AND SCAN IS THE UNLOCK METHOD
      this.unlockDrawer();
  }

  unlockDrawer() {
    const printRequest = new QuickPickDrawerRequest(this.detailedDrawer.Id, this.detailedDrawer.Xr2ServiceBarcode);
    this.quickPickDrawerService.unlockDrawer(this.selectedDeviceId, printRequest).subscribe(
      () => {
      }, error => {
        this.displayFailedToSaveDialog();
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

  private loadDetailedDrawerIfAvailable() {
    if (!this._quickpickDrawers) {
      return;
    }

    const matchingDrawerIndex = _.findIndex(this.quickpickDrawers, (drawerToDisplay) => {
      return drawerToDisplay.Status > 1;
    });
    if (matchingDrawerIndex !== -1) {
      this.detailedDrawer = this.quickpickDrawers[matchingDrawerIndex];
      this.quickPickActive.emit(true);
    }
  }

  private configureEventHandlers(): void {
    if (!this.quickPickEventConnectionService) {
      return;
    }

    this.quickPickEventConnectionService.QuickPickDrawerUpdateSubject
      .subscribe(message => this.onUpdateQuickPickDrawer(message));
  }

  /* istanbul ignore next */
  private displayFailedToSaveDialog(): void {
    const properties = new PopupDialogProperties('Role-Status-Warning');
    this.translateService.get('FAILEDTOSAVE_HEADER_TEXT').subscribe(result => { properties.titleElementText = result; });
    this.translateService.get('FAILEDTOSAVE_BODY_TEXT').subscribe(result => { properties.messageElementText = result; });
    properties.showPrimaryButton = true;
    properties.showSecondaryButton = false;
    properties.primaryButtonText = 'Ok';
    properties.dialogDisplayType = PopupDialogType.Error;
    properties.timeoutLength = 60;
    this.dialogService.showOnce(properties);
  }

}
