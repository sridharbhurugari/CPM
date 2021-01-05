import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { IDestockTypeInfo } from '../../api-xr2/data-contracts/i-destock-type-info';
import { DestockService } from '../../api-xr2/services/destock.service';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import { nameof } from '../../shared/functions/nameof';
import { IXr2QueueNavigationParameters } from '../../shared/interfaces/i-xr2-queue-navigation-parameters';
import { IXr2QueuePageConfiguration } from '../../shared/interfaces/i-xr2-queue-page-configuration';
import { SelectableDeviceInfo } from '../../shared/model/selectable-device-info';

@Component({
  selector: 'app-destock-page',
  templateUrl: './destock-page.component.html',
  styleUrls: ['./destock-page.component.scss']
})
export class DestockPageComponent implements OnInit {

  @Input() xr2QueueNavigationParameters: IXr2QueueNavigationParameters;
  @Input() savedPageConfiguration: IXr2QueuePageConfiguration;
  public deviceId: number;
  public deviceDestockTypeInfo = new Observable<IDestockTypeInfo[]>();
  searchTextFilter: string;
  currentSortPropertyName: string;
  selectedDeviceInformation: SelectableDeviceInfo;
  // sortOrder: SortDirection;

  searchFields = [
    nameof<IDestockTypeInfo>('Xr2DestockType_Display'),
  ];

  typePropertyName = nameof<IDestockTypeInfo>('Xr2DestockType_Display');
  typereferencePropertyName = nameof<IDestockTypeInfo>('Xr2DestockType_ResourcesManager');
  defaultdisplayorderPropertyName = nameof<IDestockTypeInfo>('DefaultDisplayOrder');
  barcodePropertyName =  nameof<IDestockTypeInfo>('Barcode');
  itemcountPropertyName =  nameof<IDestockTypeInfo>('ItemCount');
  bincountPropertyName = nameof<IDestockTypeInfo>('BinCount');
  daystoexpirePropertyName = nameof<IDestockTypeInfo>('DaysToExpire');
  printPropertName = 'pRINT';
  constructor(private destockService: DestockService) { }

  ngOnInit() {
  }

  columnSelected(event: IColHeaderSortChanged){
    // this.unfilledSortOrderService.Update(event.ColumnPropertyName, event.SortDirection);
    // this.picklists = this.unfilledSortOrderService.Sort(this.picklists);
  }

  onSearchTextFilterEvent(filterText: string) {
    this.searchTextFilter = filterText;
  }
  onDetailsPageBackNavigation() {
    this.xr2QueueNavigationParameters = null;
  }
  onDeviceSelectionChanged($event) {
    this.selectedDeviceInformation = $event;
    this.deviceId = this.selectedDeviceInformation.DeviceId;
    console.log('onDeviceSelectionChanged DeviceId: ');
    console.log(this.selectedDeviceInformation.DeviceId);
    this.onChangedDeviceId();
  }


  onPrint(event: IDestockTypeInfo) {
  }

  onChangedDeviceId() {
// update screen with controller info
this.destockService.get(this.selectedDeviceInformation.DeviceId).subscribe(() => this.deviceDestockTypeInfo), shareReplay(1);
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
