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
import { SimpleDialogService } from '../../shared/services/dialogs/simple-dialog.service';
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

  constructor(private destockService: DestockService,
    private simpleDialogService: SimpleDialogService) { }

  ngOnInit() {

    if(! this.selectedDeviceInformation)
    {
      this.selectedDeviceInformation = new SelectableDeviceInfo(null);
      this.selectedDeviceInformation.DeviceId = 0;
    }
    this.deviceDestockTypeInfo$ = this.destockService.get(this.selectedDeviceInformation.DeviceId).pipe(shareReplay(1));
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
    this.destockService.print(this.selectedDeviceInformation.DeviceId, event.Barcode, event.Xr2DestockType_Display).subscribe(
      s => {
        this.simpleDialogService.displayInfoOk('PRINT_SUCCEEDED_DIALOG_TITLE', 'PRINT_SUCCEEDED_DIALOG_MESSAGE');
      },
      f => {
        this.simpleDialogService.displayErrorOk('PRINT_FAILED_DIALOG_TITLE', 'PRINT_FAILED_DIALOG_MESSAGE');
      }
    );
  }
  onRequestXr2CurrentNumbers() {
// Request for Device Id
// If No Device - request button shouldn't be available.
// update screen and save results to db
  }

}
