import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, catchError, map, shareReplay, tap } from 'rxjs/operators';
import { IDestockTypeInfo } from '../../api-xr2/data-contracts/i-destock-type-info';
import { DestockService } from '../../api-xr2/services/destock.service';
import { nameof } from '../../shared/functions/nameof';
import { IXr2QueueNavigationParameters } from '../../shared/interfaces/i-xr2-queue-navigation-parameters';
import { IXr2QueuePageConfiguration } from '../../shared/interfaces/i-xr2-queue-page-configuration';
import { SelectableDeviceInfo } from '../../shared/model/selectable-device-info';
import { DestockTypeInfo } from '../model/destock-type-info';

@Component({
  selector: 'app-destock-page',
  templateUrl: './destock-page.component.html',
  styleUrls: ['./destock-page.component.scss']
})
export class DestockPageComponent implements OnInit {

  @Input() xr2QueueNavigationParameters: IXr2QueueNavigationParameters;
  @Input() savedPageConfiguration: IXr2QueuePageConfiguration;
  selectedDeviceInformation: SelectableDeviceInfo;
  deviceDestockTypeInfo$: Observable<DestockTypeInfo[]> ;
  searchTextFilter: string;
  currentSortPropertyName: string;
  screenState: DestockPageComponent.ListState = DestockPageComponent.ListState.NoData;
  lastErrorMessage: string;

  searchFields = [
    nameof<IDestockTypeInfo>('Xr2DestockType_Display'),
  ];

  constructor(private destockService: DestockService) { }

  ngOnInit() {

    if(! this.selectedDeviceInformation)
    {
      this.selectedDeviceInformation = new SelectableDeviceInfo(null);
      this.selectedDeviceInformation.DeviceId = 0;
    }
    this.deviceDestockTypeInfo$ = this.destockService.get(this.selectedDeviceInformation.DeviceId).pipe(shareReplay(1),
  finalize(() => {
    if(this.screenState === DestockPageComponent.ListState.Error)
    {return;}
    if(this.selectedDeviceInformation.DeviceId === 0)
    {
      this.screenState = DestockPageComponent.ListState.NoData;
    }
    else
    {
      this.screenState = DestockPageComponent.ListState.Display;
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
  onDetailsPageBackNavigation() {
    this.xr2QueueNavigationParameters = null;
  }
  onDeviceSelectionChanged($event) {
    if(this.selectedDeviceInformation !== $event)
    {
    this.screenState = DestockPageComponent.ListState.Waiting;
    this.selectedDeviceInformation = $event;
    this.deviceDestockTypeInfo$.subscribe();
    console.log('onDeviceSelectionChanged DeviceId: ');
    console.log(this.selectedDeviceInformation.DeviceId);
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
  }
  onRequestXr2CurrentNumbers() {
// Request for Device Id
// If No Device - request button shouldn't be available.
// update screen and save results to db
  }

}
export namespace DestockPageComponent
{
    export enum ListState
    {
        Waiting = 'Waiting',
        Printing = 'Printing',
        Error = 'Error',
        NoData = 'NoData',
        Display = 'Display'
    }
}
export enum OcAnimationSize {
  small,
  normal,
  large
}
