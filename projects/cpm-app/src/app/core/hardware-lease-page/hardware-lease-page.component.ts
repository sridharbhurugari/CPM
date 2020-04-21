import { Component, OnInit, Input } from '@angular/core';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { ActivatedRoute, Router, Params, NavigationExtras } from '@angular/router';
import { nameof } from '../../shared/functions/nameof';
import { Observable, of } from 'rxjs';
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
export class HardwareLeasePageComponent implements OnInit {

  readonly devicePropertyName = nameof<DeviceConfigurationList>('DeviceDescription');
  readonly deviceOwnerPropertyName = nameof<DeviceConfigurationList>('DefaultOwnerShortname');
  popupDialogComponent: PopupDialogComponent;

  @Input() displayDeviceConfigurationList: DeviceConfigurationList[] = [];

  public time: Date = new Date();
  deviceId: any;
  queryParams: Params;
  routeToPath: any;
  spinIcon = 'clear';
  disabledButtons = true;
  systemConfig: IConfigurationValue[];
  hwTimeout = 10000;

  failureOutcome =  [ DeviceOperationOutcome.DeviceOperationOutcome_DeviceInactive,
     DeviceOperationOutcome.DeviceOperationOutcome_DeviceNotLeasedToClient,
     DeviceOperationOutcome.DeviceOperationOutcome_DeviceOfflineOrNotFound,
     DeviceOperationOutcome.DeviceOperationOutcome_ItemsAssignedToDevice,
     DeviceOperationOutcome.DeviceOperationOutcome_PendingLeaseRequestExistsForDevice ];

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

    this.connectToEvents();
    setInterval(() => {
      this.time = new Date();
    }, 1);
  }

  ngOnInit() {

    this.deviceId = this.activatedRoute.snapshot.queryParamMap.get('deviceId');
    this.routeToPath  = this.activatedRoute.snapshot.queryParamMap.get('routeToPath');

    this.hardwareLeaseService.getDeviceConfiguration(this.deviceId).subscribe(res => {
      console.log(res);
      this.displayDeviceConfigurationList.push(res);
      this.disabledButtons = false;
    });

    this.systemConfigurationService.GetConfigurationValues('HARDWARE', 'LEASE_REQUEST_TIMEOUT').subscribe(result => {
      console.log('hw timeout : ' + result);
      console.log(result);
      this.hwTimeout = (Number(result.Value) * 1000) + 2000;
    });
  }

  navigateBack() {
    this.wpfActionController.ExecuteBackAction();
  }

  requestAccessClick() {
    this.disabledButtons = true;
    this.spinIcon = 'spin';

    this.hardwareLeaseService.RequestDeviceLease(this.deviceId).subscribe(results => {
      console.log(results);
      if (results.IsSuccessful === false || this.failureOutcome.includes(results.DeviceOperationOutcome)) {
        this.displayRequestLeaseDialog(results.DeviceOperationOutcome.toString());
      } else if ( results.DeviceOperationOutcome === DeviceOperationOutcome.DeviceOperationOutcome_DeviceLeaseNotRequired ) {
        this.navigateNext();
      }
    });

    setTimeout(() => {
      this.spinIcon = 'clear';
      this.disabledButtons = false;
    }, Number(this.hwTimeout));
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

    this.hardwareLeaseEventConnectionService.hardwareLeaseGrantedSubject
      .subscribe(message => {
        console.log('Received Granted Event');
        console.log(message);
        this.navigateNext();
      });

    this.hardwareLeaseEventConnectionService.hardwareLeaseDeniedSubject
      .subscribe(message => {
        console.log('Received Denied Event');
        console.log(message);
        this.displayRequestLeaseDialog('HardwareLease_Access_Denied');
      });
  }
}
