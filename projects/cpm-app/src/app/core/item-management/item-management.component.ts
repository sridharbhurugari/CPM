import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ItemManagement } from '../model/item-management';
import { nameof } from '../../shared/functions/nameof';
import { SearchBoxComponent } from '@omnicell/webcorecomponents';
import { WindowService } from '../../shared/services/window-service';

@Component({
  selector: 'app-item-management',
  templateUrl: './item-management.component.html',
  styleUrls: ['./item-management.component.scss']
})

export class ItemManagementComponent  {

  private _itemManagements: ItemManagement[];
  @ViewChild('searchBox', {
    static: true
  })
  searchElement: SearchBoxComponent;

  searchTextFilter: string;

  searchFields = [nameof<ItemManagement>('ItemId'), nameof<ItemManagement>('ItemDescription')];

  @Input()
  set itemManagements(value: ItemManagement[]) {
    this._itemManagements = value;
    if (this.windowService.nativeWindow) {
      this.windowService.nativeWindow.dispatchEvent(new Event('resize'));
    }
  }

  get itemManagements(): ItemManagement[] {
    return this._itemManagements;
  }

  constructor(private windowService: WindowService) { }

}
