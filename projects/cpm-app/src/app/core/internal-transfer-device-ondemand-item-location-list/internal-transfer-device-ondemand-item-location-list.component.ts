import { AfterViewInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { Component, Input } from '@angular/core';
import { SearchBoxComponent } from '@omnicell/webcorecomponents';
import { IItemLocationDetail } from '../../api-core/data-contracts/i-item-location-detail';
import { IItemReplenishmentOnDemand } from '../../api-core/data-contracts/i-item-replenishment-ondemand';
import { nameof } from '../../shared/functions/nameof';
import { WindowService } from '../../shared/services/window-service';

@Component({
  selector: 'app-internal-transfer-device-ondemand-item-location-list',
  templateUrl: './internal-transfer-device-ondemand-item-location-list.component.html',
  styleUrls: ['./internal-transfer-device-ondemand-item-location-list.component.scss']
})
export class InternalTransferDeviceOndemandItemLocationListComponent implements AfterViewInit {

  _itemLocations: IItemLocationDetail[];

  readonly locationDescriptionPropertyName: string = nameof<IItemLocationDetail>('LocationDescription');
  readonly quantityOnHandPropertyName: string = nameof<IItemLocationDetail>('QuantityOnHand');
  readonly quantityPropertyName: string = nameof<IItemLocationDetail>('Quantity');

  math = Math;

  searchPropertyNames: string[] = [
    this.locationDescriptionPropertyName,
  ]

  searchTextFilter: string;

  selecteditemLocation: IItemLocationDetail;

  @Input()
  set itemLocations(value: IItemLocationDetail[]) {
    this._itemLocations = value;
    this.windowService.dispatchResizeEvent();
  }

  get itemLocations(): IItemLocationDetail[] {
    return this._itemLocations;
  }

  @Input()
  item: IItemReplenishmentOnDemand;

  @ViewChild('ocsearchbox', {
    static: true
  })
  searchElement: SearchBoxComponent;

  @Output()
  selectedItem: EventEmitter<IItemLocationDetail> = new EventEmitter();

  @Output()
  isSelected: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private windowService: WindowService
  ) { }

  ngAfterViewInit() {
    this.searchElement.searchOutput$
    .subscribe(data => {
      this.searchTextFilter = data;
      this.windowService.dispatchResizeEvent();
    });
  }

  locationSelected(itemLocation: IItemLocationDetail) {
    if((this.math.floor(itemLocation.QuantityOnHand/this.item.PackSize) < 1)) {
      return;
    }

    if(typeof this.selecteditemLocation === "undefined") {
      this.selecteditemLocation = itemLocation;
      this.selecteditemLocation.Quantity = 1
      this.isSelected.emit(true);
      this.selectedItem.emit(itemLocation)
      return;
    }

    if(itemLocation.DeviceLocationId === this.selecteditemLocation.DeviceLocationId) {
      return;
    }

    this.selecteditemLocation = itemLocation;

    this.itemLocations.forEach(itemLocation => {
      if(itemLocation.DeviceLocationId === this.selecteditemLocation.DeviceLocationId) {
        itemLocation.Quantity = 1
        this.isSelected.emit(true);
        this.selectedItem.emit(itemLocation)
        return;
      }

      itemLocation.Quantity = 0
    });
  }

  pickQtyChanged(itemLocation: IItemLocationDetail) {
    if(itemLocation.Quantity === 0) {
      this.isSelected.emit(false)
    }

    if(itemLocation.Quantity > 0) {
      this.selectedItem.emit(itemLocation)
      this.isSelected.emit(true)
    }
  }
}
