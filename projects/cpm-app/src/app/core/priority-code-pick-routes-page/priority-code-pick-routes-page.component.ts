import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PriorityCodePickRoutesService } from '../../api-core/services/priority-code-pick-routes.service';
import { IPriorityCodePickRoute } from '../../api-core/data-contracts/i-priority-code-pick-route';
import * as _ from 'lodash';
import { filter, map, takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { WpfInteropService } from '../../shared/services/wpf-interop.service';
import { WindowService } from '../../shared/services/window-service';

@Component({
  selector: 'app-priority-code-pick-routes-page',
  templateUrl: './priority-code-pick-routes-page.component.html',
  styleUrls: ['./priority-code-pick-routes-page.component.scss']
})
export class PriorityCodePickRoutesPageComponent implements OnInit, OnDestroy {
  private _ngUnsubscribe: Subject<void> = new Subject();
  priorityCodePickRoutes$: Observable<IPriorityCodePickRoute[]>;

  constructor(
    private priorityCodePickRoutesService: PriorityCodePickRoutesService,
    private router: Router,
    private wpfInteropService: WpfInteropService,
    private windowService: WindowService,
  ) {
    this.setupDataRefresh();
  }

  ngOnInit() {
    this.priorityCodePickRoutes$ = this.priorityCodePickRoutesService.get().pipe(map(p => {
      return _.orderBy(p, (x: IPriorityCodePickRoute) => x.PrioritySequenceOrder);
    }));
  }

  navigate(priorityCodePickRouteId: number) {
    let params = { priorityCodePickRouteId: priorityCodePickRouteId };
    this.router.navigate(['core/priorityCode/RouteAssignments'], { queryParams: params });
  }

  ngOnDestroy() {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete()
  }

  /* istanbul ignore next */
  private setupDataRefresh() {
    let hash = this.windowService.getHash();
    this.wpfInteropService.wpfViewModelActivated
      .pipe(filter(x => x == hash), takeUntil(this._ngUnsubscribe))
      .subscribe(() => {
        this.ngOnInit();
      });
  }
}
