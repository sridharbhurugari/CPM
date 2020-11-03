import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PopupDialogComponent, PopupDialogProperties, PopupDialogService, PopupDialogType } from '@omnicell/webcorecomponents';
import { forkJoin, merge, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { DeviceLocationAccessResult } from '../../enums/device-location-access-result';
import { IItemHeaderInfo } from '../../model/i-item-header-info';
import { SimpleDialogService } from '../../services/dialogs/simple-dialog.service';
import { SpinnerPopupComponent } from '../spinner-popup/spinner-popup.component';

@Component({
  selector: 'app-guided-item-header',
  templateUrl: './guided-item-header.component.html',
  styleUrls: ['./guided-item-header.component.scss']
})
export class GuidedItemHeaderComponent implements OnInit {
  private _leaseDeniedTitle$: Observable<string>;
  private _okButtonText$: Observable<any>;

  @Input()
  itemHeaderInfo: IItemHeaderInfo;

  @Output()
  leaseDenied: EventEmitter<any> = new EventEmitter();

  carouselFaulted: boolean;
  leaseBusyPopup$: Observable<PopupDialogComponent>;
  leaseBusyTitle$: Observable<string>;

  deviceLocationAccessBusy: boolean;

  constructor(
    private translateService: TranslateService,
    private dialogService: PopupDialogService,
  ) {
    this.leaseBusyTitle$ = this.translateService.get('LEASE_BUSY_TITLE');
    this._leaseDeniedTitle$ = this.translateService.get('DEVICE_ACCESS');
    this._okButtonText$ = this.translateService.get("OK");
  }

  ngOnInit() {
  }

  handleDeviceLocationAccessResult(deviceLocationAccessResult: DeviceLocationAccessResult) {
    if (deviceLocationAccessResult === DeviceLocationAccessResult.LeaseNotAvailable) {
      let leaseDeniedMessage$ = this.translateService.get('LEASE_DENIED_MESSAGE', { deviceDescription: this.itemHeaderInfo.DeviceDescription });
      forkJoin(this._leaseDeniedTitle$, leaseDeniedMessage$, this._okButtonText$).subscribe(r => {
        let leaseDeniedPopup = this.displayError('Lease-Denied', r[0], r[1], r[2]);
        merge(leaseDeniedPopup.didClickCloseButton, leaseDeniedPopup.didClickPrimaryButton).subscribe(() => this.leaseDenied.emit());
      });
    }

    if (deviceLocationAccessResult === DeviceLocationAccessResult.LeaseNotRequested) {
      this.leaseDenied.emit();
    }

    if (deviceLocationAccessResult === DeviceLocationAccessResult.Failed) {
      this.carouselFaulted = true;
    } else {
      this.carouselFaulted = false;
    }
  }

  handleLeaseBusyChanged(isBusy: boolean) {
    if (isBusy) {
      this.leaseBusyPopup$ = this.leaseBusyTitle$.pipe(map(x => this.showLeaseDialog(x)), shareReplay(1));
      this.leaseBusyPopup$.subscribe();
    } else {
      this.leaseBusyPopup$.subscribe(x => x.onCloseClicked());
    }
  }

  showLeaseDialog(title: string): PopupDialogComponent {
    const properties = new PopupDialogProperties('Lease-Busy');
    properties.titleElementText = title;
    properties.showPrimaryButton = false;
    properties.showSecondaryButton = false;
    properties.showCloseIcon = false;
    properties.dialogDisplayType = PopupDialogType.Info;
    properties.timeoutLength = 0;
    properties.component = SpinnerPopupComponent;
    return this.dialogService.showOnce(properties);
  }

  displayError(uniqueId, title, message, primaryButtonText): PopupDialogComponent {
    const properties = new PopupDialogProperties(uniqueId);
    properties.primaryButtonText = primaryButtonText;
    properties.titleElementText = title;
    properties.messageElementText = message;
    properties.showPrimaryButton = true;
    properties.showSecondaryButton = false;
    properties.dialogDisplayType = PopupDialogType.Error;
    properties.timeoutLength = 0;
    return this.dialogService.showOnce(properties);
  }
}
