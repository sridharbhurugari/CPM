import { Component, OnInit } from '@angular/core';
import { IDeviceReplenishmentNeed } from '../../api-core/data-contracts/i-device-replenishment-need';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DeviceReplenishmentNeedsService } from '../../api-core/services/device-replenishment-needs.service';
import { CoreEventConnectionService } from "../../api-core/services/core-event-connection.service";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { parseBool } from '../../shared/functions/parseBool';
import { WpfInteropService } from '../../shared/services/wpf-interop.service';

@Component({
  selector: 'app-internal-transfer-device-summaries-page',
  templateUrl: './internal-transfer-device-summaries-page.component.html',
  styleUrls: ['./internal-transfer-device-summaries-page.component.scss']
})
export class InternalTransferDeviceSummariesPageComponent {
  private needsBasedKey: string = 'isNeedsBased';

  deviceNeeds$: Observable<IDeviceReplenishmentNeed[]>;
  ngUnsubscribe = new Subject();
  isTransferByNeeds: boolean = true;

  constructor(
    coreEventConnectionService: CoreEventConnectionService,
    private router: Router,
    private deviceReplenishmentNeedsService: DeviceReplenishmentNeedsService,
    private activatedRoute: ActivatedRoute,
    wpfInteropService: WpfInteropService,
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
    this.activatedRoute.queryParamMap
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(q => {
        var stringValue = q.get(this.needsBasedKey);
        if (stringValue) {
          this.isTransferByNeeds = parseBool(stringValue);
        }
      });
    wpfInteropService.wpfViewModelActivated
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(s => this.loadDeviceNeeds());
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private onRefreshDeviceNeeds(): void {
    this.loadDeviceNeeds();
  }

  private loadDeviceNeeds(): void {
    this.deviceNeeds$ = this.deviceReplenishmentNeedsService.get();
  }

  deviceSelected(deviceId: number) {
    if (this.isTransferByNeeds) {
      this.router.navigate(['core/internalTransfer/deviceReplenishmentNeeds/', deviceId]);
      return;
    }

    this.router.navigate(['core/internalTransfer/deviceReplenishmentOnDemand/', deviceId]);
  }

  setIsNeedsBasedTransfer(value: boolean) {
    let queryParams: Params = { };
    queryParams[this.needsBasedKey] = value;
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: queryParams 
    });
  }
}
