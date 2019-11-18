import { IPickRouteDevices } from '../../api-core/data-contracts/i-pickroute-devices';
import { PriorityCodeRouteAssignmentsService } from '../../api-core/services/priority-code-route-assignments.service';
import { map, shareReplay } from 'rxjs/operators';
import * as _ from 'lodash';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IPriorityCodePickRoute } from '../../api-core/data-contracts/i-priority-code-pick-route';
import { PriorityCodePickRoutesService } from '../../api-core/services/priority-code-pick-routes.service';
import { PickRouteDevices } from '../model/pickroute-devices';

@Component({
  selector: 'app-priority-code-route-assignments-page',
  templateUrl: './priority-code-route-assignments-page.component.html',
  styleUrls: ['./priority-code-route-assignments-page.component.scss']
})
export class PriorityCodeRouteAssignmentsPageComponent implements OnInit {
  pickrouteDevices$: Observable<PickRouteDevices[]>;
  priorityCode$: Observable<IPriorityCodePickRoute >;
  titleHeader: string = "'ROUTE_ASSIGNMENT' | translate";
  constructor(
    private route: ActivatedRoute,
    private priorityCodeRouteAssignmentsService: PriorityCodeRouteAssignmentsService,
    private priorityCodePickRoutesService: PriorityCodePickRoutesService,
    private wpfActionControllerService: WpfActionControllerService
  ) { }

  ngOnInit() {
    const pickRouteId = this.route.snapshot.queryParamMap.get('priorityCodePickRouteId');

    this.priorityCode$ = this.priorityCodePickRoutesService.getPriority(+pickRouteId).pipe(shareReplay(1));
    this.pickrouteDevices$ = this.priorityCodeRouteAssignmentsService.getRoutes().pipe(map(prd => {
      const displayObjects = prd.map(l => new PickRouteDevices(l, +pickRouteId));
      const result = _.orderBy(displayObjects, (x: PickRouteDevices) => [x.RouteDescription]);
      return result;
  }), shareReplay(1));
}

  navigateBack() {
    this.wpfActionControllerService.ExecuteBackAction();
  }
}
