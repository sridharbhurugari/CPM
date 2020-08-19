import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { DeviceReplenishmentNeedsService } from '../../api-core/services/device-replenishment-needs.service';
import { IItemReplenishmentNeed } from '../../api-core/data-contracts/i-item-replenishment-need';
import { Observable } from 'rxjs';
import { DevicesService } from '../../api-core/services/devices.service';
import { map } from 'rxjs/operators';
import { IDevice } from '../../api-core/data-contracts/i-device';

@Component({
  selector: 'app-internal-transfer-device-needs-page',
  templateUrl: './internal-transfer-device-needs-page.component.html',
  styleUrls: ['./internal-transfer-device-needs-page.component.scss']
})
export class InternalTransferDeviceNeedsPageComponent implements OnInit {
  itemNeeds$: Observable<IItemReplenishmentNeed[]>;
  device$: Observable<IDevice>;

  constructor(
    private wpfActionControllerService: WpfActionControllerService,
    activatedRoute: ActivatedRoute,
    devicesService: DevicesService,
    deviceReplenishmentNeedsService: DeviceReplenishmentNeedsService,
  ) {
    let deviceId = Number.parseInt(activatedRoute.snapshot.paramMap.get('deviceId'));
    this.device$ = devicesService.get().pipe(map(devices => devices.find(d => d.Id == deviceId)));
    this.itemNeeds$ = deviceReplenishmentNeedsService.getDeviceItemNeeds(deviceId);
  }

  ngOnInit() {
  }

  goBack() {
    this.wpfActionControllerService.ExecuteBackAction();
  }
}
