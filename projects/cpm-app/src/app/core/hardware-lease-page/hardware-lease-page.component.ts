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
import { PopupDialogProperties, PopupDialogType, PopupDialogService } from '@omnicell/webcorecomponents';


@Component({
  selector: 'app-hardware-lease-page',
  templateUrl: './hardware-lease-page.component.html',
  styleUrls: ['./hardware-lease-page.component.scss']
})
export class HardwareLeasePageComponent implements OnInit {
  readonly devicePropertyName = nameof<DeviceConfigurationList>('DeviceDescription');
  readonly deviceOwnerPropertyName = nameof<DeviceConfigurationList>('DefaultOwnerShortname');

  @Input()
  displayDeviceConfigurationList: DeviceConfigurationList[] = [];

  public time: Date = new Date();
  deviceId: any;
  queryParams: Params;
  routeToPath: any;

  constructor(
    private wpfActionController: WpfActionControllerService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private hardwareLeaseService: HardwareLeaseService,
    private translateService: TranslateService,
    private dialogService: PopupDialogService ) {

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
    });
  }

  navigateBack() {
    this.wpfActionController.ExecuteBackAction();
  }

  requestAccessClick() {

    this.hardwareLeaseService.RequestDeviceLease(this.deviceId).subscribe(results => {
      console.log(results);
      if (results.IsSuccessful === false) {
        this.displayRequestLeaseDialog(results.OutcomeText);
      } else {
        const navigationExtras: NavigationExtras = {
          queryParams: { deviceId: this.deviceId },
          fragment: 'anchor'
        };
        this.router.navigate([this.routeToPath], navigationExtras );
      }
    });
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
}
