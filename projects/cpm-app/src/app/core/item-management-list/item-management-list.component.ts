import { Component, OnInit, ViewChild, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { nameof } from '../../shared/functions/nameof';
import { ItemManagement } from '../model/item-management';
import { SearchBoxComponent } from '@omnicell/webcorecomponents';
import { WindowService } from '../../shared/services/window-service';

@Component({
  selector: 'app-item-management-list',
  templateUrl: './item-management-list.component.html',
  styleUrls: ['./item-management-list.component.scss']
})
export class ItemManagementListComponent implements AfterViewInit {
  private _items: ItemManagement[];

  readonly itemIdPropertyName = nameof<ItemManagement>('ItemId');
  readonly itemDescriptionPropertyName = nameof<ItemManagement>('ItemDescription');
  readonly unitDoseQtyOnHandPropertyName = nameof<ItemManagement>('UnitDoseQtyOnHand');
  readonly bulkQtyOnHandPropertyName = nameof<ItemManagement>('BulkQtyOnHand');
  readonly totalQtyOnHandPropertyName = nameof<ItemManagement>('TotalQtyOnHand');

  searchFields = [ this.itemDescriptionPropertyName, this.itemIdPropertyName ];

  @ViewChild('searchBox', null) searchElement: SearchBoxComponent;
  searchTextFilter: string;

  @Input()
  set items(value: ItemManagement[]) {
    this._items = value;
    this.windowService.dispatchResizeEvent();
  }

  get items(): ItemManagement[] {
    return this._items;
  }

  @Output()
  itemIdSelected: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private windowService: WindowService,
  ) { }

  orderChanged(orderedItems: ItemManagement[]) {
    this.items = orderedItems;
  }

  itemSelected(itemId: string) {
    this.itemIdSelected.next(itemId);
  }

  ngAfterViewInit() {
    this.searchElement.searchOutput$
      .subscribe(data => {
        this.searchTextFilter = data;
      });
  }

  ngOnInit() {
  }

}
