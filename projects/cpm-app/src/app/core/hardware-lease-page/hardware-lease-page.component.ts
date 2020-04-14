import { Component, OnInit } from '@angular/core';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { ActivatedRoute, Router, Params, NavigationExtras } from '@angular/router';
import { DeviceLeaseList } from '../model/device-lease-list';
import { nameof } from '../../shared/functions/nameof';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-hardware-lease-page',
  templateUrl: './hardware-lease-page.component.html',
  styleUrls: ['./hardware-lease-page.component.scss']
})
export class HardwareLeasePageComponent implements OnInit {
  readonly devicePropertyName = nameof<DeviceLeaseList>("DeviceDescription");
  readonly deviceOwnerPropertyName = nameof<DeviceLeaseList>("DeviceOwner");
  displayDeviceLeaseList$: Observable<DeviceLeaseList[]>;

  public time: Date = new Date();
  deviceId: any;
  queryParams: Params;
  routeToPath: any;

  constructor(private wpfActionController: WpfActionControllerService, private activatedRoute: ActivatedRoute, private router: Router ) {

    setInterval(() => {
      this.time = new Date();
    }, 1);
  }

  ngOnInit() {
    this.deviceId = this.activatedRoute.snapshot.queryParamMap.get('deviceId');
    this.routeToPath  = this.activatedRoute.snapshot.queryParamMap.get('routeToPath');
    this.displayDeviceLeaseList$ = new Observable<DeviceLeaseList[]>();
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
