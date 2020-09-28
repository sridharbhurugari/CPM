import { Component, OnInit } from '@angular/core';
import { IDeviceReplenishmentNeed } from '../../api-core/data-contracts/i-device-replenishment-need';
import { Observable } from 'rxjs';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { DeviceReplenishmentNeedsService } from '../../api-core/services/device-replenishment-needs.service';

@Component({
  selector: 'app-internal-transfer-device-summaries-page',
  templateUrl: './internal-transfer-device-summaries-page.component.html',
  styleUrls: ['./internal-transfer-device-summaries-page.component.scss']
})
export class InternalTransferDeviceSummariesPageComponent implements OnInit {
  deviceNeeds$: Observable<IDeviceReplenishmentNeed[]>;

  constructor(
    private wpfActionControllerService: WpfActionControllerService,
    deviceReplenishmentNeedsService: DeviceReplenishmentNeedsService,
  ) {
    this.deviceNeeds$ = deviceReplenishmentNeedsService.get();
  }

  ngOnInit() {
  }

  deviceSelected(deviceId: number) {
    this.wpfActionControllerService.ExecuteContinueNavigationAction(`/internalTransfer/deviceReplenishmentNeeds/${deviceId}`);
  }
}
