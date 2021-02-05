import { Component, OnDestroy, OnInit } from '@angular/core';
import { ItemManagement } from '../model/item-management';
import { ItemManagementService } from '../../api-core/services/item-management.service';
import { filter, map, shareReplay, takeUntil } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';
import * as _ from 'lodash';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { WpfInteropService } from '../../shared/services/wpf-interop.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item-management',
  templateUrl: './item-management.component.html',
  styleUrls: ['./item-management.component.scss']
})

export class ItemManagementComponent implements OnInit, OnDestroy {
  private _ngUnsubscribe: Subject<void> = new Subject();

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
    private wpfInteropService: WpfInteropService,
    private activatedRoute: ActivatedRoute,
  ) {
    let hash = `#/${this.activatedRoute.snapshot.routeConfig.path}`;
    this.wpfInteropService.wpfViewModelActivated
      .pipe(filter(x => x == hash), takeUntil(this._ngUnsubscribe))
      .subscribe(() => {
        this.ngOnInit();
      });
  }

  ngOnDestroy() {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete()
  }
}
