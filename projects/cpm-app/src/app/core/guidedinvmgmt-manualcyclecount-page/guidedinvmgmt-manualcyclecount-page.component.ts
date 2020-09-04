import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  AfterViewChecked,
  HostListener,
  ElementRef,
} from "@angular/core";
import * as _ from "lodash";
import { WpfActionControllerService } from "../../shared/services/wpf-action-controller/wpf-action-controller.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, forkJoin, merge } from "rxjs";
import {
  NumericComponent,
  DatepickerComponent,
  SingleselectComponent,
  ButtonActionComponent,
  DateFormat,
  Util,
  PopupDialogService,
  PopupDialogComponent,
  PopupDialogProperties,
  PopupDialogType,
} from "@omnicell/webcorecomponents";
import {
  SearchDropdownInputData,
  SearchDropdownOutputData,
  SearchBoxAlign,
  SearchDropdownComponent,
  SearchDropDownColumnTemplate,
} from "@omnicell/webcorecomponents";
import { IGuidedManualCycleCountItems } from "../../api-core/data-contracts/i-guided-manual-cycle-count-items";
import { GuidedManualCycleCountItems } from "../../api-core/data-contracts/guided-manual-cycle-count-items";
import { IGuidedManualCycleCountItemid } from "../../api-core/data-contracts/i-guided-manual-cycle-count-itemid";
import { GuidedManualCycleCountItemid } from "../../api-core/data-contracts/guided-manual-cycle-count-itemid";
import { map, switchMap, shareReplay, filter } from "rxjs/operators";
import { GuidedManualCycleCountServiceService } from "../../api-core/services/guided-manual-cycle-count-service.service";
import { DeviceLocationAccessResult } from "../../shared/enums/device-location-access-result";
import { CarouselLocationAccessService } from "../../shared/services/devices/carousel-location-access.service";
import { CoreEventConnectionService } from "../../api-core/services/core-event-connection.service";
import { DeviceLocationTypeId } from "../../shared/constants/device-location-type-id";
import { TranslateService } from "@ngx-translate/core";
import { SpinnerPopupComponent } from "../../shared/components/spinner-popup/spinner-popup.component";
import { deviceCycleCountItemUpdate } from "../../api-core/data-contracts/guided-cycle-count-update";
import { SingleselectRowItem } from "../model/SingleselectRowItem";
import { searchConfiguration } from "../model/manual-cycle-count-search-configuration";
import { Subscription } from "rxjs";
import { SystemConfigurationService } from "../../shared/services/system-configuration.service";
import { GuidedCycleCountPrintLabel } from "../../api-core/data-contracts/guided-cycle-count-print-label";
import { HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { IGuidedCycleCountPrintLabel } from "../../api-core/data-contracts/i-guided-cycle-count-print-label";
import { HardwareLeaseService } from "../../api-core/services/hardware-lease-service";
import { BarcodeScanService } from "oal-core";
import { GuidedManualCycleCountScanItem } from "../../api-core/data-contracts/GuidedManualCycleCountScanItem";
@Component({
  selector: "app-guidedinvmgmt-manualcyclecount-page",
  templateUrl: "./guidedinvmgmt-manualcyclecount-page.component.html",
  styleUrls: ["./guidedinvmgmt-manualcyclecount-page.component.scss"],
})
export class GuidedinvmgmtManualcyclecountPageComponent
  implements OnInit, AfterViewInit, AfterViewChecked {
  private _leaseDeniedTitle$: Observable<string>;

  @ViewChild(NumericComponent, null) numericElement: NumericComponent;
  @ViewChild(DatepickerComponent, null) datepicker: DatepickerComponent;
  @ViewChild(ButtonActionComponent, null) cancelbutton: ButtonActionComponent;
  @ViewChild(ButtonActionComponent, null) donebutton: ButtonActionComponent;
  // @ViewChild(SingleselectComponent, null) location: SingleselectComponent;
  @ViewChild("contain", null) elementView: ElementRef;
  @ViewChild("Generic", null) GenericView: ElementRef;

  over: boolean;
  leaseBusyTitle$: Observable<any>;
  leaseBusyMessage$: Observable<any>;
  carouselFaulted: boolean = false;
  deviceLocationAccessBusy: boolean;
  displayCycleCountItem: IGuidedManualCycleCountItemid;
  cycleCountItems: Observable<IGuidedManualCycleCountItemid[]>;
  cycleCountItemsCopy: IGuidedManualCycleCountItemid[];
  doneButtonDisable: boolean;
  daterequired: boolean;
  disablethedate: boolean;
  todaydate: string;
  numericfocus: boolean;
  isMultiLocation: boolean;
  isSingleSelectEnable: boolean;
  locationCount: number = 0;
  unassignedItem: boolean;
  numericindexes = ["", 1, ""];
  datepickerindexes = [2, 3, 4, ""];
  public time: Date = new Date();
  timeIntervalId: any;
  leaseBusyPopup$: Observable<PopupDialogComponent>;
  popupTimeoutSeconds: number;
  labelPrinterName: string;
  devicePrinterName: string = "";
  printResult: boolean;
  displayPrintLabel: IGuidedCycleCountPrintLabel;
  deviceId: any;
  rawBarcodeMessage: string = "";
  nonBarCodekeyboardInput: string = "";
  pagelevelInput: string;
  nonBarcodeInputFocus: boolean = false;
  itemGenericWidth: any;
  itemGenericWidthScroll: any;
  itemIdLength: number;
  popupDialogProperties: PopupDialogProperties;
  popupDialog: PopupDialogComponent;
  popupConcurrencyDialog: PopupDialogComponent;
  private popupDialogClose$: Subscription;
  private popupDialogPrimaryClick$: Subscription;
  private popupDialogTimeoutDialog$: Subscription;
  private popupConcurrencyDialogClose$: Subscription;
  private popupConcurrencyDialogPrimaryClick$: Subscription;
  private popupConcurrencyDialogTimeout$: Subscription;
  scanItem: string;
  isSelected: boolean;
  transaction: boolean;
  originalQunatityOnHand: number;
  originalExpirationDate: Date;
  canDone: boolean;

  // Parent component variables
  selectedItem: any;
  searchKey = "";
  searchData: Observable<GuidedManualCycleCountItems[]>;
  startCounter = 0;
  endCounter: number;
  fetchCount = 100;
  @ViewChild("dropdownSearchUser", { static: true })
  userSearchDropdownElement: SearchDropdownComponent;
  placeHolderText = "";
  columnTemplate = SearchDropDownColumnTemplate;
  noResultsFoundText = "";
  gridHeight = "";
  gridWidth = "";
  columnsConfig: Array<searchConfiguration>;
  searchBoxAlign = SearchBoxAlign;
  sub: Subscription;
  sub1: Subscription;
  private barcodeScannedSubscription: Subscription;
  ItemDescriptionOverlap: boolean;
  ItemBrandNameOverlap: boolean;
  itemDescriptionWidth: any = 0;
  itemDescriptionWidthScroll: any = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private guidedManualCycleCountServiceService: GuidedManualCycleCountServiceService,
    private carouselLocationAccessService: CarouselLocationAccessService,
    private coreEventConnectionService: CoreEventConnectionService,
    private dialogService: PopupDialogService,
    private translateService: TranslateService,
    private wpfActionController: WpfActionControllerService,
    private hardwareLeaseService: HardwareLeaseService,
    private systemConfigurationService: SystemConfigurationService,
    private barcodeScanService: BarcodeScanService
  ) {
    this.timeIntervalId = setInterval(() => {
      this.time = new Date();
    }, 1);
    this.daterequired = false;
    this.disablethedate = false;
    this.numericfocus = false;
    this.printResult = false;
    this.ItemDescriptionOverlap = false;
    this.ItemBrandNameOverlap = false;
    this.todaydate =
      this.time.getMonth() +
      "/" +
      this.time.getDate() +
      "/" +
      this.time.getFullYear();
    this.leaseBusyTitle$ = translateService.get("LEASE_BUSY_TITLE");
    this.leaseBusyMessage$ = translateService.get("LEASE_BUSY_MESSAGE");
    this._leaseDeniedTitle$ = translateService.get("DEVICE_ACCESS");
  }

  ngOnInit() {
    this.noResultsFoundText = "No results found";
    this.placeHolderText = "localized search text";
    this.gridHeight = "500px";
    this.gridWidth = "800px";
    this.columnsConfig = [
      {
        displayText: "",
        displayField: "",
      },
      {
        displayText: "Item ID",
        displayField: "ID",
      },
      {
        displayText: "Item Description",
        displayField: "GenericNameFormatted",
      },
    ];
    this.guidedManualCycleCountServiceService.getSearchItems("");

    this.systemConfigurationService
      .GetConfigurationValues("PRINTING", "LABEL_PRINTER")
      .subscribe((result) => {
        this.labelPrinterName = result.Value;
      });

    this.systemConfigurationService
      .GetConfigurationValues("TIMEOUTS", "POP_UP_MESSAGE_TIMEOUT")
      .subscribe((result) => {
        this.popupTimeoutSeconds = Number(result.Value);
      });

    this.hookupEventHandlers();

    this.addwhitespacetodropdown();
    this.cycleCountItemsCopy = [];
    this.doneButtonDisable = true;

  }
  multiLocations: SingleselectRowItem[];
  selectedItemLocattion: SingleselectRowItem;

  ngAfterViewChecked() {
    this.toggleredborderforfirstitem();
    this.addwhitespacetodropdown();
        if (this.elementView) {
        this.itemDescriptionWidth = this.elementView.nativeElement.offsetWidth;
        this.itemDescriptionWidthScroll = this.elementView.nativeElement.scrollWidth;
        if (
          this.elementView.nativeElement.offsetWidth <
          this.elementView.nativeElement.scrollWidth
        ) {
          this.ItemDescriptionOverlap = true;
        }
      }
      if (this.GenericView) {
        this.itemGenericWidth = this.GenericView.nativeElement.offsetWidth;
        this.itemGenericWidthScroll = this.GenericView.nativeElement.scrollWidth;
        if (
          this.GenericView.nativeElement.offsetWidth <
          this.GenericView.nativeElement.scrollWidth
        ) {
          this.ItemBrandNameOverlap = true;
        }
      }
  }

  addwhitespacetodropdown() {
    let elemt = document.getElementById("OcSingleSelectDropdown");
    if (elemt) {
      elemt.setAttribute("style", "white-space:pre;");
    }
  }

  ngOnDestroy() {
    if (this.timeIntervalId) {
      clearInterval(this.timeIntervalId);
    }

    if (this.sub) {
      this.sub.unsubscribe();
    }
    if (this.sub1) {
      this.sub1.unsubscribe();
    }

    if (this.popupDialogClose$) {
      this.popupDialogClose$.unsubscribe();
    }
    if (this.popupDialogPrimaryClick$) {
      this.popupDialogPrimaryClick$.unsubscribe();
    }
    if (this.popupConcurrencyDialogClose$) {
      this.popupConcurrencyDialogClose$.unsubscribe();
    }
    if (this.popupConcurrencyDialogPrimaryClick$) {
      this.popupConcurrencyDialogPrimaryClick$.unsubscribe();
    }
    if (this.popupConcurrencyDialogTimeout$) {
      this.popupConcurrencyDialogTimeout$.unsubscribe();
    }

  }

  // Output from the Dropdown Search Item Click
  itemSelected(item: any) {
    this.selectedItem = JSON.stringify(item);

    if (this.displayCycleCountItem === undefined || this.displayCycleCountItem === null) {
      this.isSingleSelectEnable = false;
      this.getCycleCountData(item.item.ID);
    } else if (this.displayCycleCountItem) {
      let transactionValid = true;
      if (this.over) {
        this.closePopup();
      }
      // this.isSelected = false;
      transactionValid = this.ScanValidation();
      if (transactionValid) {
        this.onLocationBasedValidation();
        this.getCycleCountData(item.item.ID);
      }
    }

  }
  getSearchData(searchKey): Observable<GuidedManualCycleCountItems[]> {
    // Make api call to get data as an observable
    return this.guidedManualCycleCountServiceService.getSearchItems(searchKey);
    //return this.searchData ;
  }

  ngAfterViewInit() {
    this.userSearchDropdownElement.searchDropdownTextOutput$
      .pipe(
        switchMap((searchData: SearchDropdownOutputData) => {
          if (searchData.reset) {
            this.endCounter = this.fetchCount;
          }
          return this.getSearchData(searchData.searchKey);
        })
      )
      .subscribe((data: any) => {
        this.searchData = data.slice(this.startCounter, this.endCounter);
        this.endCounter = this.endCounter + this.fetchCount;
        let loadMore = true;
        if (this.endCounter >= data.length) {
          // By setting this value to False,
          // search dropdown component will not make a call back on Scroll
          loadMore = false;
        }

        const searchDataResult = new SearchDropdownInputData(
          this.searchData,
          loadMore
        );
        this.userSearchDropdownElement.searchDropdownService.pushData(
          searchDataResult
        );
      });
  }

  itemLength() {
    //this.displayCycleCountItem.QuantityOnHand = 0;
    this.DisableActionButtons(true);
    this.multiLocations = [];
    this.itemIdLength = this.displayCycleCountItem.ItemId.length;
  }
  multipleLocations(x: IGuidedManualCycleCountItemid[]) {
    for (let i = 0; i < x.length; i++) {
      if (
        x[i].DeviceLocationTypeId === DeviceLocationTypeId.Carousel ||
        x[i].DeviceLocationTypeId === DeviceLocationTypeId.OpenStorage
      ) {
        this.locationCount++;
        let location = new SingleselectRowItem();
        location.text =
          x[i].LocationDescription +
          "       " +
          x[i].PackageFormName +
          "      " +
          x[i].QuantityOnHand;
        location.value = x[i].LocationDescription;
        location.Visible = true;
        this.multiLocations && this.multiLocations.push(location && location);
        if (this.locationCount > 1) {
          this.isSingleSelectEnable = true;
          this.isMultiLocation = true;
        } else {
          this.isSingleSelectEnable = false;
          this.isMultiLocation = false;
          this.displayCycleCountItem = x[i];
          let date = new Date(x[i].ExpirationDate);
          this.displayCycleCountItem.InStockQuantity = x[i].QuantityOnHand;
          this.originalQunatityOnHand = x[i].QuantityOnHand;
          this.originalExpirationDate = x[i].ExpirationDate;
          this.displayCycleCountItem.ExpirationDateFormatted =
                  date.getFullYear() === 1
                    ? ""
                    : (date.getMonth() > 8
                        ? date.getMonth() + 1
                        : "0" + (date.getMonth() + 1)) +
                      "/" +
                      (date.getDate() > 9
                        ? date.getDate()
                        : "0" + date.getDate()) +
                      "/" +
                      (date.getFullYear() === 1 ? 1900 : date.getFullYear());               
          this.CycleCountValidation();
        }
      }
    }
    if (this.locationCount === 0) {
      let itemID;
      let itemLocation: string[] = [];
      this.displayCycleCountItem = null;
      for (let i = 0; i < x.length; i++) {
        itemID = x[i].ItemId;
        itemLocation.push(x[i].LocationDescription);
      }
      this.displayPackagerAssignItemDialog(itemID, itemLocation);
    }
  }

  getCycleCountData(itemid: string) {
    this.cycleCountItems = this.guidedManualCycleCountServiceService
      .get(itemid)
      .pipe(
        map((guidedCycleCountItems) => {
          return guidedCycleCountItems.map(
            (p) => new GuidedManualCycleCountItemid(p)
          );
        })
      );
    this.sub = this.cycleCountItems.subscribe(
      (x) => {
        if (x.length > 0 && x[0].ExpirationDate) {
          this.displayCycleCountItem = x[0];
          let date = new Date(x[0].ExpirationDate);
          this.displayCycleCountItem.InStockQuantity = x[0].QuantityOnHand;
          this.originalQunatityOnHand = x[0].QuantityOnHand;
          this.originalExpirationDate = x[0].ExpirationDate;
          this.locationCount = 0;

          if (x.length > 1) {
            this.isSelected = false;
            this.itemLength();
            this.multipleLocations(x);
          } else {
            if (
              x[0].DeviceLocationTypeId === DeviceLocationTypeId.Carousel ||
              x[0].DeviceLocationTypeId === DeviceLocationTypeId.OpenStorage
            ) {
              this.deviceId = x[0].DeviceId;
              this.hardwareLeaseService
                .getDeviceConfiguration(this.deviceId)
                .subscribe((res) => {
                  console.log(res);
                  this.devicePrinterName = res.PrinterName;
                });
              this.isSingleSelectEnable = false;
              this.displayCycleCountItem.ExpirationDateFormatted =
                date.getFullYear() == 1
                  ? ""
                  : (date.getMonth() > 8
                    ? date.getMonth() + 1
                    : "0" + (date.getMonth() + 1)) +
                  "/" +
                  (date.getDate() > 9
                    ? date.getDate()
                    : "0" + date.getDate()) +
                  "/" +
                  (date.getFullYear() == 1 ? 1900 : date.getFullYear());
              this.CycleCountValidation();
              this.itemIdLength = this.displayCycleCountItem.ItemId.length;
            }
            else {
              this.displayCycleCountItem = null;
              let locationDetails: string[] = [];
              locationDetails.push(x[0].LocationDescription);
              this.displayPackagerAssignItemDialog(
                itemid,
                locationDetails
              );
            }
          }
        } else {
          this.displayUnknownItemDialog(itemid);
        }
      },
      () => {
        this.toggleredborderforfirstitem();
        Util.setByTabIndex(this.numericindexes[1]);
      },
      () => {
        this.toggleredborderforfirstitem();
        Util.setByTabIndex(this.numericindexes[1]);
      }
    );
  }

  CycleCountValidation() {
    this.isMultiLocation = false;
    this.toggleredborderfornonfirstitem(true);
    this.DisableActionButtons(false);
    this.displayCycleCountItem.ItemDateFormat = DateFormat.mmddyyyy_withslashes;

    if (
      this.displayCycleCountItem.ExpirationDateFormatted === "" &&
      this.displayCycleCountItem.QuantityOnHand !== 0
    )
      this.DisableActionButtons(false);
    if (this.displayCycleCountItem.ItmExpDateGranularity != "None") {
      if (
        this.displayCycleCountItem.ExpirationDateFormatted === "" &&
        this.displayCycleCountItem.QuantityOnHand !== 0
      )
        this.DisableActionButtons(true);
    }
    this.coreEventConnectionService.carouselReadySubject.pipe(filter(x => x.DeviceId.toString() === this.deviceId)).subscribe(x => this.carouselFaulted = false);
    this.coreEventConnectionService.carouselFaultedSubject.pipe(filter(x => x.DeviceId.toString() === this.deviceId)).subscribe(x => this.carouselFaulted = true);
  }

  DisableActionButtons(value: boolean) {
    this.doneButtonDisable = value;
  }

  toggleredborderfornonfirstitem(nextrecordonly: boolean) {
    let element = document.getElementById("datepicker");
    if (element) {
      if (!nextrecordonly) {
        if (
          element.classList.contains("ng-touched") ||
          element.classList.contains("ng-untouched")
        ) {
          element.classList.contains("ng-valid")
            ? element.classList.remove("ng-valid")
            : null;
          element.classList.contains("ng-invalid")
            ? null
            : element.classList.add("ng-invalid");
        }
      } else {
        element.classList.contains("ng-invalid")
          ? element.classList.remove("ng-invalid")
          : null;
        element.classList.contains("ng-dirty")
          ? element.classList.remove("ng-dirty")
          : null;
        element.classList.contains("ng-pristine")
          ? element.classList.remove("ng-pristine")
          : null;
      }
    }
  }

  disabledatecomponent(value: boolean) {
    this.disablethedate = value;
  }

  isdateexpired(input: string) {
    let todayDate = new Date();
    let todayDateText =
      todayDate.getMonth() +
      1 +
      "/" +
      todayDate.getDate() +
      "/" +
      todayDate.getFullYear();
    let inputToDate = Date.parse(input);
    let todayToDate = Date.parse(todayDateText);
    return inputToDate < todayToDate;
  }

  toggleredborderforfirstitem() {
    if (
      this.displayCycleCountItem &&
      this.displayCycleCountItem.QuantityOnHand === 0
    ) {
      this.disabledatecomponent(true);
      this.toggleredborderfornonfirstitem(true);
    } else if (
      this.isdateexpired(
        this.displayCycleCountItem &&
        this.displayCycleCountItem.ExpirationDateFormatted
      ) ||
      (this.displayCycleCountItem &&
        this.displayCycleCountItem.ExpirationDateFormatted === "")
    ) {
      if (!(this.datepicker && this.datepicker.isDisabled))
        this.toggleredborderfornonfirstitem(false);
    }
  }
  FormatExpireDate(date: Date) {
    if (date) {
      var date = new Date(date);
      return (
        (date.getMonth() > 8
          ? date.getMonth() + 1
          : "0" + (date.getMonth() + 1)) +
        "/" +
        (date.getDate() > 9 ? date.getDate() : "0" + date.getDate()) +
        "/" +
        (date.getFullYear() == 1 ? 1900 : date.getFullYear())
      );
    }
  }
  CheckItemExpGranularity() {
    return this.displayCycleCountItem &&
      this.displayCycleCountItem.ItmExpDateGranularity != "None"
      ? false
      : true;
  }
  onQuantityChange($event) {
    if ($event == "0") {
      this.daterequired = false;
      this.disabledatecomponent(true);
      this.toggleredborderfornonfirstitem(true);
      if (!this.isMultiLocation) this.DisableActionButtons(false);
    } else {
      this.disabledatecomponent(false);
      let eventdate = new Date(this.datepicker && this.datepicker.selectedDate);
      if (
        this.datepicker &&
        (this.datepicker.selectedDate === null ||
          this.datepicker.selectedDate === "//" ||
          this.datepicker.selectedDate === "")
      ) {
        this.DisableActionButtons(true);
        this.toggleredborderfornonfirstitem(false);
      } else if (
        this.isdateexpired(this.datepicker && this.datepicker.selectedDate)
      ) {
        this.toggleredborderfornonfirstitem(false);
      } else if (
        isNaN(eventdate.getTime()) &&
        this.displayCycleCountItem.ItmExpDateGranularity !== "None"
      ) {
        this.DisableActionButtons(true);
        this.toggleredborderfornonfirstitem(false);
      }
    }
  }

  onDateChange($event) {
    if ($event === "" || $event === null) {
      this.daterequired = true;
    } else {
      let dateReg = /^\d{2}([./-])\d{2}\1\d{4}$/;
      if ($event.match(dateReg)) {
        let eventdate = new Date($event);
        if (!(this.validateDate($event)) || isNaN(eventdate.getTime())) {
          this.daterequired = true;
          this.DisableActionButtons(true);
          this.toggleredborderfornonfirstitem(false);
        }
        else if (this.isdateexpired($event)) {
          if (!(this.validateDate($event)) || !(this.checkforvalidyear($event))) {
            this.daterequired = true;
            this.DisableActionButtons(true);
            this.toggleredborderfornonfirstitem(false);
          }
          else {
            this.daterequired = true;
            this.toggleredborderfornonfirstitem(false);
            this.DisableActionButtons(false);
          }
        } else if (isNaN(eventdate.getTime())) {
          this.DisableActionButtons(true);
        } else {
          this.daterequired = false;
          this.DisableActionButtons(false);
          this.toggleredborderfornonfirstitem(true);
        }
      } else {
        this.daterequired = true;
        this.DisableActionButtons(true);
      }
    }
  }

  validateDate(input) {
    const date = new Date(input);
    input = input.split('/');
    return date.getMonth() + 1 === +input[0] &&
      date.getDate() === +input[1] &&
      date.getFullYear() === +input[2];
  }

  checkforvalidyear(input) {
    const date = new Date(input);
    input = input.split('/');
    if (date.getFullYear() > 99 && date.getFullYear() < 1753) {
      return false;
    }
    else {
      return true;
    }
  }

  Continue() {
    if (this.ItemDescriptionOverlap) {
      this.ItemDescriptionOverlap = false;
    }
    if (this.displayCycleCountItem != null) {
      let expireddate = null,
        actualexpiradationdate = null;
      expireddate = new Date(
        this.displayCycleCountItem.ExpirationDateFormatted
      );
      if (this.displayCycleCountItem.ItmExpDateGranularity === "Month") {
        actualexpiradationdate =
          this.displayCycleCountItem.QuantityOnHand !== 0
            ? new Date(expireddate.getFullYear(), expireddate.getMonth() + 1, 0)
            : null;
      } else {
        actualexpiradationdate =
          this.displayCycleCountItem.QuantityOnHand !== 0
            ? new Date(expireddate)
            : null;
      }
      let update = new deviceCycleCountItemUpdate({
        DeviceLocationId: this.displayCycleCountItem.DeviceLocationId,
        ItemId: this.displayCycleCountItem.ItemId,
        ExpirationDate: actualexpiradationdate,
        QuantityOnHand: this.displayCycleCountItem.QuantityOnHand,
        BarCodeFormat: "UN",
        ProductID: "0090192121",
        OriginalQuantityOnHand: this.originalQunatityOnHand,
        OriginalExpirationDate: this.originalExpirationDate
      });

      let deviceId: string = this.displayCycleCountItem.DeviceId.toString();
      let itemId = this.displayCycleCountItem.ItemId;
      this.guidedManualCycleCountServiceService.post(deviceId, update).subscribe(res => {
        console.log(res);
        if (res === 3) {
          this.displayConcurrencyDialog(itemId);
        }
        else {
          if (this.displayCycleCountItem) {
            if (this.displayCycleCountItem.DeviceLocationTypeId === DeviceLocationTypeId.Carousel) {
              this.carouselLocationAccessService
                .clearLightbar(this.displayCycleCountItem.DeviceId)
                .subscribe();
            }
            if (this.canDone === true) {
              this.wpfActionController.ExecuteBackAction();
            }
          }
        }
      });
    }
  }

  navigateContinue() {
    this.canDone = true;
    this.Continue();
  }

  navigateBack() {
    if (this.displayCycleCountItem != undefined) {
      if (
        this.displayCycleCountItem.DeviceLocationTypeId ===
        DeviceLocationTypeId.Carousel
      ) {
        this.carouselLocationAccessService
          .clearLightbar(this.displayCycleCountItem.DeviceId)
          .subscribe();
      }
    }
    this.wpfActionController.ExecuteBackAction();
  }

  navigateSamePage() {
    if (this.displayCycleCountItem != undefined) {
      if (
        this.displayCycleCountItem.DeviceLocationTypeId ===
        DeviceLocationTypeId.Carousel
      ) {
        this.carouselLocationAccessService
          .clearLightbar(this.displayCycleCountItem.DeviceId)
          .subscribe();
      }
    }
    if (this.displayCycleCountItem != undefined) {
      this.displayCycleCountItem = null;
    }
    this.DisableActionButtons(true);
  }

  handleDeviceLocationAccessResult(
    deviceLocaitonAccessResult: DeviceLocationAccessResult
  ) {
    if (
      deviceLocaitonAccessResult == DeviceLocationAccessResult.LeaseNotAvailable
    ) {
      let leaseDeniedMessage$ = this.translateService.get(
        "LEASE_DENIED_MESSAGE",
        { deviceDescription: this.displayCycleCountItem.DeviceDescription }
      );
      forkJoin(this._leaseDeniedTitle$, leaseDeniedMessage$).subscribe((r) => {
        let leaseDeniedPopup = this.displayError("Lease-Denied", r[0], r[1]);
        merge(
          leaseDeniedPopup.didClickCloseButton,
          leaseDeniedPopup.didClickPrimaryButton
        ).subscribe(() => this.navigateSamePage());
      });
    }

    if (
      deviceLocaitonAccessResult == DeviceLocationAccessResult.LeaseNotRequested
    ) {
      this.navigateSamePage();
    }

    if (deviceLocaitonAccessResult == DeviceLocationAccessResult.Failed) {
      this.carouselFaulted = true;
    } else {
      this.carouselFaulted = false;
    }
  }

  handleLeaseBusyChanged(isBusy: boolean) {
    if (isBusy) {
      this.leaseBusyPopup$ = this.leaseBusyTitle$.pipe(
        map((x) => this.showLeaseDialog(x)),
        shareReplay(1)
      );
      this.leaseBusyPopup$.subscribe();
    } else {
      this.leaseBusyPopup$.subscribe((x) => x.onCloseClicked());
    }
  }

  showLeaseDialog(title: string): PopupDialogComponent {
    const properties = new PopupDialogProperties("Lease-Busy");
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
    this.translateService.get("OK").subscribe((result) => {
      properties.primaryButtonText = result;
    });
    properties.titleElementText = title;
    properties.messageElementText = message;
    properties.showPrimaryButton = true;
    properties.showSecondaryButton = false;
    properties.dialogDisplayType = PopupDialogType.Error;
    properties.timeoutLength = 0;
    return this.dialogService.showOnce(properties);
  }

  multipleLocationItem(x: IGuidedManualCycleCountItemid[], eventData: any) {
    for (let i = 0; i < x.length; i++) {
      if (x[i].LocationDescription === eventData) {
        this.deviceId = x[i].DeviceId;
        this.hardwareLeaseService
          .getDeviceConfiguration(this.deviceId)
          .subscribe((res) => {
            console.log(res);
            this.devicePrinterName = res.PrinterName;
          });
        this.disablethedate = false;
        this.displayCycleCountItem = x[i];
        this.isSelected = true;
        let date = new Date(x[i].ExpirationDate);
        this.displayCycleCountItem.InStockQuantity = x[i].QuantityOnHand;
        this.originalQunatityOnHand = x[i].QuantityOnHand;
        this.originalExpirationDate = x[i].ExpirationDate;
        this.displayCycleCountItem.ExpirationDateFormatted =
          date.getFullYear() == 1
            ? ""
            : (date.getMonth() > 8
              ? date.getMonth() + 1
              : "0" + (date.getMonth() + 1)) +
            "/" +
            (date.getDate() > 9 ? date.getDate() : "0" + date.getDate()) +
            "/" +
            (date.getFullYear() == 1 ? 1900 : date.getFullYear());
        this.CycleCountValidation();
      }
    }
  }

  onSelectionChanged($event) {
    if ($event != "" && $event != null) {
      if (
        this.displayCycleCountItem.DeviceLocationTypeId ===
        DeviceLocationTypeId.Carousel
      ) {
        this.carouselLocationAccessService
          .clearLightbar(this.displayCycleCountItem.DeviceId)
          .subscribe();
      }
      let eventData = $event.value;
      if (this.cycleCountItems != undefined) {
        this.displayCycleCountItem.ExpirationDateFormatted = "";
        this.sub1 = this.cycleCountItems.subscribe(
          (x) => {
            if (x.length > 0) {
              this.multipleLocationItem(x, eventData);
            }
          },
          () => {
            this.toggleredborderforfirstitem();
            Util.setByTabIndex(this.numericindexes[1]);
          },
          () => {
            this.toggleredborderforfirstitem();
            Util.setByTabIndex(this.numericindexes[1]);
          }
        );
      }
    }
  }

  displayUnknownItemDialog(itemId: string): boolean {
    this.over = true;
    const properties = new PopupDialogProperties("Role-Status-Warning");
    this.translateService.get("UNKNOWNITEM_HEADER_TEXT").subscribe((result) => {
      properties.titleElementText = result;
    });
    this.translateService
      .get("UNKNOWNITEM_BODY_TEXT", { itemId: itemId })
      .subscribe((result) => {
        properties.messageElementText = result;
      });
    this.translateService.get("OK").subscribe((result) => {
      properties.primaryButtonText = result;
    });
    properties.showPrimaryButton = true;
    properties.showSecondaryButton = false;
    properties.dialogDisplayType = PopupDialogType.Error;
    properties.timeoutLength = this.popupTimeoutSeconds;
    this.popupDialog = this.dialogService.showOnce(properties);

    this.popupDialogClose$ = this.popupDialog.didClickCloseButton.subscribe(
      () => {
        this.over = false;
      }
    );
    this.popupDialogPrimaryClick$ = this.popupDialog.didClickPrimaryButton.subscribe(
      () => {
        this.over = false;
      }
    );
    this.popupDialogTimeoutDialog$ = this.popupDialog.didTimeoutDialog.subscribe(
      () => {
        this.over = false;
      }
    );
    return this.over;
  }

  HasLabelPrinterConfigured(): boolean {
    if (
      (this.devicePrinterName !== null && this.devicePrinterName.length > 0) ||
      (this.labelPrinterName !== null && this.labelPrinterName.length > 0)
    ) {
      return true;
    } else {
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
      UnitOfIssue: this.displayCycleCountItem.Units,
    });
    this.guidedManualCycleCountServiceService
      .PrintLabel(this.deviceId, this.displayPrintLabel)
      .subscribe(
        (res) => {
          if (res) {
            this.printResult = true;
            this.displaySuccessToSaveDialog();
          } else {
            this.printResult = false;
            this.displayFailedToSaveDialog();
          }
        },
        (err) => {
          console.error(HttpErrorResponse, err);
        }
      );
  }
  displaySuccessToSaveDialog(): void {
    const properties = new PopupDialogProperties("Role-Status-Info");
    this.translateService
      .get("PRINTSUCCESSFUL_HEADER_TEXT")
      .subscribe((result) => {
        properties.titleElementText = result;
      });
    this.translateService
      .get("PRINTSUCCESSFUL_BODY_TEXT")
      .subscribe((result) => {
        properties.messageElementText = result;
      });
    this.translateService.get("OK").subscribe((result) => {
      properties.primaryButtonText = result;
    });
    properties.showPrimaryButton = true;
    properties.showSecondaryButton = false;
    properties.dialogDisplayType = PopupDialogType.Info;
    properties.timeoutLength = this.popupTimeoutSeconds;
    this.dialogService.showOnce(properties);
  }
  displayFailedToSaveDialog(): void {
    const properties = new PopupDialogProperties("Role-Status-Error");
    this.translateService.get("PRINTFAILED_HEADER_TEXT").subscribe((result) => {
      properties.titleElementText = result;
    });
    this.translateService.get("PRINTFAILED_BODY_TEXT").subscribe((result) => {
      properties.messageElementText = result;
    });
    this.translateService.get("OK").subscribe((result) => {
      properties.primaryButtonText = result;
    });
    properties.showPrimaryButton = true;
    properties.showSecondaryButton = false;
    properties.dialogDisplayType = PopupDialogType.Error;
    properties.timeoutLength = this.popupTimeoutSeconds;
    this.dialogService.showOnce(properties);
  }
  displayWrongBarCodeDialog(): boolean {
    this.over = true;
    const properties = new PopupDialogProperties("INVALID_SCAN_BARCODE");
    this.translateService
      .get("INVALID_SCAN_BARCODE_HEADER")
      .subscribe((result) => {
        properties.titleElementText = result;
      });

    this.translateService.get("INVALID_SCAN_BARCODE").subscribe((result) => {
      properties.messageElementText = result;
    });


    this.translateService.get('OK').subscribe((result) => {
      properties.primaryButtonText = result;
    });

    properties.showPrimaryButton = true;
    properties.showSecondaryButton = false;
    properties.dialogDisplayType = PopupDialogType.Warning;
    properties.timeoutLength = this.popupTimeoutSeconds;
    this.popupDialog = this.dialogService.showOnce(properties);

    this.popupDialogClose$ = this.popupDialog.didClickCloseButton.subscribe(
      () => {
        this.over = false;
      }
    );
    this.popupDialogPrimaryClick$ = this.popupDialog.didClickPrimaryButton.subscribe(
      () => {
        this.over = false;
      }
    );
    this.popupDialogTimeoutDialog$ = this.popupDialog.didTimeoutDialog.subscribe(
      () => {
        this.over = false;
      }
    );
    return this.over;
  }

  closePopup() {
    this.popupDialog && this.popupDialog.onCloseClicked();
  }

  ScanValidation(): boolean {
    this.transaction = false;
    var dateReg = /^\d{2}([./-])\d{2}\1\d{4}$/;
    console.log(this.displayCycleCountItem.QuantityOnHand);
    if (this.displayCycleCountItem.QuantityOnHand == 0) {
      this.transaction = true;
    } else if (
      this.displayCycleCountItem &&
      this.displayCycleCountItem.ItmExpDateGranularity === "None"
    ) {
      this.transaction = true;
    } else {
      var eventdate = new Date(this.datepicker && this.datepicker.selectedDate);
      if (
        this.datepicker &&
        (this.datepicker.selectedDate === null ||
          this.datepicker.selectedDate === "//" ||
          this.datepicker.selectedDate === "")
      ) {
        this.DisableActionButtons(true);
        this.toggleredborderfornonfirstitem(false);
        this.transaction = false;
      } else if (
        this.datepicker &&
        !this.datepicker.selectedDate.match(dateReg)
      ) {
        this.DisableActionButtons(true);
        this.transaction = false;
      }
      else {
        this.transaction = true;
      }

    }
    return this.transaction;
  }

  // Scanned barcode event listener for use in Cef
  processScannedBarcode(scannedBarcode: string): void {
    if (this.over) {
      this.closePopup();
    }
    //this.isSelected = false;
    this.barcodeScanService.reset();
    this.rawBarcodeMessage = scannedBarcode;
    this.scanCycleCountItem(scannedBarcode);
  }
  scanCycleCountItem(scannedBarcode: string): void {
    let transactionValid = true;
    let itemID = "";
    if (
      this.displayCycleCountItem &&
      this.displayCycleCountItem !== undefined
    ) {
      console.log(this.ScanValidation());
      transactionValid = this.ScanValidation();
    }
    this.rawBarcodeMessage = scannedBarcode;
    if (transactionValid) {
      this.guidedManualCycleCountServiceService
        .ValidCycleCountScanBarCode(itemID, this.rawBarcodeMessage)
        .subscribe((res) => {
          console.log(res);
          this.scanItem = res;
          if (this.scanItem === null || this.scanItem.length === 0) {
            this.displayWrongBarCodeDialog();
          }
          else if (this.scanItem.length != 0 || this.scanItem != null) {
            this.onLocationBasedValidation();
            console.log(this.scanItem && this.scanItem);
            this.getCycleCountData(this.scanItem && this.scanItem);
          }
        });
    }
  }

  onLocationBasedValidation() {
    if (this.isSingleSelectEnable && this.isSelected) {
      this.Continue();
      this.displayCycleCountItem = null;
    } else if (!this.isSingleSelectEnable) {
      this.Continue();
      this.displayCycleCountItem = null;
    } else {
      this.displayCycleCountItem = null;
    }
  }

  // Page Level Listener for barcode scanner
  @HostListener("document:keypress", ["$event"]) onKeypressHandler(
    event: KeyboardEvent
  ) {
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
      if (
        this.barcodeScanService.BarcodeInputCharacters &&
        this.barcodeScanService.BarcodeInputCharacters.length !== 1
      ) {
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
    this.rawBarcodeMessage = "";
  }

  hookupEventHandlers(): void {
    if (this.isInvalid(this.barcodeScanService)) {
      return;
    }

    this.barcodeScannedSubscription =
      this.barcodeScanService.BarcodeScannedSubject &&
      this.barcodeScanService.BarcodeScannedSubject.subscribe(
        (scannedBarcode: string) => this.processScannedBarcode(scannedBarcode)
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

  displayPackagerAssignItemDialog(
    itemId: string,
    deviceDescription: string[]
  ): boolean {
    this.over = true;
    const properties = new PopupDialogProperties("Role-Status-Warning");
    this.translateService
      .get("PACKAGER_ASSIGNITEM_HEADER_TEXT")
      .subscribe((result) => {
        properties.titleElementText = result;
      });
    this.translateService
      .get("PACKAGER_ASSIGNITEM_BODY_TEXT")
      .subscribe((result) => {
        properties.messageElementText = result;
      });
    for (let i = 0; i < deviceDescription.length; i++) {
      this.translateService
        .get("PACKAGER_ASSIGNITEM_BODY_DEVICES_TEXT", {
          itemId: itemId,
          deviceDescription: deviceDescription[i],
        })
        .subscribe((result) => {
          properties.messageElementText += result;
        });
    }
    properties.showPrimaryButton = true;
    properties.showSecondaryButton = false;
    properties.primaryButtonText = "OK";
    properties.dialogDisplayType = PopupDialogType.Error;
    properties.timeoutLength = this.popupTimeoutSeconds;
    this.popupDialog = this.dialogService.showOnce(properties);

    this.popupDialogClose$ = this.popupDialog.didClickCloseButton.subscribe(
      () => {
        this.over = false;
      }
    );
    this.popupDialogPrimaryClick$ = this.popupDialog.didClickPrimaryButton.subscribe(
      () => {
        this.over = false;
      }
    );
    this.popupDialogTimeoutDialog$ = this.popupDialog.didTimeoutDialog.subscribe(
      () => {
        this.over = false;
      }
    );
    return this.over;
  }

  displayConcurrencyDialog(itemId: string): void {
    const properties = new PopupDialogProperties('CycleCount_Concurrency_ConflictDialogTitle');
    this.translateService.get('CycleCount_Concurrency_ConflictDialogTitle').subscribe(result => { properties.titleElementText = result; });
    this.translateService.get('CycleCount_Concurrency_UpdateConflictMsg').subscribe(result => { properties.messageElementText = result; });
    this.translateService.get('OK').subscribe(result => { properties.primaryButtonText = result; });
    properties.showPrimaryButton = true;
    properties.showSecondaryButton = false;
    properties.dialogDisplayType = PopupDialogType.Info;
    properties.timeoutLength = this.popupTimeoutSeconds;
    this.popupConcurrencyDialog = this.dialogService.showOnce(properties);
    this.popupConcurrencyDialogClose$ = this.popupConcurrencyDialog.didClickCloseButton.subscribe(() => {
    });
    this.popupConcurrencyDialogPrimaryClick$ = this.popupConcurrencyDialog.didClickPrimaryButton.subscribe(() => {
      this.displayCycleCountItem = null;
      this.getCycleCountData(itemId);
    });
    this.popupConcurrencyDialogTimeout$ = this.popupConcurrencyDialog.didTimeoutDialog.subscribe(() => {
      this.displayCycleCountItem = null;
      this.getCycleCountData(itemId);
    })
  }
}
