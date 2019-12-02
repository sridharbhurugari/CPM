import { IPickRouteDevice } from '../../api-core/data-contracts/i-pickroute-device';
import { PriorityCodeRouteAssignmentsService } from '../../api-core/services/priority-code-route-assignments.service';
import { map, shareReplay, filter, single, pluck } from 'rxjs/operators';
import * as _ from 'lodash';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, forkJoin } from 'rxjs';
import { IPriorityCodePickRoute } from '../../api-core/data-contracts/i-priority-code-pick-route';
import { PriorityCodePickRoutesService } from '../../api-core/services/priority-code-pick-routes.service';
import { IDeviceSequenceOrder } from '../../api-core/data-contracts/i-device-sequenceorder';

@Component({
  selector: 'app-priority-code-route-assignments-page',
  templateUrl: './priority-code-route-assignments-page.component.html',
  styleUrls: ['./priority-code-route-assignments-page.component.scss']
})
export class PriorityCodeRouteAssignmentsPageComponent implements OnInit {
  pickrouteDevices$: Observable<IPickRouteDevice[]>;
  priorityCode$: Observable<IPriorityCodePickRoute>;
  routeList: Observable<Map<number, string>>;
  deviceList$: Observable<IDeviceSequenceOrder[]>;

  private _priorityCodePickRouteId: number;
  private _pickRouteId: number;

  get pickRouteId(): number {
      return this._pickRouteId;
  }
  set pickRouteId(value: number) {
      this._pickRouteId = value;
      this.setDevices(this._pickRouteId, this.pickrouteDevices$);
  }

  titleHeader = '\'ROUTE_ASSIGNMENT\' | translate';
  constructor(
    private route: ActivatedRoute,
    private priorityCodeRouteAssignmentsService: PriorityCodeRouteAssignmentsService,
    private priorityCodePickRoutesService: PriorityCodePickRoutesService,
    private wpfActionControllerService: WpfActionControllerService
  ) { }

ngOnInit() {
    const pcprId =  this.route.snapshot.queryParamMap.get('priorityCodePickRouteId');
    this._priorityCodePickRouteId = +pcprId;
    this.priorityCode$ = this.priorityCodePickRoutesService.getPriority(this._priorityCodePickRouteId).pipe(single(), shareReplay(1));
    this.pickrouteDevices$ = this.getPickrouteDevices();
    this.routeList = this.pickrouteDevices$.pipe(map(x => this.prdsToRadio(x)));
    forkJoin(this.priorityCode$, this.pickrouteDevices$).pipe(map(results => {
      this.pickRouteId = results[0].PickRouteId;
      this.setDevices(results[0].PickRouteId, of(results[1]));
    }));
    this.priorityCode$.subscribe(pc => this.pickRouteId = pc.PickRouteId);
}
navigateBack() {
    this.wpfActionControllerService.ExecuteBackAction();
  }

getPickrouteDevices(): Observable<IPickRouteDevice[]> {
 return this.priorityCodeRouteAssignmentsService.getRoutes().pipe(map(prd => {
    return _.orderBy(prd, (x: IPickRouteDevice) => [x.RouteDescription]);
}), shareReplay(1));
}

setDevices(prId: number, allPrd: Observable<IPickRouteDevice[]>): void{

  this.deviceList$ = allPrd.pipe(map(rts => {
    let prd: IPickRouteDevice;
    for (const r of rts) {
      if (r.PickRouteId === prId) {
          prd = r;
          break;
      }
    }
    const sdl = _.orderBy(prd.PickRouteDevices, (d => d.SequenceOrder));
    return sdl;
    }));
}
prdsToRadio(pks: IPickRouteDevice[]): Map < number, string > {
  const listMap = new Map<number, string>();
  pks.map(p => listMap.set(p.PickRouteId, p.RouteDescription));
  return listMap;
}

pickrouteUpdated(pickrouteId: number)  {
  this.pickRouteId = pickrouteId;
}
}
