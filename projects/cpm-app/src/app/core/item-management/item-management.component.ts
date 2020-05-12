import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ItemManagement } from '../model/item-management';
import { nameof } from '../../shared/functions/nameof';
import { SearchBoxComponent } from '@omnicell/webcorecomponents';
import { WindowService } from '../../shared/services/window-service';
import { ItemManagementService } from '../../api-core/services/item-management.service';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import { Many } from 'lodash';
import * as _ from 'lodash';

@Component({
  selector: 'app-item-management',
  templateUrl: './item-management.component.html',
  styleUrls: ['./item-management.component.scss']
})

export class ItemManagementComponent implements OnInit, AfterViewInit  {

  readonly itemIdPropertyName = nameof<ItemManagement>('ItemId');
  readonly unitDoseQtyOnHandPropertyName = nameof<ItemManagement>('UnitDoseQtyOnHand');
  readonly bulkQtyOnHandPropertyName = nameof<ItemManagement>('BulkQtyOnHand');
  readonly totalQtyOnHandPropertyName = nameof<ItemManagement>('TotalQtyOnHand');
  currentSortPropertyName: string = this.itemIdPropertyName;
  ItemManagements$: Observable<ItemManagement[]>;

  @ViewChild('searchBox', null) searchElement: SearchBoxComponent;
  searchTextFilter: string;
  searchFields = [ this.itemIdPropertyName ];

  ngOnInit() {
    this.ItemManagements$ = this.itemManagementService.get().pipe(map(x => {
      const displayObjects = x.map(itemManagement => new ItemManagement(itemManagement));
      return displayObjects;
    }), shareReplay(1));
  }

  ngAfterViewInit() {
    this.searchElement.searchOutput$
      .pipe(
        switchMap((searchData: string) => {
          return of(searchData);
        })
      )
      .subscribe(data => {
        this.searchTextFilter = data;
      });
  }

  columnSelected(event: IColHeaderSortChanged){
    this.currentSortPropertyName = event.ColumnPropertyName;
    this.ItemManagements$ = this.ItemManagements$.pipe(map(itemManagements => {
      return this.sort(itemManagements, event.SortDirection);
    }));
  }

  sort(itemManagements: ItemManagement[], sortDirection: Many<boolean|'asc'|'desc'>): ItemManagement[]{
    return _.orderBy(itemManagements, x => x[this.currentSortPropertyName], sortDirection);
}

  constructor(private windowService: WindowService, private itemManagementService: ItemManagementService) { }

}
