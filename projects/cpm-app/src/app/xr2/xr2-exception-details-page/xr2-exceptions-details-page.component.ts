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

export class Xr2ExceptionDetailsPageComponent implements OnInit, AfterViewInit {
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
    this.selectedItem = new Xr2ExceptionsItem(selectedItem);
    this.trayID = this.activatedRoute.snapshot.queryParamMap.get('TrayID');
    this.trayType = this.activatedRoute.snapshot.queryParamMap.get('TrayDescription');
    this.deviceName = this.activatedRoute.snapshot.queryParamMap.get('DeviceName');
    this.completedDate = this.activatedRoute.snapshot.queryParamMap.get('CompletedDateTime');
    this.displayExceptionDetailList$ = this.exceptionDetailsListService.get(this.selectedItem).pipe(map(guidedDeviceListItems => {
      return this.sort(guidedDeviceListItems.map(p => new Xr2ExceptionDetailsItem(p)), SortDirection.ascending);
    }), shareReplay(1));

  }


  ngAfterViewInit() {
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

  parseRowsData(items: Xr2ExceptionDetailsItem[]) {
    for (let item of items) {
      switch (item.PocketRow) {
        case "1":
          {
            item.PocketRow = "A";
            break;
          }
        case "2":
          {
            item.PocketRow = "B";
            break;
          }
        case "3":
          {
            item.PocketRow = "C";
            break;
          }
        case "4":
          {
            item.PocketRow = "D";
            break;
          }
        case "5":
          {
            item.PocketRow = "E";
            break;
          }
        case "6":
          {
            item.PocketRow = "F";
            break;
          }
        case "7":
          {
            item.PocketRow = "G";
            break;
          }
        case "8":
          {
            item.PocketRow = "H";
            break;
          }
        case "9":
          {
            item.PocketRow = "I";
            break;
          }

        case "10":
          {
            item.PocketRow = "J";
            break;
          }
        case "11":
          {
            item.PocketRow = "K";
            break;
          }
        case "12":
          {
            item.PocketRow = "L";
            break;
          }
        case "13":
          {
            item.PocketRow = "M";
            break;
          }
          case "14":
          {
            item.PocketRow = "N";
            break;
          }
          case "15":
          {
            item.PocketRow = "O";
            break;
          }
      }
    }
  }
}
