import { Component, OnInit, Output, EventEmitter, ViewChild, AfterViewChecked } from '@angular/core';
import { map, shareReplay, filter, single, pluck, count } from 'rxjs/operators';
import * as _ from 'lodash';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, forkJoin } from 'rxjs';
import { NumericComponent, DatepickerComponent, ButtonActionComponent, DateFormat , Util} from '@omnicell/webcorecomponents';
import { IGuidedCycleCount } from '../../api-core/data-contracts/i-guided-cycle-count';
import { GuidedCycleCountService } from '../../api-core/services/guided-cycle-count-service';
import { GuidedCycleCount } from '../model/guided-cycle-count';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { deviceCycleCountItemUpdate } from '../../api-core/data-contracts/guided-cycle-count-update';
import { Button } from 'protractor';
import { CompileTemplateMetadata } from '@angular/compiler';

@Component({
  selector: 'app-guidedinvmgmt-cyclecount-page',
  templateUrl: './guidedinvmgmt-cyclecount-page.component.html',
  styleUrls: ['./guidedinvmgmt-cyclecount-page.component.scss']
})

export class GuidedInvMgmtCycleCountPageComponent implements OnInit, AfterViewChecked {
  @ViewChild(NumericComponent, null) numericElement: NumericComponent;
  @ViewChild(DatepickerComponent, null) datepicker: DatepickerComponent;
  @ViewChild(ButtonActionComponent, null) nextbutton: ButtonActionComponent;
  @ViewChild(ButtonActionComponent, null) cancelbutton: ButtonActionComponent;
  @ViewChild(ButtonActionComponent, null) donebutton: ButtonActionComponent;
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
  titleHeader = '\'GUIDED_CYCLE_COUNT\' | translate';
  route: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private guidedCycleCountService: GuidedCycleCountService,
    private wpfActionController: WpfActionControllerService
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
  }

  ngOnInit() {
    var deviceId = this.activatedRoute.snapshot.queryParamMap.get('deviceId');
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
        if (this.displayCycleCountItem.ExpirationDateFormatted === "" && this.displayCycleCountItem.QuantityOnHand  !== 0)
        this.DisableActionButtons(true);
        this.cycleCountItemsCopy = x;
        x.splice(0, 1);
        this.itemCount = x.length + 1;
      }
      this.IsLastItem();
      this.currentItemCount++;
    },
      (response) => { this.toggleredborderforfirstitem();Util.setByTabIndex(this.numericindexes[1]);},
      () => { this.toggleredborderforfirstitem(); Util.setByTabIndex(this.numericindexes[1]);}
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
      this.displayCycleCountItem.InStockQuantity = this.displayCycleCountItem.QuantityOnHand;
      this.displayCycleCountItem.ExpirationDateFormatted = (date.getFullYear() == 1) ? '' : ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + ((date.getFullYear() == 1) ? 1900 : date.getFullYear());
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
      else if (this.isdateexpired(this.datepicker.selectedDate)) {
        this.toggleredborderfornonfirstitem(false);
      }
      else if (isNaN(eventdate.getTime())) {
        this.DisableActionButtons(true);
        this.toggleredborderfornonfirstitem(false);
      }
    }
  }

  onDateChange($event) {
    var valueQuanity = this.numericElement && this.numericElement.displayValue;
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
    else if (this.isdateexpired(this.displayCycleCountItem && this.displayCycleCountItem.ExpirationDateFormatted)) {
      if (!(this.datepicker && this.datepicker.isDisabled))
        this.toggleredborderfornonfirstitem(false);
    }
  }
}
