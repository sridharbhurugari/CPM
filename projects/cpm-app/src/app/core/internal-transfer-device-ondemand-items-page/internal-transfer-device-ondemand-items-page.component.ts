import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { map, shareReplay, takeUntil } from 'rxjs/operators';
import { IDevice } from '../../api-core/data-contracts/i-device';
import { CoreEventConnectionService } from '../../api-core/services/core-event-connection.service';
import { DeviceReplenishmentOnDemandService } from '../../api-core/services/device-replenishment-ondemand.service';
import { DevicesService } from '../../api-core/services/devices.service';
import { SimpleDialogService } from '../../shared/services/dialogs/simple-dialog.service';
import { Location } from '@angular/common';
import { IItemReplenishmentNeed } from '../../api-core/data-contracts/i-item-replenishment-need';
import { IInterDeviceTransferPickRequest } from '../../api-core/data-contracts/i-inter-device-transfer-pick-request';
import * as _ from 'lodash';
import { IItemReplenishmentOnDemand } from '../../api-core/data-contracts/i-item-replenishment-ondemand';

@Component({
  selector: 'app-internal-transfer-device-ondemand-items-page',
  templateUrl: './internal-transfer-device-ondemand-items-page.component.html',
  styleUrls: ['./internal-transfer-device-ondemand-items-page.component.scss']
})
export class InternalTransferDeviceOndemandItemsPageComponent implements OnInit {
  assignedItems$: Observable<IItemReplenishmentOnDemand[]>;
  device$: Observable<IDevice>;
  colHeaders$: Observable<any>;
  deviceId: number;
  itemsToPick: IItemReplenishmentNeed[] = new Array();
  ngUnsubscribe = new Subject();

  constructor(
    private location: Location,
    private simpleDialogService: SimpleDialogService,
    private deviceReplenishmentOnDemandService: DeviceReplenishmentOnDemandService,
    activatedRoute: ActivatedRoute,
    devicesService: DevicesService,
    coreEventConnectionService: CoreEventConnectionService
  ) {
    this.deviceId = Number.parseInt(activatedRoute.snapshot.paramMap.get('deviceId'));
    this.device$ = devicesService.get().pipe(shareReplay(1), map(devices => devices.find(d => d.Id === this.deviceId)));

    this.loadAssignedItems();

    coreEventConnectionService.refreshDeviceOnDemandSubject
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(message => {
      try {
        this.onRefreshDeviceItems();
      }
      catch (e) {
        console.log(e);
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  goBack() {
    this.location.back();
  }

  onSelect(items: IItemReplenishmentNeed[]) {
    this.itemsToPick = items;
  }

  pick() {
    if (this.itemsToPick.length > 0) {
      var picksByItemId = _.groupBy(this.itemsToPick, x => x.ItemId);
      const items: IInterDeviceTransferPickRequest[] = new Array<IInterDeviceTransferPickRequest>();
      for(var itemId in picksByItemId){
        const itemPicks = picksByItemId[itemId];
        const item = {
          ItemId: itemId,
          QuantityToPick: itemPicks.map(x => x.DeviceQuantityNeeded).reduce((total, value) => total + value),
          SourceDeviceLocationId: itemPicks[0].PickLocationDeviceLocationId
        };
        items.push(item);
      }
     this.deviceReplenishmentOnDemandService.pickDeviceItemNeeds(this.deviceId, items).subscribe(x => this.handlePickSuccess(), e => this.handlePickFailure());
    } else {
      this.simpleDialogService.displayErrorOk('INTERNAL_TRANS_PICKQUEUE_SENT_TITLE', 'INTERNAL_TRANS_PICKQUEUE_NONE_SELECTED');
    }
  }

  private loadAssignedItems() {
    this.assignedItems$ = this.deviceReplenishmentOnDemandService.getDeviceAssignedItems(this.deviceId).pipe(shareReplay(1));
  }

  private onRefreshDeviceItems() {
    this.loadAssignedItems();
  }

  private handlePickSuccess() {
    this.onRefreshDeviceItems();
    this.simpleDialogService.displayInfoOk('INTERNAL_TRANS_PICKQUEUE_SENT_TITLE', 'INTERNAL_TRANS_PICKQUEUE_SENT_OK');
  }

  private handlePickFailure() {
    this.simpleDialogService.displayInfoOk('INTERNAL_TRANS_PICKQUEUE_FAILED_TITLE', 'INTERNAL_TRANS_PICKQUEUE_FAILED_MSG');
  }
}
