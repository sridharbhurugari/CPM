import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DeviceLocationAccessService } from '../../services/devices/device-location-access.service';
import { IDeviceLocationAccessComponentData } from '../../model/i-device-location-access-component-data';
import { DeviceLocationTypeId } from '../../constants/device-location-type-id';
import { DeviceLocationAccessResult } from '../../enums/device-location-access-result';
import { TranslateService } from '@ngx-translate/core';
import { DeviceLeaseService } from '../../services/devices/device-lease.service';
import { PopupDialogService, PopupDialogProperties, PopupDialogType } from '@omnicell/webcorecomponents';
import { Observable, forkJoin, merge } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-device-location-access',
  templateUrl: './device-location-access.component.html',
  styleUrls: ['./device-location-access.component.scss']
})
export class DeviceLocationAccessComponent {
  private _deviceLocationAccessData: IDeviceLocationAccessComponentData;
  private _errorDialogTitle$: Observable<string>;
  private _deviceOfflineMessage$: Observable<string>;
  private _deviceLocationAccessBusy: boolean;
  private _deviceLeaseBusy: boolean;
  private _requestLeaseTitle$: Observable<string>;
  private _requestLeaseMessage$: Observable<string>;

  get deviceLocationAccessBusy(): boolean {
    return this._deviceLocationAccessBusy;
  }
  set deviceLocationAccessBusy(value: boolean) {
    this._deviceLocationAccessBusy = value;
    this.isAccessBusy.next(this._deviceLocationAccessBusy);
  }

  get deviceLeaseBusy(): boolean {
    return this._deviceLeaseBusy;
  }
  set deviceLeaseBusy(value: boolean) {
    this._deviceLeaseBusy = value;
    this.isLeaseBusy.next(this._deviceLeaseBusy);
  }

  displayButton: boolean;

  @Input()
  disabled: boolean;

  @Input()
  set deviceLocationAccessData(value: IDeviceLocationAccessComponentData){
    this._deviceLocationAccessData = value;
    this.accessLocation();
    this.displayButton = this._deviceLocationAccessData.DeviceLocationTypeId == DeviceLocationTypeId.Carousel;
  }

  get deviceLocationAccessData(): IDeviceLocationAccessComponentData {
    return this._deviceLocationAccessData;
  }

  @Output()
  isAccessBusy: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  isLeaseBusy: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  accessResult: EventEmitter<DeviceLocationAccessResult> = new EventEmitter();

  constructor(
    private deviceLocationAccessService: DeviceLocationAccessService,
    private deviceLeaseService: DeviceLeaseService,
    private dialogService: PopupDialogService,
    translateService: TranslateService,
  ) {
    this._requestLeaseTitle$ = translateService.get('REQUEST_LEASE_TITLE');
    this._requestLeaseMessage$ = translateService.get('REQUEST_LEASE_MESSAGE');
    this._errorDialogTitle$ = translateService.get('DEVICE_LOC_ACCESS_ERROR_TITLE');
    this._deviceOfflineMessage$ = translateService.get('DEVICE_OFFLINE_MESSAGE');
  }

  accessLocation() {
    this.deviceLocationAccessBusy = true;
    var deviceId = this._deviceLocationAccessData.DeviceId;
    this.deviceLocationAccessService.accessLocation({
      deviceId: deviceId,
      deviceLocationId: this._deviceLocationAccessData.DeviceLocationId,
      deviceLocationTypeId: this._deviceLocationAccessData.DeviceLocationTypeId,
      shelfNumber: this._deviceLocationAccessData.ShelfNumber,
      binNumber: this._deviceLocationAccessData.BinNumber,
      slotNumber: this._deviceLocationAccessData.SlotNumber,
    }, {
      itemDescription: this._deviceLocationAccessData.ItemGenericNameFormatted,
      itemQuantity: this._deviceLocationAccessData.DeviceLocationAccessQuantity,
      itemUnits: this._deviceLocationAccessData.DeviceLocationAccessUnits,
    }).subscribe(x => this.handleDeviceLocationAccessResult(x, deviceId));
  }

  private handleDeviceLocationAccessResult(result: DeviceLocationAccessResult, deviceId: number) {
    if(result === DeviceLocationAccessResult.LeaseNotAvailable){
      this.handleLeaseNotAvailable(deviceId);
    }
    else {
      if (result === DeviceLocationAccessResult.DeviceNotOnline) {
        forkJoin(this._errorDialogTitle$, this._deviceOfflineMessage$).subscribe(r => this.displayError('DEVICE-OFFLINE', r[0], r[1]));
      }

      this.deviceLocationAccessBusy = false;
      this.accessResult.next(result);
    }
  }

  private handleLeaseNotAvailable(deviceId: number) {
    this.promptRequestLease().subscribe(confirmed => {
      if (confirmed) {
        this._deviceLeaseBusy = true;
        let lease$ = this.deviceLeaseService.requestLease(deviceId);
        lease$.subscribe(leaseSucceeded => {
          if (leaseSucceeded) {
            this.accessLocation();
          }
          else {
            this.accessResult.next(DeviceLocationAccessResult.LeaseNotAvailable);
          }
          this._deviceLeaseBusy = false;
        });
      }
      else {
        this.accessResult.next(DeviceLocationAccessResult.LeaseNotAvailable);
      }
    });
  }

  private displayError(uniqueId, title, message) {
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

  private promptRequestLease(): Observable<boolean> {
    return forkJoin(this._requestLeaseTitle$, this._requestLeaseMessage$).pipe(flatMap(x => this.displayRequestLeaseDialog(x[0], x[1])));
  }

  private displayRequestLeaseDialog(title: string, message: string): Observable<boolean> {
    const properties = new PopupDialogProperties('REQUEST-LEASE');
    properties.titleElementText = title;
    properties.messageElementText = message;
    properties.showPrimaryButton = true;
    properties.primaryButtonText = 'Ok';
    properties.showSecondaryButton = true;
    properties.secondaryButtonText = 'Cancel';
    properties.showCloseIcon = false;
    properties.dialogDisplayType = PopupDialogType.Info;
    properties.timeoutLength = 0;
    let component = this.dialogService.showOnce(properties);
    let primaryClick$ = component.didClickPrimaryButton.pipe(map(x => true));
    let secondaryClick$ = component.didClickSecondaryButton.pipe(map(x => false));
    return merge(primaryClick$, secondaryClick$);
  }
}
