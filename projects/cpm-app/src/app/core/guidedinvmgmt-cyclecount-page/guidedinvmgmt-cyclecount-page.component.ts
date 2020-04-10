import { Component, OnInit, Output, EventEmitter, AfterViewInit, ViewChild } from '@angular/core';
import { map, shareReplay, filter, single, pluck, count } from 'rxjs/operators';
import * as _ from 'lodash';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, forkJoin } from 'rxjs';
import { NumericComponent, DatepickerComponent ,ValidationBadgeComponent} from '@omnicell/webcorecomponents';
import { IGuidedCycleCount } from '../../api-core/data-contracts/i-guided-cycle-count';
import { GuidedCycleCountService } from '../../api-core/services/guided-cycle-count-service';
import { GuidedCycleCount } from '../model/guided-cycle-count';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { deviceCycleCountItemUpdate } from '../../api-core/data-contracts/guided-cycle-count-update';
import { stringify } from 'querystring';
import { ValidationBadgeModule } from '@omnicell/webcorecomponents';
import { SystemMessageModule } from '@omnicell/webcorecomponents';

@Component({
  selector: 'app-guidedinvmgmt-cyclecount-page',
  templateUrl: './guidedinvmgmt-cyclecount-page.component.html',
  styleUrls: ['./guidedinvmgmt-cyclecount-page.component.scss']
})

export class GuidedInvMgmtCycleCountPageComponent implements OnInit {
  @ViewChild('numericEle', null) numericElement: NumericComponent;
  @ViewChild(DatepickerComponent, null) datepicker: DatepickerComponent;
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

  attrs = {
    nullCheck: null,
    required: false,
    disabled: false
  };
  ngOnInit() {
    var deviceId = this.activatedRoute.snapshot.queryParamMap.get('deviceId');
    this.getCycleCountData(deviceId);
  }

  getCycleCountData(deviceID) {
    this.cycleCountItems = this.guidedCycleCountService.get(deviceID).pipe(map(guidedCycleCountItems => {
      return guidedCycleCountItems.map(p => new GuidedCycleCount(p));
    }));
    this.cycleCountItems.subscribe(x => {
      if (x.length > 0 && x[0].ExpirationDate) {
        this.displayCycleCountItem = x[0];
        var date = new Date(x[0].ExpirationDate);
        var sample = this.displayCycleCountItem.ItmExpDateGranularity;
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
      var sample = this.displayCycleCountItem.ItmExpDateGranularity;
      this.currentItemCount++;
      if (this.currentItemCount == this.itemCount) {
        this.isLastItem = true;
      }
    }
  }
}
