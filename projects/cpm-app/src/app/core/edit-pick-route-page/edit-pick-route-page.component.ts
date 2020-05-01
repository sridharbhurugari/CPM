import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Observable, forkJoin } from 'rxjs';
import { IPickRouteDetail } from '../../api-core/data-contracts/i-pickroute-detail';
import { DevicesService } from '../../api-core/services/devices.service';
import { PickRoutesService } from '../../api-core/services/pick-routes.service';
import { ActivatedRoute } from '@angular/router';
import { map, shareReplay } from 'rxjs/operators';
import { IDeviceSequenceOrder } from '../../api-core/data-contracts/i-device-sequenceorder';
import { PopupDialogService, PopupDialogProperties, PopupWindowService,
         PopupWindowProperties, PopupDialogType } from '@omnicell/webcorecomponents';
import { TextResultPopupComponent } from '../../shared/components/text-result-popup/text-result-popup.component';
import { ConfirmPopupComponent } from '../../shared/components/confirm-popup/confirm-popup.component';
import { ITextResultPopupData } from '../../shared/model/i-text-result-popup-data';
import { IConfirmPopupData } from '../../shared/model/i-confirm-popup-data';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { OcsStatusService } from '../../api-core/services/ocs-status.service';
import { CoreEventConnectionService } from '../../api-core/services/core-event-connection.service';

@Component({
  selector: 'app-edit-pick-route-page',
  templateUrl: './edit-pick-route-page.component.html',
  styleUrls: ['./edit-pick-route-page.component.scss']
})
export class EditPickRoutePageComponent implements OnInit {

  pickRoute$: Observable<IPickRouteDetail>;

  enabledDevices$: Observable<IDeviceSequenceOrder[]>;
  disabledDevices$: Observable<IDeviceSequenceOrder[]>;

  duplicateErrorTitle$: Observable<string>;
  duplicateErrorMessage$: Observable<string>;
  genericErrorTitle$: Observable<string>;
  genericErrorMessage$: Observable<string>;

  routeGuid: string;
  newDeviceSequence: IDeviceSequenceOrder[];
  originalDeviceSequence: IDeviceSequenceOrder[];
  newRouteName: string;

  isDefaultRoute: boolean;
  routeNameChanged: boolean;
  canDelete: boolean;
  requestStatus: 'none' | 'save' | 'saveAs' = 'none';
  ocsIsHealthy = false;

  constructor(
    private route: ActivatedRoute,
    private pickRoutesService: PickRoutesService,
    private devicesService: DevicesService,
    private location: Location,
    private popupWindowService: PopupWindowService,
    private dialogService: PopupDialogService,
    private translateService: TranslateService,
    private coreEventConnectionService: CoreEventConnectionService,
    private ocsStatusService: OcsStatusService,
  ) { }

  ngOnInit() {
    this.routeNameChanged = false;
    const pickRouteId = this.route.snapshot.paramMap.get('pickRouteId');
    this.pickRoute$ = this.pickRoutesService.get(pickRouteId).pipe(shareReplay(1));

    const allDevices$ = this.devicesService.get().pipe(shareReplay(1));
    this.duplicateErrorTitle$ = this.translateService.get('ERROR_DUPLICATE_NAME_TITLE');
    this.duplicateErrorMessage$ = this.translateService.get('ERROR_DUPLICATE_NAME_MESSAGE');
    this.genericErrorTitle$ = this.translateService.get('ERROR_ROUTE_MAINTENANCE_TITLE');
    this.genericErrorMessage$ = this.translateService.get('ERROR_ROUTE_MAINTENANCE_MESSAGE');

    this.pickRoute$.subscribe(x => this.canDelete = x.AssignedPriorities.length == 0);

    this.enabledDevices$ = forkJoin(this.pickRoute$, allDevices$).pipe(map(results => {
      const pickRouteDetail = results[0];
      const allDevices = results[1];
      const enabledDevices = allDevices.map(x => {
        const pickRouteDevice = pickRouteDetail.DeviceSequence.find(d => d.DeviceId === x.Id);
        const isSelected = pickRouteDevice !== undefined;
        if (!isSelected) {
          return null;
        }

        const sequenceOrder = pickRouteDevice.SequenceOrder;

        return {
          DeviceId: x.Id,
          DeviceDescription: x.Description,
          SequenceOrder: sequenceOrder,
        };
      });

      this.routeGuid = pickRouteDetail.PickRouteGuid;
      this.newRouteName = pickRouteDetail.Description;
      this.isDefaultRoute = pickRouteDetail.Description === 'Default';
      return enabledDevices.filter(x => x != null).sort((a, b) => a.SequenceOrder - b.SequenceOrder);
    }));

    this.disabledDevices$ = forkJoin(this.pickRoute$, allDevices$).pipe(map(results => {
      const pickRouteDetail = results[0];
      const allDevices = results[1];
      const disabledDevices = allDevices.map(x => {
        const pickRouteDevice = pickRouteDetail.DeviceSequence.find(d => d.DeviceId === x.Id);
        const isSelected = pickRouteDevice !== undefined;
        if (isSelected) {
          return null;
        }

        const sequenceOrder = 999;

        return {
          DeviceId: x.Id,
          DeviceDescription: x.Description,
          SequenceOrder: sequenceOrder,
        };
      });

      this.routeGuid = pickRouteDetail.PickRouteGuid;
      this.newRouteName = pickRouteDetail.Description;
      this.isDefaultRoute = pickRouteDetail.Description === 'Default';

      return disabledDevices.filter(x => x != null);
    }));

    this.originalDeviceSequence = [];
    this.enabledDevices$.forEach(enabledDevice => {
      enabledDevice.forEach( device => {
        this.originalDeviceSequence.push(device);
      });
    });

    this.connectToEvents();
  }

  navigateBack() {
    this.location.back();
  }

  saveAs() {
    const properties = new PopupWindowProperties();
    const data: ITextResultPopupData = {
      headerResourceKey: 'SAVE_NEW_ROUTE',
      placeholderTextResouceKey: 'NEW_ROUTE_NAME',
      initialValue: undefined,
      resultValue: null,
      beforeTextboxResourceKey: 'ROUTE_SAVEAS_BEFORE',
      afterTextboxResourceKey: 'ROUTE_SAVEAS_AFTER'
    };
    properties.data = data;

    const component = this.popupWindowService.show(TextResultPopupComponent, properties) as unknown as TextResultPopupComponent;
    component.dismiss.subscribe(selectedConfirm => {
      if (selectedConfirm) {
        this.requestStatus = 'saveAs';
        this.pickRoutesService.saveAs(data.resultValue, this.newDeviceSequence)
          .subscribe(result => this.navigateBack(), error => this.onSaveAsFailed(error));
      }
    });
  }

  save() {
    const properties = new PopupWindowProperties();
    const data: IConfirmPopupData = {
      headerResourceKey: 'SAVE_ROUTE_CHANGES',
      confirmTextboxResourceKey: 'ROUTE_SAVE_BEFORE'
    };

    properties.data = data;

    if (!this.newDeviceSequence) {
      this.newDeviceSequence = this.originalDeviceSequence;
    }

    const component = this.popupWindowService.show(ConfirmPopupComponent, properties) as unknown as ConfirmPopupComponent;
    component.dismiss.subscribe(selectedConfirm => {
      if (selectedConfirm) {
        this.requestStatus = 'save';
        this.pickRoutesService.save(this.routeGuid, this.newRouteName, this.newDeviceSequence)
          .subscribe(result => this.navigateBack(), error => this.onSaveFailed(error));
      }
    });
  }

  delete(){
    const properties = new PopupWindowProperties();
    const data: IConfirmPopupData = {
      headerResourceKey: 'ROUTE_DELETE',
      confirmTextboxResourceKey: 'ROUTE_DELETE_AFTER'
    };

    properties.data = data;

    const component = this.popupWindowService.show(ConfirmPopupComponent, properties) as unknown as ConfirmPopupComponent;
    component.dismiss.subscribe(selectedConfirm => {
      if (selectedConfirm) {
        this.pickRoutesService.delete(this.routeGuid)
          .subscribe(result => this.navigateBack(), error => this.onSaveFailed(error));
      }
    });
  }

  onDeviceSequenceChanged(newDeviceSequence: IDeviceSequenceOrder[]) {
    for (let i = 0; i < newDeviceSequence.length; i++) {
      const device = newDeviceSequence[i];
      device.SequenceOrder = i + 1;
    }

    this.newDeviceSequence = newDeviceSequence;
  }

  onRouteNameChange(newName: string) {
    this.newRouteName = newName;
    this.routeNameChanged = true;
  }

  onSaveAsFailed(error: HttpErrorResponse): any {
    this.requestStatus = 'none';
    if (error.status === 400) {
      forkJoin(this.duplicateErrorTitle$, this.duplicateErrorMessage$).subscribe(r => {
        this.displayError('Duplicate-Description-Error', r[0], r[1]);
      });
    } else {
      forkJoin(this.genericErrorTitle$, this.genericErrorMessage$).subscribe(r => {
        this.displayError('Generic-Error', r[0], r[1]);
      });
    }
  }

  onSaveFailed(error: HttpErrorResponse): any {
    this.requestStatus = 'none';
    if (error.status === 400) {
      forkJoin(this.duplicateErrorTitle$, this.duplicateErrorMessage$).subscribe(r => {
        this.displayError('Duplicate-Description-Error', r[0], r[1]);
      });
    } else {
      forkJoin(this.genericErrorTitle$, this.genericErrorMessage$).subscribe(r => {
        this.displayError('Generic-Error', r[0], r[1]);
      });
    }
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
