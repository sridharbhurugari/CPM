import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { finalize, catchError, map, shareReplay, tap, takeUntil } from 'rxjs/operators';
import { IDestockTypeInfo } from '../../api-xr2/data-contracts/i-destock-type-info';
import { DestockService } from '../../api-xr2/services/destock.service';
import { nameof } from '../../shared/functions/nameof';
import { IXr2QueueNavigationParameters } from '../../shared/interfaces/i-xr2-queue-navigation-parameters';
import { IXr2QueuePageConfiguration } from '../../shared/interfaces/i-xr2-queue-page-configuration';
import { SelectableDeviceInfo } from '../../shared/model/selectable-device-info';
import { DestockTypeInfo } from '../model/destock-type-info';
import { SimpleDialogService } from '../../shared/services/dialogs/simple-dialog.service';
import { DestockEventConnectionService } from '../services/destock-event-connection.service';
import { DestockDataEvent } from '../model/destock-data-event';
@Component({
  selector: 'app-destock-page',
  templateUrl: './destock-page.component.html',
  styleUrls: ['./destock-page.component.scss']
})
export class DestockPageComponent implements OnInit {

  @Input() xr2QueueNavigationParameters: IXr2QueueNavigationParameters;
  @Input() savedPageConfiguration: IXr2QueuePageConfiguration;
  selectedDeviceInformation: SelectableDeviceInfo;
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
    private destockEventConnectionService: DestockEventConnectionService) { }

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

setDestockService()
{
      // Destock Service
      this.requestDeviceDestockTypeInfo$ = this.destockService.get(this.selectedDeviceInformation.DeviceId).pipe(shareReplay(1),
      finalize(() => {
        // if(this.screenState === DestockPageComponent.ListState.Error)
        // {return;}
        if(this.selectedDeviceInformation.DeviceId === 0)
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
    this.screenState = DestockPageComponent.ListState.MakingDataRequest;    
    this.setDestockService();
    this.requestDeviceDestockTypeInfo$.subscribe();    
    console.log('onDeviceSelectionChanged DeviceId: ');
    console.log(this.selectedDeviceInformation.DeviceId);
  }

  private onDataReceived(event: DestockDataEvent) {
    try {
      if (event && event.DeviceId !== this.selectedDeviceInformation.DeviceId) {
        return;
      }            
      this.deviceDestockTypeInfo = event.DestockTypeInfoData;
      this.screenState = DestockPageComponent.ListState.Display;
      this.eventDateTime = event.EventDateTime;      
// todo
    } catch (e) {
      this.screenState = DestockPageComponent.ListState.Error;
      this.lastErrorMessage = e.message;
      console.log('DestockPageComponent.onDataReceived ERROR');
      console.log(e);
    }
  }

  private onDataError(event) {
    try {
      if (event.DeviceId !== undefined && event.DeviceId !== this.selectedDeviceInformation.DeviceId) {
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
    console.log(this.selectedDeviceInformation.DeviceId);
    // barcode
    console.log(event.Barcode);
    // label text
    console.log(event.Xr2DestockType_Display);
    // qty of labels to print:
    console.log(event.BinCount);
    this.destockService.print(this.selectedDeviceInformation.DeviceId, event.Barcode, event.Xr2DestockType_Display, event.BinCount).subscribe(
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
