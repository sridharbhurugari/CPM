import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { finalize, catchError, map, shareReplay, tap, takeUntil, filter } from 'rxjs/operators';
import { nameof } from '../../shared/functions/nameof';
import { SelectableDeviceInfo } from '../../shared/model/selectable-device-info';
import { IExpiringMedicationInfoDetail } from '../../api-xr2/data-contracts/i-utilization-expiring-medication-info-detail';
import { UtilizationDetailsService } from '../services/utilization-details.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DevicesService } from '../../api-core/services/devices.service';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import * as _ from 'lodash';
import { GridComponent } from '@omnicell/webcorecomponents';

@Component({
  selector: 'app-utilization-expiring-this-month',
  templateUrl: './utilization-details-expiring-this-month.component.html',
  styleUrls: ['./utilization-details-expiring-this-month.component.scss']
})
export class DetailsExpiringThisMonthComponent implements OnInit {
  device$: Observable<SelectableDeviceInfo>;
  @ViewChild("ocgrid", { static: false }) ocGrid: GridComponent;
   // Grid, Search and Sort:
   gridData$: Observable<IExpiringMedicationInfoDetail[]>;
   searchTextFilter: string;
   searchFields = ['ItemId', 'ItemDescription'];
   currentSortPropertyName: string = 'ItemDescription';

   ngUnsubscribe = new Subject();

   constructor( utilizationDetailsService: UtilizationDetailsService,
    devicesService: DevicesService,
    private router: Router,
    activatedRoute: ActivatedRoute) {
    const deviceId = Number.parseInt(activatedRoute.snapshot.paramMap.get('deviceId'));

    this.device$ = devicesService.getAllXr2Devices().pipe(shareReplay(1), map((devices: SelectableDeviceInfo[]) => devices.find(d => d.DeviceId === deviceId)));
    this.gridData$ = utilizationDetailsService.expiringThisMonth(deviceId).pipe(shareReplay(1)).pipe(map(d => {
      return _.orderBy(d, x => x.ItemDescription.toLocaleLowerCase());
    }));
    }

    ngOnInit() {
      this.resizeGrid();
    }

   ngOnDestroy(): void {
     this.ngUnsubscribe.complete();
     this.ngUnsubscribe.next();
   }

   onSearchTextFilterEvent(filterText: string) {
    this.searchTextFilter = filterText;
  }
  onBackClick() {
    this.router.navigate(['xr2/utilization']);
  }

  columnSelected(event: IColHeaderSortChanged){
    this.currentSortPropertyName = event.ColumnPropertyName;
    this.gridData$ = this.gridData$.pipe(map(d => {
      if (this.currentSortPropertyName == 'ItemDescription'){
      return _.orderBy(d, x => x.ItemDescription.toLocaleLowerCase(), event.SortDirection);
      }
      else
      {
      return _.orderBy(d, x => x[this.currentSortPropertyName], event.SortDirection);
      }
    }));
  }

  private resizeGrid() {
    setTimeout(() => {
      if (this.ocGrid) {
        this.ocGrid.checkTableBodyOverflown();
      }
    }, 250);
  }
}
