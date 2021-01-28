import { Component, OnInit } from '@angular/core';
import { ItemManagement } from '../model/item-management';
import { ItemManagementService } from '../../api-core/services/item-management.service';
import { map, shareReplay } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import * as _ from 'lodash';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { WpfInteropService } from '../../shared/services/wpf-interop.service';

@Component({
  selector: 'app-item-management',
  templateUrl: './item-management.component.html',
  styleUrls: ['./item-management.component.scss']
})

export class ItemManagementComponent implements OnInit {
  ItemManagements$: Observable<ItemManagement[]>;

  ngOnInit() {
    this.ItemManagements$ = this.itemManagementService.get().pipe(map(x => {
      return x.map(p => new ItemManagement(p));
    }), shareReplay(1));
  }

  navigate(itemId: string) {
      this.wpfActionControllerService.ExecuteContinueNavigationWithDataAction({ ItemId: itemId });
  }

  constructor(private itemManagementService: ItemManagementService,
    private wpfActionControllerService: WpfActionControllerService,
    private wpfInteropService: WpfInteropService) {
      this.wpfInteropService.wpfViewModelActivated.subscribe(() => {
        this.ngOnInit();
      });
  }
}
