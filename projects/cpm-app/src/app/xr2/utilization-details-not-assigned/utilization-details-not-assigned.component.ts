import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { finalize, catchError, map, shareReplay, tap, takeUntil, filter } from 'rxjs/operators';
import { nameof } from '../../shared/functions/nameof';
import { SelectableDeviceInfo } from '../../shared/model/selectable-device-info';
import { IUnassignedMedicationInfoDetail } from '../../api-xr2/data-contracts/i-utilization-unassigned-medication-info-detail';
import { UtilizationDetailsService } from '../services/utilization-details.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DevicesService } from '../../api-core/services/devices.service';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import * as _ from 'lodash';

@Component({
  selector: 'app-utilization-details-not-assigned',
  templateUrl: './utilization-details-not-assigned.component.html',
  styleUrls: ['./utilization-details-not-assigned.component.scss']
})
export class DetailsNotAssignedComponent implements OnInit {
  device$: Observable<SelectableDeviceInfo>;

  // Grid, Search and Sort:
  gridData$: Observable<IUnassignedMedicationInfoDetail[]>;
  searchTextFilter: string;
  searchFields = ['ItemCode'];
  currentSortPropertyName: string = 'ItemCode';

  ngUnsubscribe = new Subject();

  constructor( utilizationDetailsService: UtilizationDetailsService,
    devicesService: DevicesService,
    private router: Router,
    activatedRoute: ActivatedRoute) {
    const deviceId = Number.parseInt(activatedRoute.snapshot.paramMap.get('deviceId'));

    this.device$ = devicesService.getAllXr2Devices().pipe(shareReplay(1), map((devices: SelectableDeviceInfo[]) => devices.find(d => d.DeviceId === deviceId)));
    this.gridData$ = utilizationDetailsService.notAssigned(deviceId).pipe(shareReplay(1)).pipe(map(d => {
      return _.orderBy(d, x => x[this.currentSortPropertyName]);
    }));
    }

  ngOnInit() {
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
      return _.orderBy(d, x => x[this.currentSortPropertyName], event.SortDirection);
    }));
  }
}
