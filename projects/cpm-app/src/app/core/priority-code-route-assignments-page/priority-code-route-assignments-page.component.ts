import { IPickRouteDevice } from '../../api-core/data-contracts/i-pickroute-device';
import { PriorityCodeRouteAssignmentsService } from '../../api-core/services/priority-code-route-assignments.service';
import { map, shareReplay, filter, single, pluck } from 'rxjs/operators';
import * as _ from 'lodash';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, forkJoin } from 'rxjs';
import { IPriorityCodePickRoute } from '../../api-core/data-contracts/i-priority-code-pick-route';
import { PriorityCodePickRoutesService } from '../../api-core/services/priority-code-pick-routes.service';
import { IDeviceSequenceOrder } from '../../api-core/data-contracts/i-device-sequenceorder';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { PopupDialogService, PopupDialogProperties, PopupDialogType } from '@omnicell/webcorecomponents';

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
  duplicateErrorTitle$: Observable<string>;
  duplicateErrorMessage$: Observable<string>;

  private _priorityCodePickRouteId: number;
  private _pickRouteId: number;
  private _originalRouteId: number;

  get pickRouteId(): number {
      return this._pickRouteId;
  }
  set pickRouteId(value: number) {
      this._pickRouteId = value;
      this.deviceList$ = this.pickrouteDevices$.pipe(map(results => {
        return this.setDevices(this.pickRouteId, results);
      }));
  }

  isEditAvailable: boolean = true;
  canSave: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private priorityCodeRouteAssignmentsService: PriorityCodeRouteAssignmentsService,
    private priorityCodePickRoutesService: PriorityCodePickRoutesService,
    private wpfActionControllerService: WpfActionControllerService,
    private translateService: TranslateService,
    private dialogService: PopupDialogService,
  ) { }

  ngOnInit() {
    const pcprId = this.route.snapshot.queryParamMap.get('priorityCodePickRouteId');
    this._priorityCodePickRouteId = +pcprId;
    this.priorityCode$ = this.priorityCodePickRoutesService.getPriority(this._priorityCodePickRouteId).pipe(single(), shareReplay(1));
    this.pickrouteDevices$ = this.getPickrouteDevices();
    this.routeList = this.pickrouteDevices$.pipe(map(x => this.prdsToRadio(x)));
    this.deviceList$ = forkJoin(this.priorityCode$, this.pickrouteDevices$).pipe(map(results => {
      this.pickRouteId = results[0].PickRouteId;
      this._originalRouteId = this.pickRouteId;
      return this.setDevices(this.pickRouteId, results[1]);
    }));
    this.duplicateErrorTitle$ = this.translateService.get('ERROR_DUPLICATE_NAME_TITLE')
    this.duplicateErrorMessage$ = this.translateService.get('ERROR_DUPLICATE_NAME_MESSAGE')
  }

  navigateBack() {
    this.wpfActionControllerService.ExecuteBackAction();
  }

  getPickrouteDevices(): Observable<IPickRouteDevice[]> {
    return this.priorityCodeRouteAssignmentsService.getRoutes().pipe(map(prd => {
      return _.orderBy(prd, (x: IPickRouteDevice) => [x.RouteDescription]);
    }), shareReplay(1));
  }

  setDevices(prId: number, allPrd: IPickRouteDevice[]): IDeviceSequenceOrder[] {
    let prd: IPickRouteDevice;
    for (const r of allPrd) {
      if (r.PickRouteId === prId) {
        prd = r;
        break;
      }
    }
    const sdl = _.orderBy(prd.PickRouteDevices, (d => d.SequenceOrder));
    return sdl;
  }

  prdsToRadio(pks: IPickRouteDevice[]): Map<number, string> {
    const listMap = new Map<number, string>();
    pks.map(p => listMap.set(p.PickRouteId, p.RouteDescription));
    return listMap;
  }

  pickrouteUpdated(pickrouteId: number) {
    this.pickRouteId = pickrouteId;
    this.canSave = this._originalRouteId !== pickrouteId;
  }

  onSaveFailed(error: HttpErrorResponse): any {
    if (error.status === 500) {
      forkJoin(this.duplicateErrorTitle$, this.duplicateErrorMessage$).subscribe(r => {
        this.displayDuplicateDescriptionError(r[0], r[1]);
      });
    }
  }

  displayDuplicateDescriptionError(title, message): void {
    const properties = new PopupDialogProperties('Duplicate-Description-Error');
    properties.titleElementText = title;
    properties.messageElementText = message;
    properties.showPrimaryButton = true;
    properties.primaryButtonText = 'Ok';
    properties.showSecondaryButton = false;
    properties.dialogDisplayType = PopupDialogType.Error;
    properties.timeoutLength = 0;
    this.dialogService.showOnce(properties);
  }
}
