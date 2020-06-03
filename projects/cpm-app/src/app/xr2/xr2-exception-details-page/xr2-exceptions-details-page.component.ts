import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Xr2ExceptionDetailsItem } from '../model/xr2-exception-details-item';
import { Observable, of, Subscription } from 'rxjs';
import { map, switchMap, shareReplay } from 'rxjs/operators';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import * as _ from 'lodash';
import { nameof } from '../../shared/functions/nameof';
import { SortDirection } from '../../shared/constants/sort-direction';
import { TranslateService } from '@ngx-translate/core';
import { Many } from 'lodash';
import { Xr2ExceptionsService } from '../../api-xr2/services/xr2-exceptions.service';
import { ColHeaderSortableComponent } from '../../shared/components/col-header-sortable/col-header-sortable.component';
import { Xr2ExceptionDetailsService } from '../../api-xr2/services/xr2-exceptiondetails.service';
import { Xr2ExceptionsItem } from '../model/xr2-exceptions-item'
import { IXr2ExceptionsItem } from '../../api-xr2/data-contracts/i-xr2-exception-item';
import { ValidationBadgeModule } from '@omnicell/webcorecomponents';
import { SystemMessageModule } from '@omnicell/webcorecomponents';
@Component({
  selector: 'app-xr2-exception-details-page',
  templateUrl: './Xr2-Exception-details-page.component.html',
  styleUrls: ['./Xr2-Exceptions-details-page.component.scss']
})

export class Xr2ExceptionDetailsPageComponent implements OnInit {
  readonly PropertyName = nameof<Xr2ExceptionDetailsItem>("TrayID");
  readonly trayTypePropertyName = nameof<Xr2ExceptionDetailsItem>("TrayDescription");
  readonly deviceNamePropertyName = nameof<Xr2ExceptionDetailsItem>("DeviceName");
  readonly completedDatePropertyName = nameof<Xr2ExceptionDetailsItem>("CompletedDateTime");
  readonly reasonPropertyName = nameof<Xr2ExceptionDetailsItem>("Reason");
  readonly columnPropertyName = nameof<Xr2ExceptionDetailsItem>("PocketColumn");
  readonly rowProperyName = nameof<Xr2ExceptionDetailsItem>("PocketRow");
  readonly itemDescriptionPropertyName = nameof<Xr2ExceptionDetailsItem>("ItemDescription");
  readonly itemIDPropertyName = nameof<Xr2ExceptionDetailsItem>("ItemID");
  readonly barcodeNDCPropertyName = nameof<Xr2ExceptionDetailsItem>("BarCode");
  trayIDHeader$;
  trayTypeHeader$;
  deviceNameHeader$;
  completedDateHeader$;
  trayID: string;
  trayType: string;
  deviceName: string;
  completedDate: string;

  currentSortPropertyName: string = this.reasonPropertyName;
  sortOrder: SortDirection = SortDirection.ascending;
  myObj: any;
  displayExceptionDetailList$: Observable<Xr2ExceptionDetailsItem[]>;
  selectedItem: Xr2ExceptionsItem;
  mapRows: Map<number,string>;
  constructor(
    private activatedRoute: ActivatedRoute,
    private wpfActionController: WpfActionControllerService,
    private exceptionDetailsListService: Xr2ExceptionDetailsService,
    private translateService: TranslateService,
  ) {
    this.translateService.get('XR2_EXCEPTIONS_TRAY_ID').subscribe(result => { this.trayIDHeader$ = result; });
    this.translateService.get('XR2_EXCEPTIONS_TRAY_TYPE').subscribe(result => { this.trayTypeHeader$ = result; });
    this.translateService.get('XR2_EXCEPTIONS_DEVICE_NAME').subscribe(result => { this.deviceNameHeader$ = result; });
    this.translateService.get('XR2_EXCEPTIONS_COMPLETED_DATE').subscribe(result => { this.completedDateHeader$ = result; });
  }


  ngOnInit() {
      let selectedItem: IXr2ExceptionsItem = {
      TrayID: this.activatedRoute.snapshot.queryParamMap.get('TrayID'),
      DeviceID: this.activatedRoute.snapshot.queryParamMap.get('DeviceID'),
      CompletedDateTime: this.activatedRoute.snapshot.queryParamMap.get('CompletedDateTime'),
      DeviceName: "",
      ExceptionPockets: "",
      TrayDescription: ""
    };
    this.fillTheMapWithData();
    this.selectedItem = new Xr2ExceptionsItem(selectedItem);
    this.trayID = this.activatedRoute.snapshot.queryParamMap.get('TrayID');
    this.trayType = this.activatedRoute.snapshot.queryParamMap.get('TrayDescription');
    this.deviceName = this.activatedRoute.snapshot.queryParamMap.get('DeviceName');
    this.completedDate = this.activatedRoute.snapshot.queryParamMap.get('CompletedDateTime');
    this.displayExceptionDetailList$ = this.exceptionDetailsListService.get(this.selectedItem).pipe(map(guidedDeviceListItems => {
      return this.sort(guidedDeviceListItems.map(p => new Xr2ExceptionDetailsItem(p)), SortDirection.ascending);
    }), shareReplay(1));

  }

  ngOnDestroy(): void {

  }

  returnAlphaRowValue(currentRow: string) {

  }

  sort(devices: Xr2ExceptionDetailsItem[], sortDirection: Many<boolean|"asc"|"desc">): Xr2ExceptionDetailsItem[] {
    this.parseRowsData(devices);
    return _.orderBy(devices, x => x[this.currentSortPropertyName], sortDirection);
  }
  columnSelected(event: IColHeaderSortChanged) {
    this.currentSortPropertyName = event.ColumnPropertyName;
    this.sortOrder = event.SortDirection;
    this.displayExceptionDetailList$ = this.displayExceptionDetailList$.pipe(map(exceptions => {
      return this.sort(exceptions, event.SortDirection);
    }));
  }

  navigateBack() {
    this.wpfActionController.ExecuteBackAction();
  }

  fillTheMapWithData()
  {
    this.mapRows = new Map<number,string>();
    this.mapRows.set(1, "A");
    this.mapRows.set(2, "B");
    this.mapRows.set(3, "C");
    this.mapRows.set(4, "D");
    this.mapRows.set(5, "E");
    this.mapRows.set(6, "F");
    this.mapRows.set(7, "G");
    this.mapRows.set(8, "H");
    this.mapRows.set(9, "I");
    this.mapRows.set(10, "J");
    this.mapRows.set(11, "K");
    this.mapRows.set(12, "L");
    this.mapRows.set(13, "M");
    this.mapRows.set(14, "N");
    this.mapRows.set(15, "O");
    this.mapRows.set(16, "P");
    this.mapRows.set(17, "Q");
    this.mapRows.set(18, "R");
    this.mapRows.set(19, "S");
    this.mapRows.set(20, "T");
    this.mapRows.set(21, "U");
    this.mapRows.set(22, "V");
    this.mapRows.set(23, "W");
    this.mapRows.set(24, "X");
    this.mapRows.set(25, "Y");
    this.mapRows.set(26, "Z");
  }
  parseRowsData(items: Xr2ExceptionDetailsItem[]) {
    for(let item of items)
    {
      item.PocketRow = this.mapRows.get(Number(item.PocketRow));
    }
  }
}
