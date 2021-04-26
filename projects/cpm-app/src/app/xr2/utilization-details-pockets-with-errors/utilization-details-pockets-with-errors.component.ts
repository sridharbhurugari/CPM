import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { finalize, catchError, map, shareReplay, tap, takeUntil, filter } from 'rxjs/operators';
import { IDestockTypeInfo } from '../../api-xr2/data-contracts/i-destock-type-info';
import { DestockService } from '../../api-xr2/services/destock.service';
import { nameof } from '../../shared/functions/nameof';
import { SelectableDeviceInfo } from '../../shared/model/selectable-device-info';
import { DestockTypeInfo } from '../model/destock-type-info';
import { DestockEventConnectionService } from '../services/destock-event-connection.service';
import { WindowService } from '../../shared/services/window-service';
import { WpfInteropService } from '../../shared/services/wpf-interop.service';
import { IXr2QueuePageConfiguration } from '../../shared/interfaces/i-xr2-queue-page-configuration';

@Component({
  selector: 'app-utilization-details-pockets-with-errors',
  templateUrl: './utilization-details-pockets-with-errors.component.html',
  styleUrls: ['./utilization-details-pockets-with-errors.component.scss']
})
export class DetailsPocketsWithErrors implements OnInit {
  @Input() savedPageConfiguration: IXr2QueuePageConfiguration;
  selectedDeviceInformation: SelectableDeviceInfo;
  requestDeviceDestockTypeInfo$: Observable<number> ;
  detailInfo: DestockTypeInfo[];
  searchTextFilter: string;
  currentSortPropertyName: string;
  ngUnsubscribe = new Subject();

  searchFields = [
    nameof<IDestockTypeInfo>('Xr2DestockType_Display'),
  ];

  constructor(private destockService: DestockService,
    private destockEventConnectionService: DestockEventConnectionService) {
    }

  ngOnInit() {

    if(! this.selectedDeviceInformation)
    {
      this.selectedDeviceInformation = new SelectableDeviceInfo(null);
      this.selectedDeviceInformation.DeviceId = 0;
    }
    this.setDestockService();
   }
  /* istanbul ignore next */
  ngAfterViewInit(): void {
    this.destockEventConnectionService.DestockIncomingDataSubject
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(event => this.onDataReceived(event));
    this.destockEventConnectionService.DestockIncomingDataErrorSubject
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(event => this.onDataError(event));
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.complete();
    this.ngUnsubscribe.next();
  }

  onSearchTextFilterEvent(filterText: string) {
    this.searchTextFilter = filterText;
  }

}
