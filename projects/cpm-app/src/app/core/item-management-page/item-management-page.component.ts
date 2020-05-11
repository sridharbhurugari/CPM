import { Component, OnInit } from '@angular/core';
import { ItemManagementService } from '../../api-core/services/item-management.service';
import { IItemManagement } from '../../api-core/data-contracts/i-item-management';
import { ItemManagement } from '../model/item-management';
import { map, shareReplay } from 'rxjs/operators';
import * as _ from 'lodash';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-item-management-page',
  templateUrl: './item-management-page.component.html',
  styleUrls: ['./item-management-page.component.scss']
})
export class ItemManagementPageComponent implements OnInit {

  itemManagements: Observable<IItemManagement[]>;

  constructor(private itemManagementService: ItemManagementService) { }

  ngOnInit() {
    this.itemManagements = this.itemManagementService.get().pipe(map(x => {
      const displayObjects = x.map(itemManagement => new ItemManagement(itemManagement));
      return displayObjects;
    }), shareReplay(1));
  }

}
