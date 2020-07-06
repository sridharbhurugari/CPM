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
import { PopupDialogService, PopupDialogProperties, PopupDialogType,
   PopupWindowProperties, PopupWindowService } from '@omnicell/webcorecomponents';
import { IConfirmPopupData } from '../../shared/model/i-confirm-popup-data';
import { ConfirmPopupComponent } from '../../shared/components/confirm-popup/confirm-popup.component';
import { OcsStatusService } from '../../api-core/services/ocs-status.service';
import { CoreEventConnectionService } from '../../api-core/services/core-event-connection.service';

@Component({
  selector: 'app-priority-code-route-assignments-page',
  templateUrl: './priority-code-route-assignments-page.component.html',
  styleUrls: ['./priority-code-route-assignments-page.component.scss']
})
export class PriorityCodeRouteAssignmentsPageComponent implements OnInit {
  pickrouteDevices$: Observable<IPickRouteDevice[]>;
  priorityCode$: Observable<IPriorityCodePickRoute>;
  routeList: Observable<Map<IPickRouteDevice, string>>;
  deviceList$: Observable<IDeviceSequenceOrder[]>;

  priorityCode: string;

  private _priorityCodePickRouteId: number;
  private _pickRoute: IPickRouteDevice;
  private _originalRoute: IPickRouteDevice;
  genericErrorTitle$: Observable<string>;
  genericErrorMessage$: Observable<string>;
  saveInProgress: boolean = false;

  get pickRoute(): IPickRouteDevice {
      return this._pickRoute;
  }
  set pickRoute(value: IPickRouteDevice) {
      this._pickRoute = value;
      this.deviceList$ = this.pickrouteDevices$.pipe(map(results => {
        return this.setDevices(this.pickRoute, results);
      }));
  }

  routerLinkPickRouteId: number;
  isDeviceManagement: boolean = false;
  isEditAvailable = true;
  canSave = false;
  ocsIsHealthy = false;

  constructor(
    private route: ActivatedRoute,
    private priorityCodeRouteAssignmentsService: PriorityCodeRouteAssignmentsService,
    private priorityCodePickRoutesService: PriorityCodePickRoutesService,
    private wpfActionControllerService: WpfActionControllerService,
    private translateService: TranslateService,
    private dialogService: PopupDialogService,
    private popupWindowService: PopupWindowService,
    private coreEventConnectionService: CoreEventConnectionService,
    private ocsStatusService: OcsStatusService
  ) { }

  ngOnInit() {
    const pcprId = this.route.snapshot.queryParamMap.get('priorityCodePickRouteId');
    this._priorityCodePickRouteId = +pcprId;
    this.priorityCode$ = this.priorityCodePickRoutesService.getPriority(this._priorityCodePickRouteId).pipe(single(), shareReplay(1));
    this.pickrouteDevices$ = this.getPickrouteDevices();
    this.routeList = this.pickrouteDevices$.pipe(map(x => this.prdsToRadio(x)));
    this.deviceList$ = forkJoin(this.priorityCode$, this.pickrouteDevices$).pipe(map(results => {
      this._originalRoute = this.getOriginalPickRouteForPriorityType(results[0].PickRouteId, results[1]);
      this.pickRoute = this._originalRoute;
      this.priorityCode = results[0].PriorityCode;
      this.routerLinkPickRouteId = this.pickRoute.PickRouteId;
      return this.setDevices(this.pickRoute, results[1]);
    }));

    this.priorityCodeRouteAssignmentsService.DeviceManagement().subscribe(res => {
      console.log(res);
      this.isDeviceManagement = res;
    });
    this.genericErrorTitle$ = this.translateService.get('ERROR_ROUTE_MAINTENANCE_TITLE');
    this.genericErrorMessage$ = this.translateService.get('ERROR_ROUTE_MAINTENANCE_MESSAGE');
    this.connectToEvents();
  }

  navigateBack() {
    this.wpfActionControllerService.ExecuteBackAction();
  }

  getPickrouteDevices(): Observable<IPickRouteDevice[]> {
    return this.priorityCodeRouteAssignmentsService.getRoutes().pipe(map(prd => {
      return _.orderBy(prd, (x: IPickRouteDevice) => [x.RouteDescription]);
    }), shareReplay(1));
  }

  getOriginalPickRouteForPriorityType(pickRouteDeviceId: number, allPickRouteDevices: IPickRouteDevice[]): IPickRouteDevice {
    let pickRouteDevice: IPickRouteDevice;
    for (const r of allPickRouteDevices) {
      if (r.PickRouteId === pickRouteDeviceId) {
        pickRouteDevice = r;
        break;
      }
    }
    return pickRouteDevice;
  }

  setDevices(pickRouteDeviceToSet: IPickRouteDevice, allPickRouteDevices: IPickRouteDevice[]): IDeviceSequenceOrder[] {
    let pickRouteDevice: IPickRouteDevice;
    for (const r of allPickRouteDevices) {
      if (r.PickRouteId === pickRouteDeviceToSet.PickRouteId) {
        pickRouteDevice = r;
        break;
      }
    }
    const sdl = _.orderBy(pickRouteDevice.PickRouteDevices, (d => d.SequenceOrder));
    return sdl;
  }

  prdsToRadio(pks: IPickRouteDevice[]): Map<IPickRouteDevice, string> {
    const listMap = new Map<IPickRouteDevice, string>();
    pks.map(p => listMap.set(p, p.RouteDescription));
    return listMap;
  }

  pickrouteUpdated(pickroute: IPickRouteDevice) {
    this.pickRoute = pickroute;
    this.routerLinkPickRouteId = pickroute.PickRouteId;
    this.canSave = this._originalRoute.PickRouteId !== pickroute.PickRouteId;
  }

  save() {
    const properties = new PopupWindowProperties();
    const data: IConfirmPopupData = {
      headerResourceKey: 'SAVE_ROUTE_CHANGES',
      confirmTextboxResourceKey: 'ROUTE_SAVE_BEFORE'
    };

    properties.data = data;

    const component = this.popupWindowService.show(ConfirmPopupComponent, properties) as unknown as ConfirmPopupComponent;
    component.dismiss.subscribe(selectedConfirm => {
      if (selectedConfirm) {
        this.saveInProgress = true;
        this.priorityCodeRouteAssignmentsService.save(this.pickRoute.PickRouteGuid, this.priorityCode)
          .subscribe(result => this.navigateBack(), error => this.onSaveFailed(error));
      }
    });
  }

  onSaveFailed(error: HttpErrorResponse): any {
    this.saveInProgress = false;
    forkJoin(this.genericErrorTitle$, this.genericErrorMessage$).subscribe(r => {
      this.displayError('Generic-Error', r[0], r[1]);
    });
  }

  displayError(uniqueId, title, message) {
    const properties = new PopupDialogProperties(uniqueId);
    properties.titleElementText = title;
    properties.messageElementText = message;
    properties.showPrimaryButton = true;
    properties.primaryButtonText = 'Ok';
    properties.showSecondaryButton = false;
    properties.dialogDisplayType = PopupDialogType.Error;
    properties.timeoutLength = 0;
    this.dialogService.showOnce(properties);
  }

  private connectToEvents() {
    this.configureEventHandlers();
    this.coreEventConnectionService.startedSubject.subscribe(() => {
      this.ocsStatusService.requestStatus().subscribe();
    });
  }

  private configureEventHandlers(): void {
    this.coreEventConnectionService.ocsIsHealthySubject
      .subscribe(message => this.setOcsStatus(message));
  }

  private setOcsStatus(isHealthy: boolean): void {
    this.ocsIsHealthy = isHealthy;
  }
}
