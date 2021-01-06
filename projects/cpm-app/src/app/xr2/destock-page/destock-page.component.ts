import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { IDestockTypeInfo } from '../../api-xr2/data-contracts/i-destock-type-info';
import { DestockService } from '../../api-xr2/services/destock.service';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import { nameof } from '../../shared/functions/nameof';
import { IXr2QueueNavigationParameters } from '../../shared/interfaces/i-xr2-queue-navigation-parameters';
import { IXr2QueuePageConfiguration } from '../../shared/interfaces/i-xr2-queue-page-configuration';
import { SelectableDeviceInfo } from '../../shared/model/selectable-device-info';
import { DestockTypeInfo } from '../model/destock-type-info';
import { DestockTypeInfoComponent } from '../destock-typeinfo/destock-typeinfo.component';
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
  // sortOrder: SortDirection;

  searchFields = [
    nameof<IDestockTypeInfo>('Xr2DestockType_Display'),
  ];

  constructor(private destockService: DestockService) { }

  ngOnInit() {

    if(! this.selectedDeviceInformation)
    {
      this.selectedDeviceInformation = new SelectableDeviceInfo(null);
      this.selectedDeviceInformation.DeviceId = 4;
    }
    this.deviceDestockTypeInfo$ = this.destockService.get(this.selectedDeviceInformation.DeviceId).pipe(
      tap({
     next: val => {
     console.log('on next', val);
     },
     error: error => {
     console.log('on error', error.message);
     },
     complete: () => console.log('on complete')
     }),
  shareReplay(1));
    //this.deviceDestockTypeInfo$ = this.destockService.get(this.selectedDeviceInformation.DeviceId);

     //  this.deviceDestockTypeInfo$ = this.destockService.get(4).pipe(map(x => {return x.map(y => {return new DestockTypeInfo(y)})}));
       // .pipe(
    //     shareReplay(1),
    // tap({
    //     next: val => {
    //     console.log('on next', val);
    //     },
    //     error: error => {
    //     console.log('on error', error.message);
    //     },
    //     complete: () => console.log('on complete')
    //     }));
  }

  onSearchTextFilterEvent(filterText: string) {
    this.searchTextFilter = filterText;
  }
  onDetailsPageBackNavigation() {
    this.xr2QueueNavigationParameters = null;
  }
  onDeviceSelectionChanged($event) {
    this.selectedDeviceInformation = $event;
    console.log('onDeviceSelectionChanged DeviceId: ');
    console.log(this.selectedDeviceInformation.DeviceId);
    this.onChangedDeviceId();
  }

  onChangedDeviceId() {
    this.deviceDestockTypeInfo$ = this.destockService.get(this.selectedDeviceInformation.DeviceId).pipe(
           tap({
          next: val => {
          console.log('on next', val);
          },
          error: error => {
          console.log('on error', error.message);
          },
          complete: () => console.log('on complete')
          }),
       shareReplay(1));

    // this.deviceDestockTypeInfo$ = this.destockService.get(this.selectedDeviceInformation.DeviceId).pipe(map(x => {return x.map(y => {return new DestockTypeInfo(y)})}),
    //  tap({
    //       next: val => {
    //       console.log('on next', val);
    //       },
    //       error: error => {
    //       console.log('on error', error.message);
    //       },
    //       complete: () => console.log('on complete')
    //       }),
    //    shareReplay(1));
  //   this.deviceDestockTypeInfo$ = this.destockService.get(this.selectedDeviceInformation.DeviceId).pipe(
  //     map(x => {
  //       const c: DestockTypeInfo[] = [];
  //        x.forEach(dd => { c.push(new DestockTypeInfo(dd));})
  //       // d.map(dd => new DestockTypeInfo(dd));
  //       return c;
  //     } ),
  //     shareReplay(1),
  // tap({
  //     next: val => {
  //     console.log('on next', val);
  //     },
  //     error: error => {
  //     console.log('on error', error.message);
  //     },
  //     complete: () => console.log('on complete')
  //     }));
// update screen with controller info
//this.destockService.get(this.selectedDeviceInformation.DeviceId).subscribe(() => this.deviceDestockTypeInfo), shareReplay(1);
// this.deviceDestockTypeInfo = this.destockService.get(this.selectedDeviceInformation.DeviceId).pipe(map(x => {
//   const displayObjects = x.map(d => new IDestockTypeInfo(d));
//   return displayObjects;
// }), shareReplay(1));
      }

  onRequestXr2CurrentNumbers() {
// Request for Device Id
// If No Device - request button shouldn't be available.
// update screen and save results to db
  }

}
