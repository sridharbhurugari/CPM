import { Component, OnInit } from '@angular/core';
import { DeviceReplenishmentNeedsService } from '../../api-core/services/device-replenishment-needs.service';
import { Observable } from 'rxjs';
import { IDeviceReplenishmentNeed } from '../../api-core/data-contracts/i-device-replenishment-need';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';

@Component({
  selector: 'app-internal-transfer-needs-page',
  templateUrl: './internal-transfer-needs-page.component.html',
  styleUrls: ['./internal-transfer-needs-page.component.scss']
})
export class InternalTransferNeedsPageComponent implements OnInit {

  deviceNeeds$: Observable<IDeviceReplenishmentNeed[]>;

  constructor(
    private wpfActionControllerService: WpfActionControllerService,
    deviceReplenishmentNeedsService: DeviceReplenishmentNeedsService,
  ) {
    this.deviceNeeds$ = deviceReplenishmentNeedsService.get();
  }

  ngOnInit() {
  }

  deviceSelected(deviceId: number){
    // this.wpfActionControllerService.ExecuteContinueNavigationAction(`/internalTransfer/replenishmentNeeds/devices/${deviceId}`);
  }
}
