import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, shareReplay, takeUntil } from 'rxjs/operators';
import { IDevice } from '../../api-core/data-contracts/i-device';
import { IItemLocationDetail } from '../../api-core/data-contracts/i-item-location-detail';
import { IItemReplenishmentOnDemand } from '../../api-core/data-contracts/i-item-replenishment-ondemand';
import { CoreEventConnectionService } from '../../api-core/services/core-event-connection.service';
import { DeviceReplenishmentNeedsService } from '../../api-core/services/device-replenishment-needs.service';
import { DevicesService } from '../../api-core/services/devices.service';
import { ItemLocaitonDetailsService } from '../../api-core/services/item-locaiton-details.service';
import { SimpleDialogService } from '../../shared/services/dialogs/simple-dialog.service';
import { Location } from '@angular/common';
import { IInterDeviceTransferPickPackSizeRequest } from '../../api-core/data-contracts/i-inter-device-transfer-pick-packsize-request';
import { IInterDeviceTransferPickRequest } from '../../api-core/data-contracts/i-inter-device-transfer-pick-request';

@Component({
  selector: 'app-internal-transfer-device-ondemand-item-locations-page',
  templateUrl: './internal-transfer-device-ondemand-item-locations-page.component.html',
  styleUrls: ['./internal-transfer-device-ondemand-item-locations-page.component.scss']
})
export class InternalTransferDeviceOndemandItemLocationsPageComponent implements OnInit, OnDestroy {
  selectedItem$: Observable<IItemReplenishmentOnDemand>;
  itemLocationDetails$: Observable<IItemLocationDetail[]>;
  device$: Observable<IDevice>;
  deviceDescription$: Observable<string>;

  deviceId: number;
  selectedItem: string;
  selecetdPackSize: number;
  itemsToPick: IItemLocationDetail[];

  selectedSource: number;
  requestedAmount: number;

  requestStatus: 'none' | 'selected' | 'picking' ;

  ngUnsubscribe = new Subject();

  constructor(
    private location: Location,
    private simpleDialogService: SimpleDialogService,
    private itemLocaitonDetailsService: ItemLocaitonDetailsService,
    private deviceReplenishmentNeedsService: DeviceReplenishmentNeedsService,
    activatedRoute: ActivatedRoute,
    devicesService: DevicesService,
    coreEventConnectionService: CoreEventConnectionService,
  ) {
    this.selectedItem = activatedRoute.snapshot.paramMap.get('itemId');
    this.selecetdPackSize = Number.parseInt(activatedRoute.snapshot.paramMap.get('packSize'));
    this.deviceId = Number.parseInt(activatedRoute.snapshot.paramMap.get('deviceId'));

    this.device$ = devicesService.get().pipe(shareReplay(1), map((devices: IDevice[]) => devices.find(d => d.Id === this.deviceId)));
    this.deviceDescription$ = this.device$.pipe(map(d => d.Description));
    this.loadSelectedItem();
    this.loadAssignedItemsSourceLocations();

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
    this.requestStatus = 'none';
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onSelectedItem(selectedItem: IItemLocationDetail ) {
    this.itemsToPick = [];
    this.itemsToPick.push(selectedItem);
    this.selectedSource = selectedItem.DeviceLocationId;
    this.requestedAmount = selectedItem.Quantity * this.selecetdPackSize;
  }

  onItemSelected(isSelected: boolean ) {
    if(isSelected) {
      this.requestStatus = 'selected';
      return;
    }

    this.requestStatus = 'none';
  }

  pick() {
    if (this.itemsToPick.length > 0 && this.selectedSource > 0 && this.requestedAmount > 0) {
      this.requestStatus = 'picking'
      const itemPicked = this.itemsToPick.pop();
      let pickItems: IInterDeviceTransferPickRequest[] = [];
      let packSizes: IInterDeviceTransferPickPackSizeRequest[] = [];
      const packSizeInfo = {
        PackSize: this.selecetdPackSize,
        RequestedQuantityInPacks: itemPicked.Quantity,
        IsOnDemand: true
      }
      packSizes.push(packSizeInfo)

      const pickInfo = {
        ItemId: itemPicked.ItemId,
        QuantityToPick: this.requestedAmount,
        SourceDeviceLocationId: this.selectedSource,
        PackSizes: packSizes
      };
      pickItems.push(pickInfo);

      this.deviceReplenishmentNeedsService.pickDeviceItemNeeds(this.deviceId, pickItems).subscribe(x => this.handlePickSuccess(), e => this.handlePickFailure());
      this.onRefreshDeviceItems();
      this.requestStatus = 'none'
    }
  }

  goBack() {
    this.location.back();
  }

  private loadSelectedItem() {
    const assignedItems$ = this.deviceReplenishmentNeedsService.getDeviceAssignedItems(this.deviceId).pipe(shareReplay(1));
    this.selectedItem$ = assignedItems$.pipe(map(items => {
      return items.find(item => item.ItemId === this.selectedItem  && item.PackSize === this.selecetdPackSize)
    } ))
  }

  private loadAssignedItemsSourceLocations() {
    const itemLocations$ = this.itemLocaitonDetailsService.getInternalTransfer(this.selectedItem).pipe(shareReplay(1));
    this.itemLocationDetails$ = itemLocations$.pipe(map(locations => {
      return locations.filter(location =>
        location.ItemId === this.selectedItem &&
        location.DeviceId != this.deviceId &&
        location.DeviceType != "2100" &&
        location.DeviceType != "2040")
      }));
  }

  private onRefreshDeviceItems() {
    this.loadSelectedItem();
    this.loadAssignedItemsSourceLocations();

  }

  private handlePickSuccess() {
    this.selectedSource = 0;
    this.requestedAmount = 0;
    this.simpleDialogService.displayInfoOk('INTERNAL_TRANS_PICKQUEUE_SENT_TITLE', 'INTERNAL_TRANS_PICKQUEUE_SENT_OK');
  }

  private handlePickFailure() {
    this.selectedSource = 0;
    this.requestedAmount = 0;
    this.simpleDialogService.displayInfoOk('INTERNAL_TRANS_PICKQUEUE_FAILED_TITLE', 'INTERNAL_TRANS_PICKQUEUE_FAILED_MSG');
  }
}
