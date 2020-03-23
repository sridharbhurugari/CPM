import { Component, OnInit, Output, EventEmitter,AfterViewInit, ViewChild } from '@angular/core';
import { map, shareReplay, filter, single, pluck, count } from 'rxjs/operators';
import * as _ from 'lodash';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, forkJoin } from 'rxjs';
import { NumericComponent, DatepickerComponent } from '@omnicell/webcorecomponents';
import { IGuidedCycleCount } from '../../api-core/data-contracts/i-guided-cycle-count';
import { GuidedCycleCountService } from '../../api-core/services/guided-cycle-count-service';
import { GuidedCycleCount } from '../model/guided-cycle-count';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { deviceCycleCountItemUpdate } from '../../api-core/data-contracts/guided-cycle-count-update';


@Component({
  selector: 'app-guidedinvmgmt-cyclecount-page',
  templateUrl: './guidedinvmgmt-cyclecount-page.component.html',
  styleUrls: ['./guidedinvmgmt-cyclecount-page.component.scss']
})

export class GuidedInvMgmtCycleCountPageComponent implements OnInit, AfterViewInit {
  @ViewChild('numericEle', null) numericElement: NumericComponent;
  @ViewChild(DatepickerComponent, null) datepicker: DatepickerComponent;
  @Output() selectedDateChange: EventEmitter<string> = new EventEmitter<string>();
  displayCycleCountItem: IGuidedCycleCount;
  cycleCountItems: Observable<IGuidedCycleCount[]>;
  cycleCountItemsCopy: IGuidedCycleCount[];
  itemCount: number;
  isLastItem: boolean;
  currentItemCount: number;
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
  }


  ngOnInit() {
    var deviceId = this.activatedRoute.snapshot.queryParamMap.get('deviceId');
    this.getCycleCountData(deviceId);
  }

  getCycleCountData(deviceID) {
    this.cycleCountItems = this.guidedCycleCountService.get(deviceID).pipe(map(guidedCycleCountItems => {
      return guidedCycleCountItems.map(p => new GuidedCycleCount(p));
    }));
    this.cycleCountItems.subscribe(x => {
      if (x.length > 0 && x[0].ExpirationDate != null) {
        this.displayCycleCountItem = x[0];
        this.cycleCountItemsCopy = x;
        x.splice(0,1);
        this.itemCount = x.length + 1;
      }
      if (this.itemCount >= 1) {
        this.isLastItem = true;
      }
      else {
        this.isLastItem = false;
      }
      this.currentItemCount++;
    });
  }

  showValidComponent() {
    return this.displayCycleCountItem && this.cycleCountItemsCopy.length > 1;
  }

  ngAfterViewInit() {
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

  onDateChange($event) {
    var newDate = $event.returnValue;
    console.log(newDate);
  }
  
  navigateContinue() {
    var updateSucceeded = false;
    if (this.displayCycleCountItem != null) {
      let update = new deviceCycleCountItemUpdate({
        DeviceLocationId: this.displayCycleCountItem.DeviceLocationId,
        ItemId: this.displayCycleCountItem.ItemId,
        ExpirationDate: this.displayCycleCountItem.ExpirationDate != null ? this.displayCycleCountItem.ExpirationDate : new Date(),
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
      this.currentItemCount++;
      if (this.currentItemCount == this.itemCount) {
        this.isLastItem = true;
      }
    }
  }
}
