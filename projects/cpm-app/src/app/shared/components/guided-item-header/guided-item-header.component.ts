import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PopupDialogComponent, PopupDialogProperties, PopupDialogService, PopupDialogType } from '@omnicell/webcorecomponents';
import { forkJoin, merge, Observable, Subject } from 'rxjs';
import { filter, map, shareReplay, takeUntil } from 'rxjs/operators';
import { CoreEventConnectionService } from '../../../api-core/services/core-event-connection.service';
import { DeviceLocationAccessResult } from '../../enums/device-location-access-result';
import { IItemHeaderInfo } from '../../model/i-item-header-info';
import { ISafetyStockProductData } from '../../model/i-safety-stock-product-data';
import { SpinnerPopupComponent } from '../spinner-popup/spinner-popup.component';

@Component({
  selector: 'app-guided-item-header',
  templateUrl: './guided-item-header.component.html',
  styleUrls: ['./guided-item-header.component.scss']
})
export class GuidedItemHeaderComponent {
  private _leaseDeniedTitle$: Observable<string>;
  private _okButtonText$: Observable<any>;
  private _itemHeaderInfo: IItemHeaderInfo;
  safetyStockProductData: ISafetyStockProductData;

  @Input()
  set itemHeaderInfo(value: IItemHeaderInfo) {
    this._itemHeaderInfo = value;
    if (this._itemHeaderInfo) {
      this.safetyStockProductData = {
        itemId: this._itemHeaderInfo.ItemId,
        dispenseIds: [],
        requireProductScan: this._itemHeaderInfo.RequireItemProductScan,
        requireDispenseScan: this._itemHeaderInfo.RequireDispenseScan,
        requireBinScan: this._itemHeaderInfo.RequireBinScan,
      };
    } else {
      this.safetyStockProductData = null;
    }
  }

  get itemHeaderInfo(): IItemHeaderInfo {
    return this._itemHeaderInfo;
  }

  @Output()
  leaseDenied: EventEmitter<any> = new EventEmitter();

  carouselFaulted: boolean;
  leaseBusyPopup$: Observable<PopupDialogComponent>;
  leaseBusyTitle$: Observable<string>;

  deviceLocationAccessBusy: boolean;

  ngUnsubscribe = new Subject();

  constructor(
    private translateService: TranslateService,
    private dialogService: PopupDialogService,
    private coreEventConnectionService: CoreEventConnectionService,
  ) {
    this.leaseBusyTitle$ = this.translateService.get('LEASE_BUSY_TITLE');
    this._leaseDeniedTitle$ = this.translateService.get('DEVICE_ACCESS');
    this._okButtonText$ = this.translateService.get("OK");
    this.coreEventConnectionService.carouselReadySubject
      .pipe(filter(x => this.itemHeaderInfo && this.itemHeaderInfo.DeviceId == x.DeviceId), takeUntil(this.ngUnsubscribe))
      .subscribe(x => this.carouselFaulted = false);
    this.coreEventConnectionService.carouselFaultedSubject
      .pipe(filter(x => this.itemHeaderInfo && this.itemHeaderInfo.DeviceId == x.DeviceId), takeUntil(this.ngUnsubscribe))
      .subscribe(x => this.carouselFaulted = true);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
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
