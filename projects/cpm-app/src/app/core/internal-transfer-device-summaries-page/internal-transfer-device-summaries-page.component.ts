import { Component, OnInit } from '@angular/core';
import { IDeviceReplenishmentNeed } from '../../api-core/data-contracts/i-device-replenishment-need';
import { Observable } from 'rxjs';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { DeviceReplenishmentNeedsService } from '../../api-core/services/device-replenishment-needs.service';
import { CoreEventConnectionService } from "../../api-core/services/core-event-connection.service";

@Component({
  selector: 'app-internal-transfer-device-summaries-page',
  templateUrl: './internal-transfer-device-summaries-page.component.html',
  styleUrls: ['./internal-transfer-device-summaries-page.component.scss']
})
export class InternalTransferDeviceSummariesPageComponent implements OnInit {
  deviceNeeds$: Observable<IDeviceReplenishmentNeed[]>;

  constructor(
    coreEventConnectionService: CoreEventConnectionService,
    private wpfActionControllerService: WpfActionControllerService,
    private deviceReplenishmentNeedsService: DeviceReplenishmentNeedsService,
  ) {
    coreEventConnectionService.refreshDeviceNeedsSubject.subscribe(message => this.onRefreshDeviceNeeds());
    this.loadDeviceNeeds();
  }

  private onRefreshDeviceNeeds(): void {
    this.loadDeviceNeeds();
  }

  private loadDeviceNeeds(): void {
    this.deviceNeeds$ = this.deviceReplenishmentNeedsService.get();
  }

  ngOnInit() {
  }

  deviceSelected(deviceId: number){
    this.wpfActionControllerService.ExecuteContinueNavigationAction(`core/internalTransfer/deviceReplenishmentNeeds/${deviceId}`);
  }
}
