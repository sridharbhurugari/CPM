import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { IItemReplenishmentNeed } from '../../api-core/data-contracts/i-item-replenishment-need';
import { nameof } from '../../shared/functions/nameof';
import { SearchBoxComponent } from '@omnicell/webcorecomponents';
import { WindowService } from '../../shared/services/window-service';

@Component({
  selector: 'app-internal-transfer-items-list',
  templateUrl: './internal-transfer-items-list.component.html',
  styleUrls: ['./internal-transfer-items-list.component.scss']
})
export class InternalTransferItemsListComponent implements AfterViewInit {
  readonly itemDescriptionPropertyName: string = nameof<IItemReplenishmentNeed>('ItemFormattedGenericName');
  readonly brandPropertyName: string = nameof<IItemReplenishmentNeed>('ItemBrandName');
  readonly restockPropertyName: string = nameof<IItemReplenishmentNeed>('DeviceRestockLevel');
  readonly parPropertyName: string = nameof<IItemReplenishmentNeed>('DeviceParLevel');
  readonly needPropertyName: string = nameof<IItemReplenishmentNeed>('DeviceQuantityNeeded');
  readonly qohPropertyName: string = nameof<IItemReplenishmentNeed>('DeviceQuantityOnHand');
  readonly pendingPickPropertyName: string = nameof<IItemReplenishmentNeed>('PendingDevicePickQuantity');

  searchPropertyNames: string[] = [
    this.itemDescriptionPropertyName,
    this.brandPropertyName,
  ]

  searchTextFilter: string;

  @Input()
  itemNeeds: IItemReplenishmentNeed[];

  @ViewChild('ocsearchbox', {
    static: true
  })
  searchElement: SearchBoxComponent;

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

}
