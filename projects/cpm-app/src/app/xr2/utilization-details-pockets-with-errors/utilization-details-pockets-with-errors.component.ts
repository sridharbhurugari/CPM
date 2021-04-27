import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { finalize, catchError, map, shareReplay, tap, takeUntil, filter } from 'rxjs/operators';
import { IDestockTypeInfo } from '../../api-xr2/data-contracts/i-destock-type-info';
import { nameof } from '../../shared/functions/nameof';
import { SelectableDeviceInfo } from '../../shared/model/selectable-device-info';
import { DestockTypeInfo } from '../model/destock-type-info';
import { ISelectableDeviceInfo } from '../../shared/model/i-selectable-device-info';
import { IErroredMedicationInfoDetail } from '../../api-xr2/data-contracts/i-utilization-errored-medication-info-detail';
import { UtilizationDeailsService } from '../services/utilization-details.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DevicesService } from '../../api-core/services/devices.service';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-utilization-details-pockets-with-errors',
  templateUrl: './utilization-details-pockets-with-errors.component.html',
  styleUrls: ['./utilization-details-pockets-with-errors.component.scss']
})
export class DetailsPocketsWithErrors implements OnInit {
  gridData$: Observable<IErroredMedicationInfoDetail[]>;
  device$: Observable<SelectableDeviceInfo>;
  requestDeviceDestockTypeInfo$: Observable<number> ;
  detailInfo: DestockTypeInfo[];
  searchTextFilter: string;
  currentSortPropertyName: string;
  ngUnsubscribe = new Subject();

  searchFields = [
    nameof<IDestockTypeInfo>('Xr2DestockType_Display'),
  ];

  constructor( utilizationDeailsService: UtilizationDeailsService,
    devicesService: DevicesService,
    private router: Router,
    activatedRoute: ActivatedRoute) {
    const deviceId = Number.parseInt(activatedRoute.snapshot.paramMap.get('deviceId'));

    this.device$ = devicesService.getAllXr2Devices().pipe(shareReplay(1), map((devices: SelectableDeviceInfo[]) => devices.find(d => d.DeviceId === deviceId)));
    this.gridData$ = utilizationDeailsService.pocketsWithErrors(deviceId).pipe(
      tap({
        next: val =>    console.log('myService on next', val),
        error: error => console.log('myService on error', error.message),
        complete: () => console.log('myService on complete')
      })).pipe(shareReplay(1));
      //const gd = this.gridData$.subscribe();
      //console.log('gridData', gd);

    }

  ngOnInit() {
   }

  ngOnDestroy(): void {
    this.ngUnsubscribe.complete();
    this.ngUnsubscribe.next();
  }

  // private resizeGrid() {
  //   setTimeout(() => {
  //     if (this.ocGrid) {
  //       this.ocGrid.checkTableBodyOverflown();
  //     }
  //   }, 250);
  // }

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
