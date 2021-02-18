import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { map, shareReplay, take, takeUntil } from 'rxjs/operators';
import { IDevice } from '../../api-core/data-contracts/i-device';
import { CoreEventConnectionService } from '../../api-core/services/core-event-connection.service';
import { DeviceReplenishmentOnDemandService } from '../../api-core/services/device-replenishment-ondemand.service';
import { DevicesService } from '../../api-core/services/devices.service';
import { SimpleDialogService } from '../../shared/services/dialogs/simple-dialog.service';
import { Location } from '@angular/common';
import * as _ from 'lodash';
import { IItemReplenishmentOnDemand } from '../../api-core/data-contracts/i-item-replenishment-ondemand';
import { PopupWindowProperties, PopupWindowService, SingleselectRowItem } from '@omnicell/webcorecomponents';
import { TranslateService } from '@ngx-translate/core';
import { IQuantityEditorPopupData } from '../../shared/model/i-quantity-editor-popup-data';
import { QuantityEditorPopupComponent } from '../../shared/components/quantity-editor-popup/quantity-editor-popup.component';
import { ItemLocaitonDetailsService } from '../../api-core/services/item-locaiton-details.service';
import { IItemLocationDetail } from '../../api-core/data-contracts/i-item-location-detail';
import { SourceLocationDropdownPopupComponent } from '../../shared/components/source-location-dropdown-popup/source-location-dropdown-popup.component';
import { ISourceLocationDropdownPopupData } from '../../shared/model/i-source-location-dropdown-popup-data';

@Component({
  selector: 'app-internal-transfer-device-ondemand-items-page',
  templateUrl: './internal-transfer-device-ondemand-items-page.component.html',
  styleUrls: ['./internal-transfer-device-ondemand-items-page.component.scss']
})
export class InternalTransferDeviceOndemandItemsPageComponent implements OnInit {
  assignedItems$: Observable<IItemReplenishmentOnDemand[]>;
  itemLocationDetails$: Observable<IItemLocationDetail[]>;
  device$: Observable<IDevice>;
  colHeaders$: Observable<any>;


  deviceId: number;
  itemsToPick: IItemReplenishmentOnDemand[] = new Array();
  selectedSource: number;
  requestedAmount: number;

  ngUnsubscribe = new Subject();

  popupTitle: string;
  dropdownTitle: string;
  quantityEditorPopupTite: string;

  constructor(
    private popupWindowService: PopupWindowService,
    private translateService: TranslateService,
    private location: Location,
    private simpleDialogService: SimpleDialogService,
    private deviceReplenishmentOnDemandService: DeviceReplenishmentOnDemandService,
    private itemLocaitonDetailsService: ItemLocaitonDetailsService,
    activatedRoute: ActivatedRoute,
    devicesService: DevicesService,
    coreEventConnectionService: CoreEventConnectionService
  ) {
    this.deviceId = Number.parseInt(activatedRoute.snapshot.paramMap.get('deviceId'));
    this.device$ = devicesService.get().pipe(shareReplay(1), map(devices => devices.find(d => d.Id === this.deviceId)));

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
    this.translateService.get('ONDEMAND_SOURCE_POPUP_TITLE').subscribe((res: string) => {
      this.popupTitle = res;});
    this.translateService.get('ONDEMAND_SOURCE_DROPDOWN_TITLE').subscribe((res: string) => {
      this.dropdownTitle = res;});
    this.translateService.get('ONDEMAND_QUANTITY_EDITOR_TITLE').subscribe((res: string) => {
      this.quantityEditorPopupTite = res;});
    }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  goBack() {
    this.location.back();
  }

  onSelect(item: IItemReplenishmentOnDemand) {
    this.itemsToPick.push(item);

    if(item.AvailablePharmacyLocationCount > 0) {
      this.selectItemSource(item);
    }
  }

  pick() {
    if (this.itemsToPick.length > 0 && this.selectedSource > 0 && this.requestedAmount > 0) {
      const itemPicked = this.itemsToPick.pop();
      const pickInfo = {
        ItemId: itemPicked.ItemId,
        QuantityToPick: this.requestedAmount,
        SourceDeviceLocationId: this.selectedSource,
        PackSize: itemPicked.PackSize,
        RequestedQuantityInPacks: this.requestedAmount/itemPicked.PackSize,
      };

      this.deviceReplenishmentOnDemandService.pickDeviceItemNeeds(this.deviceId, pickInfo).subscribe(x => this.handlePickSuccess(), e => this.handlePickFailure());
      this.onRefreshDeviceItems();
    }
  }

  selectItemSource(item: IItemReplenishmentOnDemand){
    const itemlocationDisplayList: SingleselectRowItem[] = [];

    this.selectedSource = 0;

    this.loadAssignedItemsSourceLocations(item.ItemId);

    this.itemLocationDetails$.subscribe(locations => {
      locations.forEach((location) => {
        if(location.ItemId === item.ItemId &&
           location.DeviceId != this.deviceId &&
           location.DeviceType != "2100") {
          const itemlocationRow = new SingleselectRowItem(location.DeviceDescription, location.DeviceLocationId.toString());
          itemlocationDisplayList.push(itemlocationRow);
        }
      })

      this.showSouceSelection(item, itemlocationDisplayList);
    });
  }

  private showSouceSelection(item: IItemReplenishmentOnDemand, itemlocationDisplayList: SingleselectRowItem[]) {
    const rowItemsToHideCheckbox: SingleselectRowItem[] = [];
    const properties = new PopupWindowProperties();

    const defaultDisplayItem = itemlocationDisplayList.find(x => x.value.length > 0);
    const data: ISourceLocationDropdownPopupData = {
      popupTitle: this.popupTitle,
      dropdownTitle: this.dropdownTitle,
      dropdownRows: itemlocationDisplayList,
      defaultRow: defaultDisplayItem,
      selectedRow: defaultDisplayItem,
    };

    properties.data = data;

    let component = this.popupWindowService.show(SourceLocationDropdownPopupComponent, properties) as unknown as SourceLocationDropdownPopupComponent;
    component.dismiss.pipe(take(1)).subscribe(selectedOk => {
      if (selectedOk&& !isNaN(+data.selectedRow.value)) {
        this.selectedSource = +data.selectedRow.value;
        this.enterPickQuantity(item);
      }
      else {
        this.itemsToPick = [];
        this.selectedSource = 0;
        this.requestedAmount = 0
      }
    });
  }

  enterPickQuantity(item: IItemReplenishmentOnDemand) {
    const properties = new PopupWindowProperties();
    this.requestedAmount = 0;

    const data: IQuantityEditorPopupData = {
      popupTitle: this.quantityEditorPopupTite,
      quantityDescritpion: item.ItemFormattedGenericName,
      quantitySubDescritpion: item.ItemBrandName,
      packSize: item.PackSize,
      requestedQuantity: this.requestedAmount,
      unitOfIssue: item.UnitOfIssue
    };

    properties.data = data;

    let component = this.popupWindowService.show(QuantityEditorPopupComponent, properties) as unknown as QuantityEditorPopupComponent;
    component.dismiss.pipe(take(1)).subscribe(selectedOk => {
      if (selectedOk && !isNaN(+data.requestedQuantity)) {
        this.requestedAmount = +data.requestedQuantity;
        this.pick();
      }
      else {
        this.itemsToPick = [];
        this.selectedSource = 0;
        this.requestedAmount = 0
      }
    });
  }

  private loadAssignedItems() {
    this.assignedItems$ = this.deviceReplenishmentOnDemandService.getDeviceAssignedItems(this.deviceId).pipe(shareReplay(1));
  }

  private loadAssignedItemsSourceLocations(itemId: string) {
    this.itemLocationDetails$ = this.itemLocaitonDetailsService.get(itemId)
      .pipe(shareReplay(1));
  }

  private onRefreshDeviceItems() {
    this.loadAssignedItems();
  }

  private handlePickSuccess() {
    this.simpleDialogService.displayInfoOk('INTERNAL_TRANS_PICKQUEUE_SENT_TITLE', 'INTERNAL_TRANS_PICKQUEUE_SENT_OK');
  }

  private handlePickFailure() {
    this.itemsToPick = [];
    this.simpleDialogService.displayInfoOk('INTERNAL_TRANS_PICKQUEUE_FAILED_TITLE', 'INTERNAL_TRANS_PICKQUEUE_FAILED_MSG');
  }
}
