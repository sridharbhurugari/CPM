import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { finalize, catchError, map, shareReplay, tap, takeUntil, filter } from 'rxjs/operators';
//import { IUtilizationPocketSummaryInfo } from '../../api-xr2/data-contracts/i-utilization-unassigned-medication-info';
import { UtilizationService } from '../../api-xr2/services/utilization.service';
import { nameof } from '../../shared/functions/nameof';
import { IXr2QueueNavigationParameters } from '../../shared/interfaces/i-xr2-queue-navigation-parameters';
import { IXr2QueuePageConfiguration } from '../../shared/interfaces/i-xr2-queue-page-configuration';
import { SelectableDeviceInfo } from '../../shared/model/selectable-device-info';
import { SimpleDialogService } from '../../shared/services/dialogs/simple-dialog.service';
import { UtilizationEventConnectionService } from '../services/utilization-event-connection.service';
import { UtilizationDataEvent } from '../model/utilization-data-event';
import { WindowService } from '../../shared/services/window-service';
import { WpfInteropService } from '../../shared/services/wpf-interop.service';

@Component({
  selector: 'app-utilization-page',
  templateUrl: './utilization-page.component.html',
  styleUrls: ['./utilization-page.component.scss']
})
export class UtilizationPageComponent implements OnInit {

  @Input() xr2QueueNavigationParameters: IXr2QueueNavigationParameters;
  @Input() savedPageConfiguration: IXr2QueuePageConfiguration;
  selectedDeviceInformation: SelectableDeviceInfo;
  requestDeviceUtilizationPocketSummaryInfo$: Observable<number> ;
  deviceUtilizationPocketSummaryInfo: any[];
  searchTextFilter: string;
  currentSortPropertyName: string;
  screenState: UtilizationPageComponent.ListState = UtilizationPageComponent.ListState.NoData;
  ngUnsubscribe = new Subject();
  lastErrorMessage: string;
  eventDateTime: Date;

  expiredLoaded: boolean = true;
  expiredItems: number = 0;
  expiredDoses: number = 0;

  expiringThisMonthLoaded: boolean = true;
  expiringThisMonthItems: number = 0;
  expiringThisMonthDoses: number = 0;

  notAssignedLoaded: boolean = true;
  notAssignedItems: number = 0;
  notAssignedDoses: number = 0;

  pocketsWithErrorsLoaded: boolean = true;
  pocketsWithErrorsItems: number = 0;
  pocketsWithErrorsDoses: number = 0;

  overstockedLoaded: boolean = true;
  overstockedItems: number = 0;
  overstockedDoses: number = 0;

  constructor(private utilizationService: UtilizationService,
    private simpleDialogService: SimpleDialogService,
    private utilizationEventConnectionService: UtilizationEventConnectionService,
    private windowService: WindowService,
    private wpfInteropService: WpfInteropService) {
      this.setupDataRefresh();
    }

  ngOnInit() {

    if(! this.selectedDeviceInformation)
    {
      this.selectedDeviceInformation = new SelectableDeviceInfo(null);
      this.selectedDeviceInformation.DeviceId = 0;
    }
    this.setUtilizationService();
   }
  /* istanbul ignore next */
  ngAfterViewInit(): void {
    this.utilizationEventConnectionService.UtilizationIncomingDataSubject
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(event => this.onDataReceived(event));
    this.utilizationEventConnectionService.UtilizationIncomingDataErrorSubject
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(event => this.onDataError(event));
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.complete();
    this.ngUnsubscribe.next();
  }

setUtilizationService()
{
      // Utilization Service
      this.requestDeviceUtilizationPocketSummaryInfo$ = this.utilizationService.get(this.selectedDeviceInformation.DeviceId).pipe(shareReplay(1),
      finalize(() => {
        // if(this.screenState === UtilizationPageComponent.ListState.Error)
        // {return;}
        if(this.selectedDeviceInformation.DeviceId === 0)
        {
          this.screenState = UtilizationPageComponent.ListState.NoData;
        }
        else
        {
          this.screenState = UtilizationPageComponent.ListState.WaitingForData;
        }
        console.log('on complete');
      }),
      catchError(error => {
        this.lastErrorMessage = String(error .message);
        this.screenState = UtilizationPageComponent.ListState.Error;
        console.log('on error', error .message);
        throw error;
    }),
      );

}


  onSearchTextFilterEvent(filterText: string) {
    this.searchTextFilter = filterText;
  }
  onDeviceSelectionChanged($event) {
    if(this.selectedDeviceInformation !== $event)
    {
      this.selectedDeviceInformation = $event;
      this.refreshData();
    }
  }

  onRefreshClick() {
    this.refreshData();
  }

  private refreshData(){
    this.screenState = UtilizationPageComponent.ListState.MakingDataRequest;
    this.setUtilizationService();
    this.requestDeviceUtilizationPocketSummaryInfo$.subscribe();
    console.log('onDeviceSelectionChanged DeviceId: ');
    console.log(this.selectedDeviceInformation.DeviceId);
  }

  private onDataReceived(event: UtilizationDataEvent) {
    try {
      if (event && event.DeviceId !== this.selectedDeviceInformation.DeviceId) {
        return;
      }
      this.deviceUtilizationPocketSummaryInfo = event.UtilizationData;
      this.screenState = UtilizationPageComponent.ListState.Display;
      this.eventDateTime = event.EventDateTime;
// todo
    } catch (e) {
      this.screenState = UtilizationPageComponent.ListState.Error;
      this.lastErrorMessage = e.message;
      console.log('UtilizationPageComponent.onDataReceived ERROR');
      console.log(e);
    }
  }

  private onDataError(event) {
    try {
      if (event.DeviceId !== undefined && event.DeviceId !== this.selectedDeviceInformation.DeviceId) {
        return;
      }
      this.screenState = UtilizationPageComponent.ListState.Error;
    } catch (e) {
      this.screenState = UtilizationPageComponent.ListState.Error;
      this.lastErrorMessage = e.message;
      console.log('UtilizationPageComponent.onDataError ERROR');
      console.log(e);
    }
  }

  /* istanbul ignore next */
  private setupDataRefresh() {
    let hash = this.windowService.getHash();
    this.wpfInteropService.wpfViewModelActivated
      .pipe(filter(x => x == hash),takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.eventDateTime = null;
        this.refreshData();
      });
  }

}
export namespace UtilizationPageComponent
{
    export enum ListState
    {
        MakingDataRequest = 'MakingDataRequest', // Request data from XR2. Data will arive as an event
        WaitingForData = 'WaitingForData',       // Data request completed and we are waiting for XR2's event to come back
        Error = 'Error',                         // There was an error
        NoData = 'NoData',                       // No data to display (no device was selected)
        Display = 'Display'                      // Display data
    }
}
export enum OcAnimationSize {
  small,
  normal,
  large
}
