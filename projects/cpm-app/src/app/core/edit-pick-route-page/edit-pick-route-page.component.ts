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

  routeGuid: string;
  newDeviceSequence: IDeviceSequenceOrder[];
  originalDeviceSequence: IDeviceSequenceOrder[];
  newRouteName: string;

  isDefaultRoute: boolean;
  routeNameChanged: boolean;

  constructor(
    private route: ActivatedRoute,
    private pickRoutesService: PickRoutesService,
    private devicesService: DevicesService,
    private location: Location,
    private popupWindowService: PopupWindowService,
    private dialogService: PopupDialogService,
    private translateService: TranslateService,
  ) { }

  ngOnInit() {
    this.routeNameChanged = false;
    let pickRouteId = this.route.snapshot.paramMap.get('pickRouteId');
    this.pickRoute$ = this.pickRoutesService.get(pickRouteId).pipe(shareReplay(1));

    let allDevices$ = this.devicesService.get().pipe(shareReplay(1));
    this.duplicateErrorTitle$ = this.translateService.get('ERROR_DUPLICATE_NAME_TITLE');
    this.duplicateErrorMessage$ = this.translateService.get('ERROR_DUPLICATE_NAME_MESSAGE');

    this.enabledDevices$ = forkJoin(this.pickRoute$, allDevices$).pipe(map(results => {
      let pickRouteDetail = results[0];
      let allDevices = results[1];
      let enabledDevices = allDevices.map(x => {
        let pickRouteDevice = pickRouteDetail.DeviceSequence.find(d => d.DeviceId === x.Id);
        let isSelected = pickRouteDevice !== undefined;
        if (!isSelected) {
          return null;
        }

        let sequenceOrder = pickRouteDevice.SequenceOrder;

        return {
          DeviceId: x.Id,
          DeviceDescription: x.Description,
          SequenceOrder: sequenceOrder,
        };
      });

      this.routeGuid = pickRouteDetail.PickRouteGuid;
      this.newRouteName = pickRouteDetail.Description;
      return enabledDevices.filter(x => x != null).sort((a, b) => a.SequenceOrder - b.SequenceOrder);
    }));

    this.disabledDevices$ = forkJoin(this.pickRoute$, allDevices$).pipe(map(results => {
      let pickRouteDetail = results[0];
      let allDevices = results[1];
      let disabledDevices = allDevices.map(x => {
        let pickRouteDevice = pickRouteDetail.DeviceSequence.find(d => d.DeviceId === x.Id);
        let isSelected = pickRouteDevice !== undefined;
        if (isSelected) {
          return null;
        }

        let sequenceOrder = 999;

        return {
          DeviceId: x.Id,
          DeviceDescription: x.Description,
          SequenceOrder: sequenceOrder,
        };
      });

      this.routeGuid = pickRouteDetail.PickRouteGuid;
      this.newRouteName = pickRouteDetail.Description;

      return disabledDevices.filter(x => x != null);
    }));

    this.isDefaultRoute = this.newRouteName === 'Default';

    this.originalDeviceSequence = [];
    this.enabledDevices$.forEach(enabledDevice => {
      enabledDevice.forEach( device => {
        this.originalDeviceSequence.push(device);
      });
    });
  }

  navigateBack() {
    this.location.back();
  }

  saveAs() {
    let properties = new PopupWindowProperties();
    let data: ITextResultPopupData = {
      headerResourceKey: 'SAVE_NEW_ROUTE',
      placeholderTextResouceKey: 'NEW_ROUTE_NAME',
      initialValue: undefined,
      resultValue: null,
      beforeTextboxResourceKey: 'ROUTE_SAVEAS_BEFORE',
      afterTextboxResourceKey: 'ROUTE_SAVEAS_AFTER'
    };
    properties.data = data;

    let component = this.popupWindowService.show(TextResultPopupComponent, properties) as unknown as TextResultPopupComponent;
    component.dismiss.subscribe(selectedConfirm => {
      if (selectedConfirm) {
        this.pickRoutesService.saveAs(data.resultValue, this.newDeviceSequence)
          .subscribe(result => this.navigateBack(), error => this.onSaveAsFailed(error));
      }
    });
  }

  save() {
    let properties = new PopupWindowProperties();
    let data: IConfirmPopupData = {
      headerResourceKey: 'SAVE_ROUTE_CHANGES',
      confirmTextboxResourceKey: 'ROUTE_SAVE_BEFORE'
    };

    properties.data = data;

    if (!this.newDeviceSequence) {
      this.newDeviceSequence = this.originalDeviceSequence;
    }

    let component = this.popupWindowService.show(ConfirmPopupComponent, properties) as unknown as ConfirmPopupComponent;
    component.dismiss.subscribe(selectedConfirm => {
      if (selectedConfirm) {
        this.pickRoutesService.save(this.routeGuid, this.newRouteName, this.newDeviceSequence)
          .subscribe(result => this.navigateBack(), error => this.onSaveFailed(error));
      }
    });
  }

  onDeviceSequenceChanged(newDeviceSequence: IDeviceSequenceOrder[]) {
    for (let i = 0; i < newDeviceSequence.length; i++) {
      let device = newDeviceSequence[i];
      device.SequenceOrder = i + 1;
    }

    this.newDeviceSequence = newDeviceSequence;
  }

  onRouteNameChange(newName: string) {
    this.newRouteName = newName;
    this.routeNameChanged = true;
  }

  onSaveAsFailed(error: HttpErrorResponse): any {
    if (error.status === 500) {
      forkJoin(this.duplicateErrorTitle$, this.duplicateErrorMessage$).subscribe(r => {
        this.displayDuplicateDescriptionError(r[0], r[1]);
      });
    }
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
