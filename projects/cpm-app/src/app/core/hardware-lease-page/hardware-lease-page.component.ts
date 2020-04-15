import { Component, OnInit, Input } from '@angular/core';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { ActivatedRoute, Router, Params, NavigationExtras } from '@angular/router';
import { nameof } from '../../shared/functions/nameof';
import { Observable, of } from 'rxjs';
import { DeviceConfigurationList } from '../model/device-configuration-list';
import { HardwareLeaseService } from '../../api-core/services/hardware-lease-service';
import { IDeviceConfiguration } from '../../api-core/data-contracts/i-device-configuration';
import { map } from 'rxjs/operators';


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
    private hardwareLeaseService: HardwareLeaseService ) {

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

    const navigationExtras: NavigationExtras = {
      queryParams: { deviceId: this.deviceId },
      fragment: 'anchor'
    };

    this.router.navigate([this.routeToPath], navigationExtras );
  }

}
