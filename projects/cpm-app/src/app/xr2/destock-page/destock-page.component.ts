import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { finalize, catchError, map, shareReplay, tap, takeUntil, filter } from 'rxjs/operators';
import { IDestockTypeInfo } from '../../api-xr2/data-contracts/i-destock-type-info';
import { DestockService } from '../../api-xr2/services/destock.service';
import { nameof } from '../../shared/functions/nameof';
import { SelectableDeviceInfo } from '../../shared/model/selectable-device-info';
import { DestockTypeInfo } from '../model/destock-type-info';
import { SimpleDialogService } from '../../shared/services/dialogs/simple-dialog.service';
import { DestockEventConnectionService } from '../services/destock-event-connection.service';
import { DestockDataEvent } from '../model/destock-data-event';
import { WindowService } from '../../shared/services/window-service';
import { WpfInteropService } from '../../shared/services/wpf-interop.service';
import { IXr2QueuePageConfiguration } from '../../shared/interfaces/i-xr2-queue-page-configuration';
import { Router, ActivatedRoute } from '@angular/router';
import { DevicesService } from '../../api-core/services/devices.service';

@Component({
  selector: 'app-destock-page',
  templateUrl: './destock-page.component.html',
  styleUrls: ['./destock-page.component.scss']
})

export class DestockPageComponent implements OnInit {
  device$: Observable<SelectableDeviceInfo>;
  deviceId: number = 0;
  requestDeviceDestockTypeInfo$: Observable<number> ;
  deviceDestockTypeInfo: DestockTypeInfo[];
  searchTextFilter: string;
  currentSortPropertyName: string;
  screenState: DestockPageComponent.ListState = DestockPageComponent.ListState.NoData;
  ngUnsubscribe = new Subject();
  lastErrorMessage: string;
  eventDateTime: Date;

  searchFields = [
    nameof<IDestockTypeInfo>('Xr2DestockType_Display'),
  ];

  constructor(private destockService: DestockService,
    private simpleDialogService: SimpleDialogService,
    private destockEventConnectionService: DestockEventConnectionService,
    private windowService: WindowService,
    private wpfInteropService: WpfInteropService,
    devicesService: DevicesService,
    private router: Router,
    activatedRoute: ActivatedRoute) {
    this.deviceId = Number.parseInt(activatedRoute.snapshot.paramMap.get('deviceId'));
    this.device$ = devicesService.getAllXr2Devices().pipe(shareReplay(1), map((devices: SelectableDeviceInfo[]) => devices.find(d => d.DeviceId === this.deviceId)));
    }

  ngOnInit() {

     this.setDestockService();
      this.refreshData();

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

setDestockService()
{
      // Destock Service
      this.requestDeviceDestockTypeInfo$ = this.destockService.get(this.deviceId).pipe(shareReplay(1),
      finalize(() => {
        if(this.deviceId === 0)
        {
          this.screenState = DestockPageComponent.ListState.NoData;
        }
        else
        {
          this.screenState = DestockPageComponent.ListState.WaitingForData;
        }
        console.log('on complete');
      }),
      catchError(error => {
        this.lastErrorMessage = String(error .message);
        this.screenState = DestockPageComponent.ListState.Error;
        console.log('on error', error .message);
        throw error;
    }),
      );

}

onBackClick() {
  this.router.navigate(['xr2/utilization']);
}

  onSearchTextFilterEvent(filterText: string) {
    this.searchTextFilter = filterText;
  }

  onRefreshClick() {
    this.refreshData();
  }

  private refreshData(){
    this.screenState = DestockPageComponent.ListState.MakingDataRequest;
    this.setDestockService();
    this.requestDeviceDestockTypeInfo$.subscribe();
  }

  private onDataReceived(event: DestockDataEvent) {
    try {
      if (event && event.DeviceId !== this.deviceId) {
        return;
      }
      this.deviceDestockTypeInfo = event.DestockTypeInfoData;
      this.screenState = DestockPageComponent.ListState.Display;
      this.eventDateTime = event.EventDateTime;
    } catch (e) {
      this.screenState = DestockPageComponent.ListState.Error;
      this.lastErrorMessage = e.message;
      console.log('DestockPageComponent.onDataReceived ERROR');
      console.log(e);
    }
  }

  private onDataError(event) {
    try {
      if (event.DeviceId !== undefined && event.DeviceId !== this.deviceId) {
        return;
      }
      this.screenState = DestockPageComponent.ListState.Error;
    } catch (e) {
      this.screenState = DestockPageComponent.ListState.Error;
      this.lastErrorMessage = e.message;
      console.log('DestockPageComponent.onDataError ERROR');
      console.log(e);
    }
  }

  onPrint(event: DestockTypeInfo)
  {
    // DeviceId
    console.log(this.deviceId);
    // barcode
    console.log(event.Barcode);
    // label text
    console.log(event.Xr2DestockType_Display);
    // qty of labels to print:
    console.log(event.BinCount);
    this.destockService.print(this.deviceId, event.Barcode, event.Xr2DestockType_Display, event.BinCount).subscribe(
      s => {
        this.simpleDialogService.displayInfoOk('PRINT_SUCCEEDED_DIALOG_TITLE', 'PRINT_SUCCEEDED_DIALOG_MESSAGE');
      },
      f => {
        this.simpleDialogService.displayErrorOk('PRINT_FAILED_DIALOG_TITLE', 'PRINT_FAILED_DIALOG_MESSAGE');
      }
    );
  }
}
export namespace DestockPageComponent
{
    export enum ListState
    {
        MakingDataRequest = 'MakingDataRequest', // Request data from XR2. Data will arive as an event
        WaitingForData = 'WaitingForData',       // Data request completed and we are waiting for XR2's event to come back
        Printing = 'Printing',                   // Printing labels - (optional choice to lock screen)
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
