import { Component, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { map, shareReplay, filter } from 'rxjs/operators';
import * as _ from 'lodash';
import { ActivatedRoute } from '@angular/router';
import { Observable, forkJoin, merge } from 'rxjs';
import { NumericComponent, DatepickerComponent, ButtonActionComponent, DateFormat, Util, PopupDialogService, PopupDialogComponent, PopupDialogProperties, PopupDialogType } from '@omnicell/webcorecomponents';
import { IGuidedCycleCount } from '../../api-core/data-contracts/i-guided-cycle-count';
import { GuidedCycleCountService } from '../../api-core/services/guided-cycle-count-service';
import { GuidedCycleCount } from '../model/guided-cycle-count';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { deviceCycleCountItemUpdate } from '../../api-core/data-contracts/guided-cycle-count-update';
import { DeviceLocationAccessResult } from '../../shared/enums/device-location-access-result';
import { CarouselLocationAccessService } from '../../shared/services/devices/carousel-location-access.service';
import { CoreEventConnectionService } from '../../api-core/services/core-event-connection.service';
import { DeviceLocationTypeId } from '../../shared/constants/device-location-type-id';
import { TranslateService } from '@ngx-translate/core';
import { SpinnerPopupComponent } from '../../shared/components/spinner-popup/spinner-popup.component';

@Component({
  selector: 'app-guidedinvmgmt-cyclecount-page',
  templateUrl: './guidedinvmgmt-cyclecount-page.component.html',
  styleUrls: ['./guidedinvmgmt-cyclecount-page.component.scss']
})

export class GuidedInvMgmtCycleCountPageComponent implements OnInit, AfterViewChecked {
  private _leaseDeniedTitle$: Observable<string>;

  @ViewChild(NumericComponent, null) numericElement: NumericComponent;
  @ViewChild(DatepickerComponent, null) datepicker: DatepickerComponent;
  @ViewChild(ButtonActionComponent, null) nextbutton: ButtonActionComponent;
  @ViewChild(ButtonActionComponent, null) cancelbutton: ButtonActionComponent;
  @ViewChild(ButtonActionComponent, null) donebutton: ButtonActionComponent;

  leaseBusyTitle$: Observable<any>;
  leaseBusyMessage$: Observable<any>;
  carouselFaulted: boolean = false;
  deviceLocationAccessBusy: boolean;
  displayCycleCountItem: IGuidedCycleCount;
  cycleCountItems: Observable<IGuidedCycleCount[]>;
  cycleCountItemsCopy: IGuidedCycleCount[];
  itemCount: number;
  isLastItem: boolean;
  currentItemCount: number;
  nextButtonDisable: boolean;
  doneButtonDisable: boolean;
  daterequired: boolean;
  disablethedate: boolean;
  todaydate: string;
  numericfocus: boolean;
  numericindexes = ['', 1, ''];
  datepickerindexes = [2, 3, 4, ''];
  public time: Date = new Date();
  route: any;
  leaseBusyPopup$: Observable<PopupDialogComponent>;
  constructor(
    private activatedRoute: ActivatedRoute,
    private guidedCycleCountService: GuidedCycleCountService,
    private wpfActionController: WpfActionControllerService,
    private carouselLocationAccessService: CarouselLocationAccessService,
    private coreEventConnectionService: CoreEventConnectionService,
    private dialogService: PopupDialogService,
    private translateService: TranslateService,
  ) {
    setInterval(() => {
      this.time = new Date();
    }, 1);
    this.itemCount = 0;
    this.currentItemCount = 0;
    this.nextButtonDisable = false;
    this.doneButtonDisable = false;
    this.daterequired = false;
    this.disablethedate = false;
    this.numericfocus = false;
    this.todaydate = this.time.getMonth() + "/" + this.time.getDate() + "/" + this.time.getFullYear();
    this.leaseBusyTitle$ = translateService.get('LEASE_BUSY_TITLE');
    this.leaseBusyMessage$ = translateService.get('LEASE_BUSY_MESSAGE');
    this._leaseDeniedTitle$ = translateService.get('DEVICE_ACCESS');
  }

  ngOnInit() {
    var deviceId = this.activatedRoute.snapshot.queryParamMap.get('deviceId');
    this.coreEventConnectionService.carouselReadySubject.pipe(filter(x => x.DeviceId.toString() == deviceId)).subscribe(x => this.carouselFaulted = false);
    this.coreEventConnectionService.carouselFaultedSubject.pipe(filter(x => x.DeviceId.toString() == deviceId)).subscribe(x => this.carouselFaulted = true);
    this.getCycleCountData(deviceId);
  }

  ngAfterViewChecked() {
    this.toggleredborderforfirstitem();

  }

  getCycleCountData(deviceID) {
    this.cycleCountItems = this.guidedCycleCountService.get(deviceID).pipe(map(guidedCycleCountItems => {
      return guidedCycleCountItems.map(p => new GuidedCycleCount(p));
    }));
    this.cycleCountItems.subscribe(x => {
      if (x.length > 0 && x[0].ExpirationDate) {
        this.displayCycleCountItem = x[0];
        var date = new Date(x[0].ExpirationDate);
        this.displayCycleCountItem.InStockQuantity = x[0].QuantityOnHand;

        this.toggleredborderfornonfirstitem(true);
        this.displayCycleCountItem.ItemDateFormat = DateFormat.mmddyyyy_withslashes;
        this.displayCycleCountItem.ExpirationDateFormatted = (date.getFullYear() == 1) ? '' : ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + ((date.getFullYear() == 1) ? 1900 : date.getFullYear());
        if (this.displayCycleCountItem.ExpirationDateFormatted === "" && this.displayCycleCountItem.QuantityOnHand !== 0)
          this.DisableActionButtons(true);
        this.cycleCountItemsCopy = x;
        x.splice(0, 1);
        this.itemCount = x.length + 1;
      }
      this.IsLastItem();
      this.currentItemCount++;
    },
      () => { this.toggleredborderforfirstitem(); Util.setByTabIndex(this.numericindexes[1]); },
      () => { this.toggleredborderforfirstitem(); Util.setByTabIndex(this.numericindexes[1]); }
    )
  }

  showValidComponent() {
    return this.displayCycleCountItem && this.cycleCountItemsCopy.length > 1;
  }

  IsLastItem() {
    if (this.itemCount <= 1) {
      this.isLastItem = true;
    }
    else {
      this.isLastItem = false;
    }
  }

  FormatExpireDate(date: Date) {
    if (date) {
      var date = new Date(date);
      return ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + ((date.getFullYear() == 1) ? 1900 : date.getFullYear());
    }
  }

  navigateBack() {
    if (this.displayCycleCountItem.DeviceLocationTypeId === DeviceLocationTypeId.Carousel) {
      this.carouselLocationAccessService.clearLightbar(this.displayCycleCountItem.DeviceId).subscribe();
    }

    this.wpfActionController.ExecuteBackAction();
  }

  navigateContinue() {
    if (this.displayCycleCountItem != null) {
      var expireddate = null, actualexpiradationdate = null;
      expireddate = new Date(this.displayCycleCountItem.ExpirationDateFormatted);
      if (this.displayCycleCountItem.ItmExpDateGranularity === "Month") {
        actualexpiradationdate = this.displayCycleCountItem.QuantityOnHand !== 0 ? new Date(expireddate.getFullYear(), expireddate.getMonth() + 1, 0) : null;
      }
      else {
        actualexpiradationdate = this.displayCycleCountItem.QuantityOnHand !== 0 ? new Date(expireddate) : null;
      }
      let update = new deviceCycleCountItemUpdate({
        DeviceLocationId: this.displayCycleCountItem.DeviceLocationId,
        ItemId: this.displayCycleCountItem.ItemId,
        ExpirationDate: actualexpiradationdate,
        QuantityOnHand: this.displayCycleCountItem.QuantityOnHand
      });

      var deviceId = this.activatedRoute.snapshot.queryParamMap.get('deviceId');

      this.guidedCycleCountService.post(deviceId, update).subscribe(
        res => {
          console.log(res);
        }
      );
    }
    if (this.isLastItem || this.currentItemCount == this.itemCount) {
      if (this.displayCycleCountItem.DeviceLocationTypeId === DeviceLocationTypeId.Carousel) {
        this.carouselLocationAccessService.clearLightbar(this.displayCycleCountItem.DeviceId).subscribe();
      }

      this.wpfActionController.ExecuteBackAction();
    } else {
      this.nextRecord();
    }
  }

  nextRecord() {
    if (this.itemCount == 0) {
      this.isLastItem = true;
    }
    else {
      this.displayCycleCountItem = this.cycleCountItemsCopy[this.currentItemCount - 1];
      var date = new Date(this.cycleCountItemsCopy[this.currentItemCount - 1].ExpirationDate);
      if (this.displayCycleCountItem.QuantityOnHand === 0) {
        this.disabledatecomponent(true);
      }
      else
      {
        this.disabledatecomponent(false);
      }
      this.displayCycleCountItem.InStockQuantity = this.displayCycleCountItem.QuantityOnHand;
      this.displayCycleCountItem.ExpirationDateFormatted = (date.getFullYear() == 1) ? '' : ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + ((date.getFullYear() == 1) ? 1900 : date.getFullYear());
      if (this.displayCycleCountItem.ExpirationDateFormatted === "" && this.displayCycleCountItem.QuantityOnHand !== 0)
        this.DisableActionButtons(true);
      else
        this.DisableActionButtons(false);
      this.currentItemCount++;
      if (this.currentItemCount == this.itemCount) {
        this.isLastItem = true;
      }
    }
    this.toggleredborderfornonfirstitem(true);
    Util.setByTabIndex(this.numericindexes[1]);
  }

  onQuantityChange($event) {
    if ($event == "0") {
      this.daterequired = false;
      this.disabledatecomponent(true);
      this.toggleredborderfornonfirstitem(true);
      this.DisableActionButtons(false);
    }
    else {
      this.disabledatecomponent(false);
      var eventdate = new Date(this.datepicker && this.datepicker.selectedDate);
      if (this.datepicker && (this.datepicker.selectedDate === null || this.datepicker.selectedDate === "//" || this.datepicker.selectedDate === "")) {
        this.DisableActionButtons(true);
        this.toggleredborderfornonfirstitem(false);
      }
      else if (this.isdateexpired(this.datepicker && this.datepicker.selectedDate)) {
        this.toggleredborderfornonfirstitem(false);
      }
      else if (isNaN(eventdate.getTime()) && this.displayCycleCountItem.ItmExpDateGranularity !== 'None') {
        this.DisableActionButtons(true);
        this.toggleredborderfornonfirstitem(false);
      }
    }
  }

  onDateChange($event) {
    if ($event === '' || $event === null) {
      this.daterequired = true;
    } else {
      var dateReg = /^\d{2}([./-])\d{2}\1\d{4}$/;
      if ($event.match(dateReg)) {
        var eventdate = new Date($event);
        if (this.isdateexpired($event)) {
          this.daterequired = true;
          this.toggleredborderfornonfirstitem(false);
          this.DisableActionButtons(false);
        }
        else if (isNaN(eventdate.getTime())) {
          this.DisableActionButtons(true);
        }
        else {
          this.daterequired = false;
          this.DisableActionButtons(false);
          this.toggleredborderfornonfirstitem(true);
        }
      }
      else {
        this.daterequired = true;
        this.DisableActionButtons(true);
      }
    }
  }

  DisableActionButtons(value: boolean) {
    if (this.isLastItem !== true) this.nextButtonDisable = value;
    if (this.isLastItem === true) this.doneButtonDisable = value;
  }

  CheckItemExpGranularity() {
    return this.displayCycleCountItem && this.displayCycleCountItem.ItmExpDateGranularity != "None" ? false : true;
  }

  navigateSkip() {
    if (this.isLastItem || this.currentItemCount == this.itemCount) {
      if (this.displayCycleCountItem.DeviceLocationTypeId === DeviceLocationTypeId.Carousel) {
        this.carouselLocationAccessService.clearLightbar(this.displayCycleCountItem.DeviceId).subscribe();
      }

      this.wpfActionController.ExecuteBackAction();
    }
    else {
      this.nextRecord();
    }
  }

  toggleredborderfornonfirstitem(nextrecordonly: boolean) {
    var element = document.getElementById("datepicker");
    if (element) {
      if (!nextrecordonly) {
        if ((element.classList.contains("ng-touched"))
          || (element.classList.contains("ng-untouched"))) {
          element.classList.contains("ng-valid") ? element.classList.remove("ng-valid") : null;
          element.classList.contains("ng-invalid") ? null : element.classList.add("ng-invalid");
        }
      }
      else {
        element.classList.contains("ng-invalid") ? element.classList.remove("ng-invalid") : null;
        element.classList.contains("ng-dirty") ? element.classList.remove("ng-dirty") : null;
        element.classList.contains("ng-pristine") ? element.classList.remove("ng-pristine") : null;
      }
    }
  }

  disabledatecomponent(value: boolean) {
    this.disablethedate = value;
  }

  isdateexpired(input: string) {
    var todayDate = new Date();
    var todayDateText = (todayDate.getMonth() + 1) + "/" + todayDate.getDate() + "/" + todayDate.getFullYear();
    var inputToDate = Date.parse(input);
    var todayToDate = Date.parse(todayDateText);
    return (inputToDate < todayToDate);
  }

  toggleredborderforfirstitem() {
    if (this.displayCycleCountItem && this.displayCycleCountItem.QuantityOnHand === 0) {
      this.disabledatecomponent(true);
      this.toggleredborderfornonfirstitem(true);
    }
    else if (this.isdateexpired(this.displayCycleCountItem && this.displayCycleCountItem.ExpirationDateFormatted)
      || (this.displayCycleCountItem && this.displayCycleCountItem.ExpirationDateFormatted === "")) {
      if (!(this.datepicker && this.datepicker.isDisabled))
        this.toggleredborderfornonfirstitem(false);
    }
  }

  handleDeviceLocationAccessResult(deviceLocaitonAccessResult: DeviceLocationAccessResult) {
    if (deviceLocaitonAccessResult == DeviceLocationAccessResult.LeaseNotAvailable) {
      let leaseDeniedMessage$ = this.translateService.get('LEASE_DENIED_MESSAGE', { deviceDescription: this.displayCycleCountItem.DeviceDescription });
      forkJoin(this._leaseDeniedTitle$, leaseDeniedMessage$).subscribe(r => {
        let leaseDeniedPopup = this.displayError('Lease-Denied', r[0], r[1])
        merge(leaseDeniedPopup.didClickCloseButton, leaseDeniedPopup.didClickPrimaryButton).subscribe(() => this.navigateBack());
      });
    }

    if (deviceLocaitonAccessResult == DeviceLocationAccessResult.LeaseNotRequested) {
      this.navigateBack();
    }

    if (deviceLocaitonAccessResult == DeviceLocationAccessResult.Failed) {
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

  private showLeaseDialog(title: string): PopupDialogComponent {
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

  private displayError(uniqueId, title, message): PopupDialogComponent {
    const properties = new PopupDialogProperties(uniqueId);
    properties.titleElementText = title;
    properties.messageElementText = message;
    properties.showPrimaryButton = true;
    properties.primaryButtonText = 'Ok';
    properties.showSecondaryButton = false;
    properties.dialogDisplayType = PopupDialogType.Error;
    properties.timeoutLength = 0;
    return this.dialogService.showOnce(properties);
  }
}
