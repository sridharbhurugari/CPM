import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PriorityCodePickRoutesService } from '../../api-core/services/priority-code-pick-routes.service';
import { IPriorityCodePickRoute } from '../../api-core/data-contracts/i-priority-code-pick-route';
import * as _ from 'lodash';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { WpfInteropService } from '../../shared/services/wpf-interop.service';

@Component({
  selector: 'app-priority-code-pick-routes-page',
  templateUrl: './priority-code-pick-routes-page.component.html',
  styleUrls: ['./priority-code-pick-routes-page.component.scss']
})
export class PriorityCodePickRoutesPageComponent implements OnInit {
  priorityCodePickRoutes$: Observable<IPriorityCodePickRoute[]>;

  constructor(
    private priorityCodePickRoutesService: PriorityCodePickRoutesService,
    private router: Router,
    private wpfInteropService: WpfInteropService,
  ) {
    this.wpfInteropService.wpfViewModelActivated.subscribe(() => {
      this.ngOnInit();
    });
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
}
