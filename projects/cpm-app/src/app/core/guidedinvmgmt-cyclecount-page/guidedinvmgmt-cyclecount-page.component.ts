import { Component, OnInit, Output, EventEmitter, AfterViewInit, ViewChild, AfterViewChecked } from '@angular/core';
import { map, shareReplay, filter, single, pluck, count } from 'rxjs/operators';
import * as _ from 'lodash';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, forkJoin } from 'rxjs';
import { NumericComponent, DatepickerComponent, ButtonActionComponent, DateFormat } from '@omnicell/webcorecomponents';
import { IGuidedCycleCount } from '../../api-core/data-contracts/i-guided-cycle-count';
import { GuidedCycleCountService } from '../../api-core/services/guided-cycle-count-service';
import { GuidedCycleCount } from '../model/guided-cycle-count';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { deviceCycleCountItemUpdate } from '../../api-core/data-contracts/guided-cycle-count-update';
import { Button } from 'protractor';

@Component({
  selector: 'app-guidedinvmgmt-cyclecount-page',
  templateUrl: './guidedinvmgmt-cyclecount-page.component.html',
  styleUrls: ['./guidedinvmgmt-cyclecount-page.component.scss']
})

export class GuidedInvMgmtCycleCountPageComponent implements OnInit, AfterViewInit, AfterViewChecked {
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
    this.todaydate = this.time.getMonth() + "/" + this.time.getDate() + "/" + this.time.getFullYear();
  }

  ngOnInit() {
    var deviceId = this.activatedRoute.snapshot.queryParamMap.get('deviceId');
    this.getCycleCountData(deviceId);
  }
  ngAfterViewInit(): void {
  }

  ngAfterViewChecked() {
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
        this.displayCycleCountItem.ItemDateFormat = DateFormat.mmddyyyy_withslashes;
        this.displayCycleCountItem.ExpirationDateFormatted = (date.getFullYear() == 1) ? '' : ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + ((date.getFullYear() == 1) ? 1900 : date.getFullYear());
        this.cycleCountItemsCopy = x;
        x.splice(0, 1);
        this.itemCount = x.length + 1;
      }
      this.IsLastItem();
      this.currentItemCount++;
    });
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
      this.displayCycleCountItem.InStockQuantity = this.displayCycleCountItem.QuantityOnHand;
      this.displayCycleCountItem.ExpirationDateFormatted = (date.getFullYear() == 1) ? '' : ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + ((date.getFullYear() == 1) ? 1900 : date.getFullYear());
      this.currentItemCount++;
      if (this.currentItemCount == this.itemCount) {
        this.isLastItem = true;
      }
    }
  }

  onQuantityChange($event) {
    if ($event == "0") {
      this.daterequired = false;
      this.disablethedate = true;
      var element = document.getElementById("datepicker");
      element && element.classList.contains("ng-dirty") && element.classList.contains("ng-untouched") ? element.classList.remove("ng-dirty") : null;
      element && element.classList.contains("ng-invalid") && element.classList.contains("ng-untouched") ? element.classList.remove("ng-invalid") : null;
    }
    else {
      this.disablethedate = false;
      if (this.datepicker.selectedDate === null) {
        this.DisableActionButtons(true);
      }
      else {

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
        var eventdate = new Date($event).getTime();
        if (eventdate <= new Date().getTime() || isNaN(eventdate)) {
          this.daterequired = true;
          var element = document.getElementById("datepicker");
          if (element.classList.contains("ng-touched")
            || element.classList.contains("ng-untouched")) {
              element.classList.contains("ng-valid") ? element.classList.remove("ng-valid") : null;
              element.classList.contains("ng-invalid") ?null: element.classList.add("ng-invalid");
          }
          this.DisableActionButtons(false);
        }
        else {
          this.daterequired = false;
          this.DisableActionButtons(false);
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
}
