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
import { DropdownPopupComponent } from '../../shared/components/dropdown-popup/dropdown-popup.component';
import { IDropdownPopupData } from '../../shared/model/i-dropdown-popup-data';
import { IItemReplenishmentOnDemandItemLocations } from '../../api-core/data-contracts/i-item-replenishment-ondemand-item-locations';
import { toArray } from 'lodash';
import { TranslateService } from '@ngx-translate/core';
import { IQuantityEditorPopupData } from '../../shared/model/i-quantity-editor-popup-data';
import { ItemManagementComponent } from '../item-management/item-management.component';
import { QuantityEditorPopupComponent } from '../../shared/components/quantity-editor-popup/quantity-editor-popup.component';

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
  itemsToPick: IItemReplenishmentOnDemand[] = new Array();
  selectedSource: number;
  requestedAmount: number;

  ngUnsubscribe = new Subject();

  itemlocationDisplayList: SingleselectRowItem[] = [];
  defaultDisplayItem: SingleselectRowItem;
  rowItemsToHideCheckbox: SingleselectRowItem[] = [];
  itemlocations: IItemReplenishmentOnDemandItemLocations[] = [];

  popupTitle: string;
  dropdowntitle: string;
  quantityEditorPopupTite: string;

  constructor(
    private popupWindowService: PopupWindowService,
    private translateService: TranslateService,
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
    this.translateService.get('ONDEMAND_SOURCE_POPUP_TITLE').subscribe((res: string) => {
      this.popupTitle = res;});
    this.translateService.get('ONDEMAND_SOURCE_DROPDOWN_TITLE').subscribe((res: string) => {
      this.dropdowntitle = res;});
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

    if(item.AvailablePharmacyLocationCount < 1) {
      return;
    }

    this.selectItemSource(item);

    this.pick();
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
    const properties = new PopupWindowProperties();
    this.rowItemsToHideCheckbox = [];
    this.selectedSource = 0;

    this.itemlocations = [];
    this.itemlocationDisplayList = [];
    const locations$ = this.deviceReplenishmentOnDemandService.getAvailableItemLocations(this.deviceId, item.ItemId)
      .pipe(shareReplay(1));

    locations$.subscribe(itemLocation => {
      itemLocation.forEach(location => {
        const itemlocationRow = new SingleselectRowItem(location.DeviceDescription, location.DeviceId.toString());
        this.itemlocationDisplayList.push(itemlocationRow);
      })
    });

    this.defaultDisplayItem = this.itemlocationDisplayList.find(x => x.value.length > 0);

    const data: IDropdownPopupData = {
      popuptitle: this.popupTitle,
      dropdowntitle: this.dropdowntitle,
      dropdownrows: this.itemlocationDisplayList,
      defaultrow: this.defaultDisplayItem,
      showCheckbox: false,
      checkboxLabel: "",
      checkboxSelected: false,
      checkboxHideSelection: this.rowItemsToHideCheckbox,
      selectedrow: this.defaultDisplayItem,
      selectedcheckbox: false
    };

    properties.data = data;

    let component = this.popupWindowService.show(DropdownPopupComponent, properties) as unknown as DropdownPopupComponent;
    component.dismiss.pipe(take(1)).subscribe(selectedOk => {
      if (selectedOk&& !isNaN(+data.selectedrow.value)) {
        this.selectedSource = +data.selectedrow.value;
        this.enterPickQuantity(item);
        return;
      }
    });

    this.itemsToPick = [];
    this.selectedSource = 0;
    this.requestedAmount = 0
  }

  enterPickQuantity(item: IItemReplenishmentOnDemand) {
    const properties = new PopupWindowProperties();
    this.requestedAmount = 0;

    const data: IQuantityEditorPopupData = {
      popuptitle: this.quantityEditorPopupTite,
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
        return;
      }
    });

    this.itemsToPick = [];
    this.selectedSource = 0;
    this.requestedAmount = 0
  }

  private loadAssignedItems() {
    this.assignedItems$ = this.deviceReplenishmentOnDemandService.getDeviceAssignedItems(this.deviceId).pipe(shareReplay(1));
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
