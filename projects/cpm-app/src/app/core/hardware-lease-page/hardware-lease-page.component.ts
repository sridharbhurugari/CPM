import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { ActivatedRoute, Router, Params, NavigationExtras } from '@angular/router';
import { nameof } from '../../shared/functions/nameof';
import { Observable, of, Subscription } from 'rxjs';
import { DeviceConfigurationList } from '../model/device-configuration-list';
import { HardwareLeaseService } from '../../api-core/services/hardware-lease-service';
import { IDeviceConfiguration } from '../../api-core/data-contracts/i-device-configuration';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { PopupDialogProperties, PopupDialogType,
  PopupDialogService, PopupDialogComponent } from '@omnicell/webcorecomponents';
import { HardwareLeaseEventConnectionService } from '../../xr2/services/hardware-lease-event-connection.service';
import { SystemConfigurationService } from '../../shared/services/system-configuration.service';
import { IConfigurationService } from 'oal-core';
import { IConfigurationValue } from '../../shared/interfaces/i-configuration-value';
import * as _ from 'lodash';
import { DeviceOperationOutcome } from '../../api-core/data-contracts/device-operation-outcome';


@Component({
  selector: 'app-hardware-lease-page',
  templateUrl: './hardware-lease-page.component.html',
  styleUrls: ['./hardware-lease-page.component.scss']
})
export class HardwareLeasePageComponent implements OnInit, OnDestroy {

  readonly devicePropertyName = nameof<DeviceConfigurationList>('DeviceDescription');
  readonly deviceOwnerPropertyName = nameof<DeviceConfigurationList>('DefaultOwnerShortname');
  popupDialogComponent: PopupDialogComponent;

  pageDescription$;
  @Input() displayDeviceConfigurationList: DeviceConfigurationList[] = [];

  public time: Date = new Date();
  deviceId: any;
  queryParams: Params;
  routeToPath: any;
  spinIcon = 'clear';
  disabledButtons = true;
  systemConfig: IConfigurationValue[];
  hwTimeout = 10000;
  timeoutPending: any;

  failureOutcome =  [ DeviceOperationOutcome.DeviceOperationOutcome_DeviceInactive,
     DeviceOperationOutcome.DeviceOperationOutcome_DeviceNotLeasedToClient,
     DeviceOperationOutcome.DeviceOperationOutcome_DeviceOfflineOrNotFound,
     DeviceOperationOutcome.DeviceOperationOutcome_ItemsAssignedToDevice,
     DeviceOperationOutcome.DeviceOperationOutcome_PendingLeaseRequestExistsForDevice ];

  private hardwareLeaseServiceSubscription: Subscription;
  private systemConfigurationServiceSubscription: Subscription;
  private hardwareLeaseServiceRequestDeviceLeaseSubscription: Subscription;
  private hardwareLeaseEventConnectionServicehardwareLeaseGrantedSubjectSubscription: Subscription;
  private hardwareLeaseEventConnectionServicehardwareLeaseDeniedSubjectSubscription: Subscription;

  constructor(
    private wpfActionController: WpfActionControllerService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private hardwareLeaseService: HardwareLeaseService,
    private translateService: TranslateService,
    private dialogService: PopupDialogService,
    private hardwareLeaseEventConnectionService: HardwareLeaseEventConnectionService,
    private systemConfigurationService: SystemConfigurationService
    ) {

    this.translateService.get('HardwareLease_Page_Description').subscribe(result => { this.pageDescription$ = result; });

    this.connectToEvents();

    setInterval(() => {
      this.time = new Date();
    }, 1);
  }

  ngOnInit() {

    this.deviceId = this.activatedRoute.snapshot.queryParamMap.get('deviceId');
    this.routeToPath  = this.activatedRoute.snapshot.queryParamMap.get('routeToPath');

    this.hardwareLeaseServiceSubscription = this.hardwareLeaseService.getDeviceConfiguration(this.deviceId).subscribe(res => {
      console.log(res);
      this.displayDeviceConfigurationList.push(res);
      this.disabledButtons = false;
    });

    this.systemConfigurationServiceSubscription =
      this.systemConfigurationService.GetConfigurationValues('HARDWARE', 'LEASE_REQUEST_TIMEOUT').subscribe(result => {
      console.log('hw timeout : ' + result);
      console.log(result);
      this.hwTimeout = (Number(result.Value) * 1000) + 2000;
    });
  }

  ngOnDestroy() {
    // if (this.hardwareLeaseServiceSubscription.closed === false) {
    //   this.hardwareLeaseServiceSubscription.unsubscribe();
    // }
    // if (this.systemConfigurationServiceSubscription.closed === false) {
    //   this.systemConfigurationServiceSubscription.unsubscribe();
    // }
    // if (this.hardwareLeaseServiceRequestDeviceLeaseSubscription.closed === false) {
    //   this.hardwareLeaseServiceRequestDeviceLeaseSubscription.unsubscribe();
    // }
    // if (this.hardwareLeaseEventConnectionServicehardwareLeaseDeniedSubjectSubscription.closed === false) {
    //   this.hardwareLeaseEventConnectionServicehardwareLeaseDeniedSubjectSubscription.unsubscribe();
    // }
    // if (this.hardwareLeaseEventConnectionServicehardwareLeaseGrantedSubjectSubscription.closed === false) {
    //   this.hardwareLeaseEventConnectionServicehardwareLeaseGrantedSubjectSubscription.unsubscribe();
    // }

    this.hardwareLeaseEventConnectionService.closeEventConnection();
  }

  navigateBack() {
    this.wpfActionController.ExecuteBackAction();
  }

  requestAccessClick() {
    this.disabledButtons = true;
    this.spinIcon = 'spin';

    this.hardwareLeaseServiceRequestDeviceLeaseSubscription =
    this.hardwareLeaseService.RequestDeviceLease(this.deviceId).subscribe(results => {
      console.log(results);
      if (results.IsSuccessful === false || this.failureOutcome.includes(results.DeviceOperationOutcome)) {
        clearTimeout(this.timeoutPending);
        this.displayRequestLeaseDialog(results.DeviceOperationOutcome.toString());
        this.resetPageAfterResults();
      } else if ( results.DeviceOperationOutcome === DeviceOperationOutcome.DeviceOperationOutcome_DeviceLeaseNotRequired ) {
        this.navigateNext();
      }
    });

    this.SetupRequestDeviceLeaseTimeout();
  }

  SetupRequestDeviceLeaseTimeout() {
    this.timeoutPending = setTimeout(() => {
      this.displayRequestLeaseDialog('HardwareLease_RequestTimeout');
      this.resetPageAfterResults();
   }, Number(this.hwTimeout));
  }

  private resetPageAfterResults() {
    if (this.hardwareLeaseServiceRequestDeviceLeaseSubscription !== undefined &&
        this.hardwareLeaseServiceRequestDeviceLeaseSubscription.closed === false) {
      this.hardwareLeaseServiceRequestDeviceLeaseSubscription.unsubscribe();
    }
    this.spinIcon = 'clear';
    this.disabledButtons = false;
  }

  navigateNext() {
    const navigationExtras: NavigationExtras = {
      queryParams: { deviceId: this.deviceId },
      fragment: 'anchor'
    };
    this.router.navigate([this.routeToPath], navigationExtras );
  }

  private displayRequestLeaseDialog(outcomeText: string): void {
    const properties = new PopupDialogProperties('Request-Device-Lease');
    this.translateService.get('DeviceConfiguration_MessageBoxTitle').subscribe(result => { properties.titleElementText = result; });
    this.translateService.get(outcomeText).subscribe(result => { properties.messageElementText = outcomeText; });
    properties.showPrimaryButton = true;
    properties.showSecondaryButton = false;
    properties.primaryButtonText = 'OK';
    properties.dialogDisplayType = PopupDialogType.Error;
    properties.timeoutLength = 60;
    this.dialogService.showOnce(properties);
  }

  private async connectToEvents(): Promise<void> {
    await this.hardwareLeaseEventConnectionService.openEventConnection();
    this.configureEventHandlers();
  }

  private configureEventHandlers(): void {
    if (!this.hardwareLeaseEventConnectionService) {
      return;
    }

    this.hardwareLeaseEventConnectionServicehardwareLeaseGrantedSubjectSubscription =
      this.hardwareLeaseEventConnectionService.hardwareLeaseGrantedSubject
        .subscribe(message => {
          clearTimeout(this.timeoutPending);
          console.log('Received Granted Event');
          console.log(message);
          this.navigateNext();
        });

    this.hardwareLeaseEventConnectionServicehardwareLeaseDeniedSubjectSubscription =
      this.hardwareLeaseEventConnectionService.hardwareLeaseDeniedSubject
        .subscribe(message => {
          clearTimeout(this.timeoutPending);
          console.log('Received Denied Event');
          console.log(message);
          this.displayRequestLeaseDialog('HardwareLease_Access_Denied');
        });
  }
}
