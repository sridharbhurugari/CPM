import { Component, OnInit } from '@angular/core';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { ActivatedRoute, Router, Params, NavigationExtras } from '@angular/router';
import { DeviceLeaseList } from '../model/device-lease-list';
import { nameof } from '../../shared/functions/nameof';
import { Observable, of } from 'rxjs';
import { GuidedDeviceListService } from '../../api-core/services/guided-device-list-service';
import { map } from 'rxjs/operators';
import { DeviceConfigurationList } from '../model/device-configuration-list';

@Component({
  selector: 'app-hardware-lease-page',
  templateUrl: './hardware-lease-page.component.html',
  styleUrls: ['./hardware-lease-page.component.scss']
})
export class HardwareLeasePageComponent implements OnInit {
  readonly devicePropertyName = nameof<DeviceConfigurationList>("DeviceDescription");
  readonly deviceOwnerPropertyName = nameof<DeviceConfigurationList>("DefaultOwnerShortname");
  displayDeviceConfigurationList$: Observable<DeviceConfigurationList[]>;

  public time: Date = new Date();
  deviceId: any;
  queryParams: Params;
  routeToPath: any;

  constructor(
    private wpfActionController: WpfActionControllerService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private guideDeviceListService: GuidedDeviceListService ) {

    setInterval(() => {
      this.time = new Date();
    }, 1);
  }

  ngOnInit() {
    this.deviceId = this.activatedRoute.snapshot.queryParamMap.get('deviceId');
    this.routeToPath  = this.activatedRoute.snapshot.queryParamMap.get('routeToPath');
    this.displayDeviceConfigurationList$ = this.guideDeviceListService.getDeviceDefaultOwner(this.deviceId);
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
