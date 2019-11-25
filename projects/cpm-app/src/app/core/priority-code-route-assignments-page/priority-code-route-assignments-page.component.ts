import { IPickRouteDevices } from '../../api-core/data-contracts/i-pickroute-devices';
import { PriorityCodeRouteAssignmentsService } from '../../api-core/services/priority-code-route-assignments.service';
import { map, shareReplay } from 'rxjs/operators';
import * as _ from 'lodash';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { IPriorityCodePickRoute } from '../../api-core/data-contracts/i-priority-code-pick-route';
import { PriorityCodePickRoutesService } from '../../api-core/services/priority-code-pick-routes.service';
import { PickRouteDevices } from '../model/pickroute-devices';
import { IDeviceSequenceOrder } from '../../api-core/data-contracts/i-device-sequenceorder';
import { SourceListMap } from 'source-list-map';

@Component({
  selector: 'app-priority-code-route-assignments-page',
  templateUrl: './priority-code-route-assignments-page.component.html',
  styleUrls: ['./priority-code-route-assignments-page.component.scss']
})
export class PriorityCodeRouteAssignmentsPageComponent implements OnInit {
  pickrouteDevices$: Observable<IPickRouteDevices[]>;
  priorityCode$: Observable<IPriorityCodePickRoute >;
  routeList: Observable<Map<number, string>>;
  deviceList$: Observable<IDeviceSequenceOrder[]>;
  private _pickRouteId: number;

  get pickRouteId(): number {
      return this._pickRouteId;
  }
  set pickRouteId(value: number) {
      this._pickRouteId = value;
      this.deviceList$ = this.getDevices();
  }
  titleHeader = '\'ROUTE_ASSIGNMENT\' | translate';
  constructor(
    private route: ActivatedRoute,
    private priorityCodeRouteAssignmentsService: PriorityCodeRouteAssignmentsService,
    private priorityCodePickRoutesService: PriorityCodePickRoutesService,
    private wpfActionControllerService: WpfActionControllerService
  ) { }

ngOnInit() {
    const prId =  this.route.snapshot.queryParamMap.get('pickRouteId');
    this._pickRouteId = +prId;
    this.priorityCode$ = this.priorityCodePickRoutesService.getPriority(this.pickRouteId).pipe(shareReplay(1));
    this.pickrouteDevices$ = this.getPickrouteDevices();
    this.routeList = this.pickrouteDevices$.pipe(map(x => this.prdsToRadio(x)));
    this.deviceList$ = this.getDevices();
}
navigateBack() {
    this.wpfActionControllerService.ExecuteBackAction();
  }

getPickrouteDevices(): Observable<IPickRouteDevices[]> {
 return this.priorityCodeRouteAssignmentsService.getRoutes().pipe(map(prd => {
    return _.orderBy(prd, (x: IPickRouteDevices) => [x.RouteDescription]);
}), shareReplay(1));
}

getDevices(): Observable<IDeviceSequenceOrder[]> {
  const prId = this._pickRouteId;
  const ds = this.pickrouteDevices$.pipe(map(rts => {
  const prd = rts.find(rt => rt.PickRouteId === prId);
  const dl = prd.PickRouteDevices;
  const sdl = _.orderBy(dl, (d => d.SequenceOrder));
  return sdl;
  }));
  return ds;
}
prdsToRadio(pks: IPickRouteDevices[]): Map<number, string> {
  const listMap = new Map<number, string>();
  pks.map(p => listMap.set(p.PickRouteId, p.RouteDescription));
  return listMap;
}

  pickrouteUpdated(pickrouteId: number)  {
    this.pickRouteId = pickrouteId;
  }
}
