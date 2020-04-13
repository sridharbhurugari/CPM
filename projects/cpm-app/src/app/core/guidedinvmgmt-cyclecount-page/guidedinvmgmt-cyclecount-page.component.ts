import { Component, OnInit, Output, EventEmitter, AfterViewInit, ViewChild ,AfterViewChecked} from '@angular/core';
import { map, shareReplay, filter, single, pluck, count } from 'rxjs/operators';
import * as _ from 'lodash';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, forkJoin } from 'rxjs';
import { NumericComponent, DatepickerComponent , ButtonActionComponent} from '@omnicell/webcorecomponents';
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

export class GuidedInvMgmtCycleCountPageComponent implements OnInit,AfterViewInit,AfterViewChecked {
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

  }

  attrs = {
    nullCheck: null,
    required: false,
    disabled: false
  };
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
        this.displayCycleCountItem.ExpirationDateFormatted = (date.getFullYear() == 1) ? '' :((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + ((date.getFullYear() == 1) ? 1900 : date.getFullYear());
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

  IsLastItem()
  {
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
      let update = new deviceCycleCountItemUpdate({
        DeviceLocationId: this.displayCycleCountItem.DeviceLocationId,
        ItemId: this.displayCycleCountItem.ItemId,
        ExpirationDate: this.displayCycleCountItem.ExpirationDateFormatted != 'mm/dd/yyyy' ? new Date(this.displayCycleCountItem.ExpirationDateFormatted) : null,
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
      this.displayCycleCountItem.ExpirationDateFormatted = (date.getFullYear() == 1) ? '' :((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + ((date.getFullYear() == 1) ? 1900 : date.getFullYear());
      this.currentItemCount++;
      if (this.currentItemCount == this.itemCount) {
        this.isLastItem = true;
      }
    }
  }

  onQuantityChange($event){
    if(!this.CheckItemExpGranularity())
    {
    if($event=== "0")
    {
      this.datepicker.selectedDate = null;
      this.datepicker.isRequired=false;
    }
    else if(this.datepicker.selectedDate === null)
    {
      this.datepicker.isRequired=true;
      this.DisableActionButtons(true);
    }
    else
    {
      this.DisableActionButtons(false);
    }
  }
  }

  onDateChange($event){
    var valueQuanity = this.numericElement.displayValue;
    if($event === null || valueQuanity === "0")
    {
      this.DisableActionButtons(true);
    }
    else 
    {
      this.DisableActionButtons(false);
    }
  }

  DisableActionButtons(value : boolean)
  {
    if( this.isLastItem !== true) this.nextButtonDisable = value;
    if( this.isLastItem === true) this.doneButtonDisable = value;
  }

  CheckItemExpGranularity()
  {
    return this.displayCycleCountItem && this.displayCycleCountItem.ItmExpDateGranularity !== "None" ? false : true;
  }
}
