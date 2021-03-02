import { EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { SearchBoxComponent } from '@omnicell/webcorecomponents';
import { IDevice } from '../../api-core/data-contracts/i-device';
import { IItemReplenishmentOnDemand } from '../../api-core/data-contracts/i-item-replenishment-ondemand';
import { nameof } from '../../shared/functions/nameof';
import { WindowService } from '../../shared/services/window-service';

@Component({
  selector: 'app-internal-transfer-device-ondemand-items-list',
  templateUrl: './internal-transfer-device-ondemand-items-list.component.html',
  styleUrls: ['./internal-transfer-device-ondemand-items-list.component.scss']
})
export class InternalTransferDeviceOndemandItemsListComponent implements AfterViewInit {
  private _assignedItems: IItemReplenishmentOnDemand[];

  readonly itemDescriptionPropertyName: string = nameof<IItemReplenishmentOnDemand>('ItemFormattedGenericName');
  readonly brandPropertyName: string = nameof<IItemReplenishmentOnDemand>('ItemBrandName');
  readonly restockPropertyName: string = nameof<IItemReplenishmentOnDemand>('DeviceRestockLevel');
  readonly parPropertyName: string = nameof<IItemReplenishmentOnDemand>('DeviceParLevel');
  readonly qohPropertyName: string = nameof<IItemReplenishmentOnDemand>('DeviceQuantityOnHand');
  readonly pendingPickPropertyName: string = nameof<IItemReplenishmentOnDemand>('PendingDevicePickQuantity');
  readonly AvailablePharmacyLocationCountPropertyName: string = nameof<IItemReplenishmentOnDemand>('AvailablePharmacyLocationCount');
  readonly AvailablePharmacyQtyPropertyName: string = nameof<IItemReplenishmentOnDemand>('AvailablePharmacyQty');

  searchPropertyNames: string[] = [
    this.itemDescriptionPropertyName,
    this.brandPropertyName
  ]

  searchTextFilter: string;

  @Input()
  set assignedItems(value: IItemReplenishmentOnDemand[]) {
    this._assignedItems = value;
    this.windowService.dispatchResizeEvent();
  }

  get assignedItems(): IItemReplenishmentOnDemand[] {
    return this._assignedItems;
  }

  @Input()
  device: IDevice;

  @ViewChild('ocsearchbox', {
    static: true
  })
  searchElement: SearchBoxComponent;

  @Output()
  selectedItem: EventEmitter<IItemReplenishmentOnDemand> = new EventEmitter();

  constructor(
    private windowService: WindowService) {
   }

  ngAfterViewInit() {
    this.searchElement.searchOutput$
    .subscribe(data => {
      this.searchTextFilter = data;
      this.windowService.dispatchResizeEvent();
    });
  }
}
