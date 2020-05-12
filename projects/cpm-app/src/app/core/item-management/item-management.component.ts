import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ItemManagement } from '../model/item-management';
import { nameof } from '../../shared/functions/nameof';
import { SearchBoxComponent } from '@omnicell/webcorecomponents';
import { WindowService } from '../../shared/services/window-service';
import { ItemManagementService } from '../../api-core/services/item-management.service';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-item-management',
  templateUrl: './item-management.component.html',
  styleUrls: ['./item-management.component.scss']
})

export class ItemManagementComponent implements OnInit  {

  ItemManagements$: Observable<ItemManagement[]>;
  @ViewChild('searchBox', {
    static: true
  })
  searchElement: SearchBoxComponent;

  searchTextFilter: string;

  searchFields = [nameof<ItemManagement>('ItemId'), nameof<ItemManagement>('ItemDescription')];

  ngOnInit() {
    this.ItemManagements$ = this.itemManagementService.get().pipe(map(x => {
      const displayObjects = x.map(itemManagement => new ItemManagement(itemManagement));
      return displayObjects;
    }), shareReplay(1));
  }

  constructor(private windowService: WindowService, private itemManagementService: ItemManagementService) { }

}
