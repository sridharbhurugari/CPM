import { Component, OnInit } from '@angular/core';
import { IDeviceReplenishmentNeed } from '../../api-core/data-contracts/i-device-replenishment-need';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DeviceReplenishmentNeedsService } from '../../api-core/services/device-replenishment-needs.service';
import { CoreEventConnectionService } from "../../api-core/services/core-event-connection.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-internal-transfer-device-summaries-page',
  templateUrl: './internal-transfer-device-summaries-page.component.html',
  styleUrls: ['./internal-transfer-device-summaries-page.component.scss']
})
export class InternalTransferDeviceSummariesPageComponent implements OnInit {
  deviceNeeds$: Observable<IDeviceReplenishmentNeed[]>;
  ngUnsubscribe = new Subject();
  isTransferByNeeds: boolean;

  constructor(
    coreEventConnectionService: CoreEventConnectionService,
    private router: Router,
    private deviceReplenishmentNeedsService: DeviceReplenishmentNeedsService,
  ) {
    coreEventConnectionService.refreshDeviceNeedsSubject
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(message => {
        try {
          this.onRefreshDeviceNeeds();
        }
        catch (e) {
          console.log(e);
        }
      });
    this.loadDeviceNeeds();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private onRefreshDeviceNeeds(): void {
    this.loadDeviceNeeds();
    this.isTransferByNeeds = true;
  }

  private loadDeviceNeeds(): void {
    this.deviceNeeds$ = this.deviceReplenishmentNeedsService.get();
  }

  ngOnInit() {
    this.isTransferByNeeds = true;
  }

  deviceSelected(deviceId: number) {
    if (this.isTransferByNeeds) {
      this.router.navigate(['core/internalTransfer/deviceReplenishmentNeeds/', deviceId]);
      return;
    }
  }

  tranferByNeedsChanged(isTransferByNeeds: boolean) {
    this.isTransferByNeeds = isTransferByNeeds;
  }
}
