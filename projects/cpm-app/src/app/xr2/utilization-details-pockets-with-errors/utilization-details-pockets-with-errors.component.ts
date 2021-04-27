import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { finalize, catchError, map, shareReplay, tap, takeUntil, filter } from 'rxjs/operators';
import { IDestockTypeInfo } from '../../api-xr2/data-contracts/i-destock-type-info';
import { DestockService } from '../../api-xr2/services/destock.service';
import { nameof } from '../../shared/functions/nameof';
import { SelectableDeviceInfo } from '../../shared/model/selectable-device-info';
import { DestockTypeInfo } from '../model/destock-type-info';
import { IXr2QueuePageConfiguration } from '../../shared/interfaces/i-xr2-queue-page-configuration';
import { ISelectableDeviceInfo } from '../../shared/model/i-selectable-device-info';
import { IErroredMedicationInfoDetail } from '../../api-xr2/data-contracts/i-utilization-errored-medication-info-detail';
import { UtilizationDeailsService } from '../services/utilization-details.service';

@Component({
  selector: 'app-utilization-details-pockets-with-errors',
  templateUrl: './utilization-details-pockets-with-errors.component.html',
  styleUrls: ['./utilization-details-pockets-with-errors.component.scss']
})
export class DetailsPocketsWithErrors implements OnInit {
  @Input() selectedDeviceInformation: ISelectableDeviceInfo;
  @Input() savedPageConfiguration: IXr2QueuePageConfiguration;

  pocketsWithErrors$: Observable<IErroredMedicationInfoDetail[]>;

  requestDeviceDestockTypeInfo$: Observable<number> ;
  detailInfo: DestockTypeInfo[];
  searchTextFilter: string;
  currentSortPropertyName: string;
  ngUnsubscribe = new Subject();

  searchFields = [
    nameof<IDestockTypeInfo>('Xr2DestockType_Display'),
  ];

  constructor( utilizationDeailsService: UtilizationDeailsService) {
      this.pocketsWithErrors$ = utilizationDeailsService.pocketsWithErrors(this.selectedDeviceInformation.DeviceId).pipe(shareReplay(1));
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

}
