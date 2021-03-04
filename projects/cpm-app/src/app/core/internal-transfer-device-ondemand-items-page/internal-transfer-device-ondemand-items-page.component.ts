import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { map, shareReplay, takeUntil } from 'rxjs/operators';
import { CoreEventConnectionService } from '../../api-core/services/core-event-connection.service';
import { DevicesService } from '../../api-core/services/devices.service';
import { Location } from '@angular/common';
import * as _ from 'lodash';
import { IItemReplenishmentOnDemand } from '../../api-core/data-contracts/i-item-replenishment-ondemand';
import { PopupDialogProperties, PopupDialogService, PopupDialogType } from '@omnicell/webcorecomponents';
import { TranslateService } from '@ngx-translate/core';
import { IItemLocationDetail } from '../../api-core/data-contracts/i-item-location-detail';
import { DeviceReplenishmentNeedsService } from '../../api-core/services/device-replenishment-needs.service';

@Component({
  selector: 'app-internal-transfer-device-ondemand-items-page',
  templateUrl: './internal-transfer-device-ondemand-items-page.component.html',
  styleUrls: ['./internal-transfer-device-ondemand-items-page.component.scss']
})
export class InternalTransferDeviceOndemandItemsPageComponent implements OnInit {
  assignedItems$: Observable<IItemReplenishmentOnDemand[]>;
  itemLocationDetails$: Observable<IItemLocationDetail[]>;
  colHeaders$: Observable<any>;
  deviceDescription$: Observable<string>

  deviceId: number;
  itemsToPick: IItemReplenishmentOnDemand[] = new Array();
  selectedSource: number;
  requestedAmount: number;

  ngUnsubscribe = new Subject();

  popupTitle: string;
  dropdownTitle: string;
  quantityEditorPopupTite: string;
  noLocationsMessage: string;
  qoh: string;

  constructor(

    private router: Router,
    private translateService: TranslateService,
    private location: Location,
    private deviceReplenishmentNeedsService: DeviceReplenishmentNeedsService,
    activatedRoute: ActivatedRoute,
    devicesService: DevicesService,
    coreEventConnectionService: CoreEventConnectionService,
    private dialogService: PopupDialogService
  ) {
    this.deviceId = Number.parseInt(activatedRoute.snapshot.paramMap.get('deviceId'));
    this.deviceDescription$ = devicesService.get()
       .pipe(shareReplay(1), map(devices => devices.find(d => d.Id === this.deviceId)))
       .pipe(map(d => d.Description));

    this.loadAssignedItems();

    coreEventConnectionService.refreshDeviceOnDemandSubject.pipe(takeUntil(this.ngUnsubscribe)).subscribe(message => {
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

  onSelect(item: IItemReplenishmentOnDemand) {
    if(item.AvailablePharmacyLocationCount > 0) {
      this.itemSelected(item);
    } else {
      const properties = new PopupDialogProperties("No_Locations");
      this.translateService.get("OK").subscribe((result) => {
        properties.primaryButtonText = result;
      });
      properties.titleElementText = this.popupTitle;
      properties.messageElementText = this.noLocationsMessage;
      properties.showPrimaryButton = true;
      properties.showSecondaryButton = false;
      properties.dialogDisplayType = PopupDialogType.Error;
      properties.timeoutLength = 0;
      this.dialogService.showOnce(properties);
    }
  }

  private itemSelected(item: IItemReplenishmentOnDemand) {
    this.router.navigate(['core/internalTransfer/deviceReplenishmentOnDemand/ItemSource/deviceId', this.deviceId, 'itemId', item.ItemId, 'packSize', item.PackSize]);
  }

  private loadAssignedItems() {
    this.assignedItems$ = this.deviceReplenishmentNeedsService.getDeviceAssignedItems(this.deviceId).pipe(shareReplay(1));
  }

  private onRefreshDeviceItems() {
    this.loadAssignedItems();
  }
}
