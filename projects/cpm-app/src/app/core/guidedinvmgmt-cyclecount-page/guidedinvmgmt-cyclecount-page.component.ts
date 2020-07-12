import { Component, OnInit, ViewChild, AfterViewChecked, HostListener, ElementRef } from '@angular/core';
import { map, shareReplay, filter, catchError } from 'rxjs/operators';
import * as _ from 'lodash';
import { ActivatedRoute } from '@angular/router';
import { Observable, forkJoin, merge, throwError, Subscription } from 'rxjs';
import { NumericComponent, DatepickerComponent, ButtonActionComponent, DateFormat, Util, PopupDialogService, PopupDialogComponent, PopupDialogProperties, PopupDialogType, ToastModule, ToastService } from '@omnicell/webcorecomponents';
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
import { HardwareLeaseService } from '../../api-core/services/hardware-lease-service';
import { SpinnerPopupComponent } from '../../shared/components/spinner-popup/spinner-popup.component';
import { SystemConfigurationService } from '../../shared/services/system-configuration.service';
import { GuidedCycleCountPrintLabel } from '../../api-core/data-contracts/guided-cycle-count-print-label';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { IGuidedCycleCountPrintLabel } from '../../api-core/data-contracts/i-guided-cycle-count-print-label';
import { BarcodeScanService } from 'oal-core';


@Component({
  selector: 'app-guidedinvmgmt-cyclecount-page',
  templateUrl: './guidedinvmgmt-cyclecount-page.component.html',
  styleUrls: ['./guidedinvmgmt-cyclecount-page.component.scss']
})

export class GuidedInvMgmtCycleCountPageComponent implements OnInit, AfterViewChecked {
  private _leaseDeniedTitle$: Observable<string>;
  private barCodeNotFound = "Bar Code Not Found";
  @ViewChild(NumericComponent, null) numericElement: NumericComponent;
  @ViewChild(DatepickerComponent, null) datepicker: DatepickerComponent;
  @ViewChild(ButtonActionComponent, null) nextbutton: ButtonActionComponent;
  @ViewChild(ButtonActionComponent, null) cancelbutton: ButtonActionComponent;
  @ViewChild(ButtonActionComponent, null) donebutton: ButtonActionComponent;
  @ViewChild('contain', null) elementView: ElementRef;
  @ViewChild('Generic', null) GenericView: ElementRef;

  leaseBusyTitle$: Observable<any>;
  leaseBusyMessage$: Observable<any>;
  productBarCodeInfo$: Observable<any>;
  binBarCodeInfo$: Observable<any>;
  binBarCodeDisplay: boolean = true;
  productBarCodeDisplay: boolean = true;
  carouselFaulted: boolean = false;
  deviceLocationAccessBusy: boolean;
  displayCycleCountItem: IGuidedCycleCount;
  displayPrintLabel: IGuidedCycleCountPrintLabel;
  cycleCountItems: Observable<IGuidedCycleCount[]>;
  cycleCountItemsCopy: IGuidedCycleCount[];
  popupDialogProperties: PopupDialogProperties;
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
  labelPrinterName: string;
  devicePrinterName: string;
  deviceId: any;
  printResult: boolean;
  safetyScanConfirmation: string;
  popupTimeoutSeconds: number;
  leaseBusyPopup$: Observable<PopupDialogComponent>;
  nonBarCodekeyboardInput: string = '';
  nonBarcodeInputFocus: boolean = false;
  rawBarcodeMessage: string = '';
  pagelevelInput: string;
  itemDescriptionLength: number;
  itemDescriptionWidth: any = 0;
  itemDescriptionWidthScroll: any = 0;
  itemIdLength: number;
  dynamicGenericFormatetdNameStyle: any;
  dynamicLocationDescriptionStyle: any;
  ItemDescriptionText: boolean = false;
  scanBarCodeReturn: Observable<number>;
  scanbarCodeValue: Observable<number>;
  itemGenericWidth: any;
  itemGenericWidthScroll: any;
  barcodeOverride: boolean = false;
  popupDialog: PopupDialogComponent;
  barcodeFormat: string = "";
  private popupDialogClose$: Subscription;
  private popupDialogPrimaryClick$: Subscription;
  private popupDialogTimeoutDialog$: Subscription;
  private barcodeScannedSubscription: Subscription;
  ItemDescriptionOverlap: boolean;
  ItemBrandNameOverlap: boolean;
  uiIssuesIdentified = false;
  isPopupVisible = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private toasterService: ToastService,
    private guidedCycleCountService: GuidedCycleCountService,
    private wpfActionController: WpfActionControllerService,
    private carouselLocationAccessService: CarouselLocationAccessService,
    private coreEventConnectionService: CoreEventConnectionService,
    private dialogService: PopupDialogService,
    private translateService: TranslateService,
    private hardwareLeaseService: HardwareLeaseService,
    private systemConfigurationService: SystemConfigurationService,
    private barcodeScanService: BarcodeScanService
  ) {
    setInterval(() => {
      this.time = new Date();
    }, 1);
    this.itemCount = 0;
    this.currentItemCount = 0;
    this.nextButtonDisable = false;
    this.doneButtonDisable = false;
    this.daterequired = false;
    this.printResult = false;
    this.disablethedate = false;
    this.numericfocus = false;
    this.ItemDescriptionOverlap = false;
    this.ItemBrandNameOverlap = false;
    this.todaydate = this.time.getMonth() + "/" + this.time.getDate() + "/" + this.time.getFullYear();
    this.leaseBusyTitle$ = translateService.get('LEASE_BUSY_TITLE');
    this.leaseBusyMessage$ = translateService.get('LEASE_BUSY_MESSAGE');
    this._leaseDeniedTitle$ = translateService.get('DEVICE_ACCESS');
  }

  ngOnInit() {
    this.deviceId = this.activatedRoute.snapshot.queryParamMap.get('deviceId');
    this.coreEventConnectionService.carouselReadySubject.pipe(filter(x => x.DeviceId.toString() == this.deviceId)).subscribe(x => this.carouselFaulted = false);
    this.coreEventConnectionService.carouselFaultedSubject.pipe(filter(x => x.DeviceId.toString() == this.deviceId)).subscribe(x => this.carouselFaulted = true);

    this.hardwareLeaseService.getDeviceConfiguration(this.deviceId).subscribe(res => {
      console.log(res);
      this.devicePrinterName = res.PrinterName;
    });

    this.systemConfigurationService.GetConfigurationValues('PRINTING', 'LABEL_PRINTER').subscribe(result => {
      this.labelPrinterName = result.Value;
    });

    this.systemConfigurationService.GetConfigurationValues('TIMEOUTS', 'POP_UP_MESSAGE_TIMEOUT').subscribe(result => {
      this.popupTimeoutSeconds = (Number(result.Value));
    });

    this.systemConfigurationService.GetConfigurationValues('ITEM', 'GUIDEDCYCLECOUNT_SAFETYSTOCK').subscribe(result => {
      this.safetyScanConfirmation = result.Value;
    });

    this.getCycleCountData(this.deviceId);
    this.hookupEventHandlers();
  }

  ngAfterViewChecked() {
    this.toggleredborderforfirstitem();
    setTimeout(() => {
      if (this.elementView) {
        this.itemDescriptionWidth = this.elementView.nativeElement.offsetWidth;
        this.itemDescriptionWidthScroll = this.elementView.nativeElement.scrollWidth;
        if (this.elementView.nativeElement.offsetWidth < this.elementView.nativeElement.scrollWidth) {
          this.ItemDescriptionOverlap = true;
        }
      }
      if (this.GenericView) {
        this.itemGenericWidth = this.GenericView.nativeElement.offsetWidth;
        this.itemGenericWidthScroll = this.GenericView.nativeElement.scrollWidth;
        if (this.GenericView.nativeElement.offsetWidth < this.GenericView.nativeElement.scrollWidth) {
          this.ItemBrandNameOverlap = true;
        }
      }
    });
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
        this.displayCycleCountItem.ExpirationDateFormatted = (date.getFullYear() === 1) ? '' : ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + ((date.getFullYear() == 1) ? 1900 : date.getFullYear());
        if (this.displayCycleCountItem.ExpirationDateFormatted === "" && this.displayCycleCountItem.QuantityOnHand !== 0) {
          this.DisableActionButtons(true);
        }
        this.cycleCountItemsCopy = x;
        x.splice(0, 1);
        this.itemCount = x.length + 1;

        this.itemDescriptionLength = this.displayCycleCountItem.GenericNameFormatted.length;
        this.itemIdLength = this.displayCycleCountItem.ItemId.length;
        this.dynamicGenericFormatetdNameStyle = "-" + (2 * (x[0] && x[0].GenericNameFormatted.length)) + "px";
        this.dynamicLocationDescriptionStyle = "-" + (3 * (x[0] && x[0].LocationDescription.length)) + "px";
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
    if (this.ItemDescriptionOverlap) {
      this.ItemDescriptionOverlap = false;
    }
    if (this.displayCycleCountItem !== null) {
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
        QuantityOnHand: this.displayCycleCountItem.QuantityOnHand,
        BarCodeFormat: this.barcodeFormat,
        ProductID: this.rawBarcodeMessage && this.rawBarcodeMessage
      });

      var deviceId = this.activatedRoute.snapshot.queryParamMap.get('deviceId');

      this.guidedCycleCountService.post(deviceId, update).subscribe(
        res => {
          console.log(res);
        }
      );
    }
    if (this.isLastItem || this.currentItemCount === this.itemCount) {
      if (this.displayCycleCountItem.DeviceLocationTypeId === DeviceLocationTypeId.Carousel) {
        this.carouselLocationAccessService.clearLightbar(this.displayCycleCountItem.DeviceId).subscribe();
      }

      this.wpfActionController.ExecuteBackAction();
    } else {
      this.nextRecord();
    }
  }

  nextRecord() {
    if (this.ItemDescriptionOverlap) {
      this.ItemDescriptionOverlap = false;
    }
    if (this.itemCount === 0) {
      this.isLastItem = true;
    }
    else {
      this.displayCycleCountItem = this.cycleCountItemsCopy[this.currentItemCount - 1];
      var date = new Date(this.cycleCountItemsCopy[this.currentItemCount - 1].ExpirationDate);
      if (this.displayCycleCountItem.QuantityOnHand === 0) {
        this.disabledatecomponent(true);
      }
      else {
        this.disabledatecomponent(false);
      }
      if (this.datepicker) {
        this.datepicker.selectedDate = "";
      }
      this.displayCycleCountItem.InStockQuantity = this.displayCycleCountItem.QuantityOnHand;
      this.displayCycleCountItem.ExpirationDateFormatted = (date.getFullYear() == 1) ? '' : ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + ((date.getFullYear() == 1) ? 1900 : date.getFullYear());
      if (this.displayCycleCountItem.ExpirationDateFormatted === "" && this.displayCycleCountItem.QuantityOnHand !== 0)
        this.DisableActionButtons(true);
      else
        this.DisableActionButtons(false);
      this.currentItemCount++;
      if (this.currentItemCount === this.itemCount) {
        this.isLastItem = true;
      }
    }

    this.itemDescriptionLength = this.displayCycleCountItem.GenericNameFormatted.length;
    this.itemIdLength = this.displayCycleCountItem.ItemId.length;
    this.dynamicGenericFormatetdNameStyle = "-" + (2 * (this.displayCycleCountItem.GenericNameFormatted.length)) + "px";
    this.dynamicLocationDescriptionStyle = "-" + (3 * (this.displayCycleCountItem.LocationDescription.length)) + "px";
    this.toggleredborderfornonfirstitem(true);
    this.binBarCodeDisplay = true;
    this.productBarCodeDisplay = true;
    this.reset();
    Util.setByTabIndex(this.numericindexes[1]);
  }

  onQuantityChange($event) {
    if ($event == "0") {
      this.daterequired = false;
      this.disabledatecomponent(true);
      this.toggleredborderfornonfirstitem(true);
      this.DisableActionButtons(false);
      if (!(this.binBarCodeDisplay) && !(this.productBarCodeDisplay)) {
        this.navigateContinue();
      }
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
          if (!(this.binBarCodeDisplay) && !(this.productBarCodeDisplay)) {
            this.navigateContinue();
          }
        }
        else if (isNaN(eventdate.getTime())) {
          this.DisableActionButtons(true);
        }
        else {
          this.daterequired = false;
          this.DisableActionButtons(false);
          this.toggleredborderfornonfirstitem(true);
          if (!(this.binBarCodeDisplay) && !(this.productBarCodeDisplay)) {
            this.navigateContinue();
          }
        }
      }
      else {
        this.daterequired = true;
        this.DisableActionButtons(true);
      }
    }
  }

  DisableActionButtons(value: boolean) {
    if (this.isLastItem !== true) { this.nextButtonDisable = value };
    if (this.isLastItem === true) { this.doneButtonDisable = value };
  }

  CheckItemExpGranularity() {
    return this.displayCycleCountItem && this.displayCycleCountItem.ItmExpDateGranularity != "None" ? false : true;
  }

  navigateSkip() {
    if (this.isLastItem || this.currentItemCount == this.itemCount) {
      if (this.displayCycleCountItem.DeviceLocationTypeId === DeviceLocationTypeId.Carousel) {
        this.carouselLocationAccessService.clearLightbar(this.displayCycleCountItem.DeviceId).subscribe();
      }
      this.binBarCodeDisplay = true;
      this.productBarCodeDisplay = true;
      this.reset();
      this.wpfActionController.ExecuteBackAction();
    }
    else {
      if(this.datepicker)
      {
        this.datepicker.selectedDate = "";
      }
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
      || (this.displayCycleCountItem && this.displayCycleCountItem.ExpirationDateFormatted === "")) 
      {
      if (!(this.datepicker && this.datepicker.isDisabled))
      {
        this.toggleredborderfornonfirstitem(false);
      }
      else {
        this.toggleredborderfornonfirstitem(true);
      }
    }
    else
    {
      this.toggleredborderfornonfirstitem(true);
    }
  }

  handleDeviceLocationAccessResult(deviceLocaitonAccessResult: DeviceLocationAccessResult) {
    if (deviceLocaitonAccessResult === DeviceLocationAccessResult.LeaseNotAvailable) {
      let leaseDeniedMessage$ = this.translateService.get('LEASE_DENIED_MESSAGE', { deviceDescription: this.displayCycleCountItem.DeviceDescription });
      forkJoin(this._leaseDeniedTitle$, leaseDeniedMessage$).subscribe(r => {
        let leaseDeniedPopup = this.displayError('Lease-Denied', r[0], r[1])
        merge(leaseDeniedPopup.didClickCloseButton, leaseDeniedPopup.didClickPrimaryButton).subscribe(() => this.navigateBack());
      });
    }

    if (deviceLocaitonAccessResult === DeviceLocationAccessResult.LeaseNotRequested) {
      this.navigateBack();
    }

    if (deviceLocaitonAccessResult === DeviceLocationAccessResult.Failed) {
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

  displayError(uniqueId, title, message): PopupDialogComponent {
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

  HasLabelPrinterConfigured(): boolean {
    if ((this.devicePrinterName && this.devicePrinterName.length > 0) || (this.labelPrinterName && this.labelPrinterName.length > 0)) {
      return true;
    }
    else {
      return false;
    }
  }

  CheckSafetyScanConfiguration(): boolean {
    if (this.safetyScanConfirmation === "Yes" && this.displayCycleCountItem.SafetyStockRestockScan !== 'N') {
      this.DisableActionButtons(true);
      return true;
    }
    else {
      return false;
    }
  }

  PrintLabel() {
    this.displayPrintLabel = new GuidedCycleCountPrintLabel({
      ItemId: this.displayCycleCountItem.ItemId,
      DosageForm: this.displayCycleCountItem.DosageForm,
      DeviceId: this.displayCycleCountItem.DeviceId,
      DeviceLocationId: this.displayCycleCountItem.DeviceLocationId,
      DeviceLocationDescription: this.displayCycleCountItem.LocationDescription,
      TradeName: this.displayCycleCountItem.BrandNameFormatted,
      GenericName: this.displayCycleCountItem.GenericNameFormatted,
      UnitOfIssue: this.displayCycleCountItem.Units
    });

    this.guidedCycleCountService.PrintLabel(this.deviceId, this.displayPrintLabel).subscribe(res => {
      if (res) {
        this.printResult = true;
        this.displaySuccessToSaveDialog();
      }
      else {
        this.printResult = false;
        this.displayFailedToSaveDialog();
      }
    }, err => {
      console.error(HttpErrorResponse, err);
    });
  }

  displaySuccessToSaveDialog(): void {
    const properties = new PopupDialogProperties('Role-Status-Info');
    this.translateService.get('PRINTSUCCESSFUL_HEADER_TEXT').subscribe(result => { properties.titleElementText = result; });
    this.translateService.get('PRINTSUCCESSFUL_BODY_TEXT').subscribe(result => { properties.messageElementText = result; });
    properties.showPrimaryButton = true;
    properties.showSecondaryButton = false;
    properties.primaryButtonText = 'OK';
    properties.dialogDisplayType = PopupDialogType.Info;
    properties.timeoutLength = this.popupTimeoutSeconds;
    this.dialogService.showOnce(properties);
  }

  displayFailedToSaveDialog(): void {
    const properties = new PopupDialogProperties('Role-Status-Error');
    this.translateService.get('PRINTFAILED_HEADER_TEXT').subscribe(result => { properties.titleElementText = result; });
    this.translateService.get('PRINTFAILED_BODY_TEXT').subscribe(result => { properties.messageElementText = result; });
    properties.showPrimaryButton = true;
    properties.showSecondaryButton = false;
    properties.primaryButtonText = 'OK';
    properties.dialogDisplayType = PopupDialogType.Error;
    properties.timeoutLength = this.popupTimeoutSeconds;
    this.dialogService.showOnce(properties);
  }

  // Scanned barcode event listener for use in Cef
  processScannedBarcode(scannedBarcode: string): void {
    this.barcodeScanService.reset();
    this.rawBarcodeMessage = scannedBarcode;
    if (this.rawBarcodeMessage.search('$') !== -1 || this.rawBarcodeMessage === "0000")
      this.itemBinBarCode();
  }
  // Page Level Listener for barcode scanner
  @HostListener('document:keypress', ['$event']) onKeypressHandler(event: KeyboardEvent) {
    if (this.nonBarcodeInputFocus) {
      return;
    }

    const isInputComplete = this.barcodeScanService.handleKeyInput(event);

    // If not from barcode scanner ignore the character
    if (!this.barcodeScanService.isScannerInput()) {
      this.barcodeScanService.reset();
    }

    if (isInputComplete) {
      // populating the page level input into text box.
      this.rawBarcodeMessage = this.barcodeScanService.BarcodeInputCharacters;
      this.barcodeScanService.reset();
    }
  }

  onBarcodeScanExcludedKeyPressEvent(event: KeyboardEvent) {
    const isInputComplete = this.barcodeScanService.handleKeyInput(event);
    const isScannerInput = this.barcodeScanService.isScannerInput();

    // check if the character is a barcode scan
    if (isScannerInput) {
      // Since the first character always returns true, ignore it.
      if (this.barcodeScanService.BarcodeInputCharacters && this.barcodeScanService.BarcodeInputCharacters.length !== 1) {
        // ignore if it is a barcodescan
        event.preventDefault();
      }
    } else {
      this.barcodeScanService.reset();
    }

    if (isInputComplete) {
      // remove the last character.
      this.rawBarcodeMessage = this.barcodeScanService.BarcodeInputCharacters;
      this.barcodeScanService.reset();
    }
  }

  reset() {
    this.rawBarcodeMessage = '';
  }

  hookupEventHandlers(): void {
    if (this.isInvalid(this.barcodeScanService)) {
      return;
    }

    this.barcodeScannedSubscription = this.barcodeScanService.BarcodeScannedSubject && this.barcodeScanService.BarcodeScannedSubject.subscribe((scannedBarcode: string) =>
      this.processScannedBarcode(scannedBarcode)
    );
  }

  unhookEventHandlers(): void {
    if (this.isInvalid(this.barcodeScanService)) {
      return;
    }

    this.unsubscribeIfValidSubscription(this.barcodeScannedSubscription);
  }

  private unsubscribeIfValidSubscription(subscription: Subscription): void {
    if (this.isValid(subscription)) {
      subscription.unsubscribe();
    }
  }

  private isValid(variable: any): boolean {
    return variable !== undefined && variable !== null;
  }

  private isInvalid(variable: any): boolean {
    return !this.isValid(variable);
  }


  productScanInfo() {
    var productBarCode;
    this.translateService.get('SCAN_PRODUCT_BARCODE').subscribe(result => { productBarCode = result; });
    this.toasterService.info('info title', productBarCode, {
      timeout: 5000,
      pauseOnHover: false
    });
  }

  binbarScanInfo() {
    var binBarCode;
    this.translateService.get('SCAN_BIN_BARCODE').subscribe(result => { binBarCode = result; });
    this.toasterService.info('info title', binBarCode, {
      timeout: 5000,
      pauseOnHover: false
    });
  }

  itemBinBarCode() {
    var formatRet, overrideRet;
    if (this.displayCycleCountItem && this.displayCycleCountItem.ItemId.toUpperCase() === this.rawBarcodeMessage.substring(1, this.rawBarcodeMessage.length).toUpperCase()) {
      this.binBarCodeDisplay = false;
      if (this.isPopupVisible) {
        this.closePopup();
      }
      this.ScanValidation();
    }
    else if (this.barcodeOverride && this.rawBarcodeMessage === "0000") {
      this.binBarCodeDisplay = false;
      this.productBarCodeDisplay = false;
      if (this.isPopupVisible) {
        this.closePopup();
      }
      this.ScanValidation();
    }
    else {
      this.guidedCycleCountService.validscan(this.displayCycleCountItem && this.displayCycleCountItem.ItemId, this.rawBarcodeMessage).subscribe(res => {
        formatRet = res;
        if (formatRet === this.barCodeNotFound) {
          this.guidedCycleCountService.canoverridebarcode().subscribe(val => {
            overrideRet = val;
            this.displayWrongBarCodeDialog(overrideRet);
          });
        }
        else {
          this.barcodeFormat = formatRet;
          this.productBarCodeDisplay = false;
          if (this.isPopupVisible) {
            this.closePopup();
          }
          this.ScanValidation();

        }
      });
    }
  }

  displayWrongBarCodeDialog(override): void {
    this.isPopupVisible = true;
    const properties = new PopupDialogProperties('INVALID_SCAN_BARCODE');
    this.translateService.get('INVALID_SCAN_BARCODE_HEADER').subscribe(result => { properties.titleElementText = result; });
    if (override) {
      this.translateService.get('INVALID_SCAN_BARCODE_OVERRIDE').subscribe(result => { properties.messageElementText = result; });
      this.barcodeOverride = true;
    }
    else {
      this.translateService.get('INVALID_SCAN_BARCODE').subscribe(result => { properties.messageElementText = result; });
    }
    properties.showPrimaryButton = true;
    properties.showSecondaryButton = false;
    properties.primaryButtonText = 'Cancel';
    properties.dialogDisplayType = PopupDialogType.Warning;
    properties.timeoutLength = 0;
    this.popupDialog = this.dialogService.showOnce(properties);

    this.popupDialogClose$ = this.popupDialog.didClickCloseButton.subscribe(() => {
      this.barcodeOverride = false;
      this.isPopupVisible = false;
    });
    this.popupDialogPrimaryClick$ = this.popupDialog.didClickPrimaryButton.subscribe(() => {
      this.barcodeOverride = false;
      this.isPopupVisible = false;
    });
    this.popupDialogTimeoutDialog$ = this.popupDialog.didTimeoutDialog.subscribe(() => {
      this.barcodeOverride = false;
    });
  }
  closePopup() {
    this.barcodeOverride = false;
    this.popupDialog && this.popupDialog.onCloseClicked();
  }
  ScanValidation() {
    var dateReg = /^\d{2}([./-])\d{2}\1\d{4}$/;
    if (!(this.binBarCodeDisplay) && !(this.productBarCodeDisplay)) {
      if (this.displayCycleCountItem && this.displayCycleCountItem.QuantityOnHand === 0) {
        this.navigateContinue();
      }
      else if (this.displayCycleCountItem && this.displayCycleCountItem.ItmExpDateGranularity === "None") {
        this.uiIssuesIdentified = false;
        this.navigateContinue();
      }
      else {
        var eventdate = new Date(this.datepicker && this.datepicker.selectedDate);
        if (this.datepicker && (this.datepicker.selectedDate === null || this.datepicker.selectedDate === "//" || this.datepicker.selectedDate === "")) {
          this.DisableActionButtons(true);
          this.toggleredborderfornonfirstitem(false);
        }
        else if (this.datepicker && !(this.datepicker.selectedDate.match(dateReg))) {
          this.DisableActionButtons(true);
        }
        else if (isNaN(eventdate.getTime())) {
          this.DisableActionButtons(true);
        }
        else {
          this.uiIssuesIdentified = false;
          this.navigateContinue();
        }
        this.uiIssuesIdentified = true;
      }
    }
  }
  ngOnDestroy() {
    if (this.popupDialogClose$) {
      this.popupDialogClose$.unsubscribe();
    }
    if (this.popupDialogPrimaryClick$) {
      this.popupDialogPrimaryClick$.unsubscribe();
    }
  }
}
