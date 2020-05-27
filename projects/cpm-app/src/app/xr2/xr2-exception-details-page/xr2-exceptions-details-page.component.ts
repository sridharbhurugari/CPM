import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Xr2ExceptionDetailsItem } from '../model/xr2-exception-details-item';
import { Observable, of, Subscription } from 'rxjs';
import { map, switchMap, shareReplay } from 'rxjs/operators';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import * as _ from 'lodash';
import { nameof } from '../../shared/functions/nameof';
import { SortDirection } from '../../shared/constants/sort-direction';
import { TranslateService } from '@ngx-translate/core';
import { Many } from 'lodash';
import { Xr2ExceptionsService } from '../../api-xr2/services/xr2-exceptions.service';
import { ColHeaderSortableComponent } from '../../shared/components/col-header-sortable/col-header-sortable.component';
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
  readonly columnPropertyName = nameof<Xr2ExceptionDetailsItem>("Column");
  readonly rowProperyName = nameof<Xr2ExceptionDetailsItem>("Row");
  readonly itemDescriptionPropertyName = nameof<Xr2ExceptionDetailsItem>("ItemDescription");
  readonly itemIDPropertyName = nameof<Xr2ExceptionDetailsItem>("ItemID");
  readonly barcodeNDCPropertyName = nameof<Xr2ExceptionDetailsItem>("BarCodeNDC");
  trayIDHeader$;
  trayTypeHeader$;
  deviceNameHeader$;
  completedDateHeader$;
  trayID:string; 
  trayType:string; 
  deviceName:string;
  completedDate:string;
   // displayExceptionDetailsList$: Observable<Xr2ExceptionDetailsItem[]>;

  currentSortPropertyName: string = this.completedDatePropertyName;
  sortOrder: SortDirection = SortDirection.descending;
  myObj: any;
  displayExceptionDetail: Xr2ExceptionDetailsItem;
  displayExceptionDetailsList: Xr2ExceptionDetailsItem[];
  constructor(
    private exceptionsListService: Xr2ExceptionsService,
    private translateService: TranslateService,
  ) 
  {
    this.translateService.get('XR2_EXCEPTIONS_TRAY_ID').subscribe(result => { this.trayIDHeader$ = result; });
    this.translateService.get('XR2_EXCEPTIONS_TRAY_TYPE').subscribe(result => { this.trayTypeHeader$ = result; });
    this.translateService.get('XR2_EXCEPTIONS_DEVICE_NAME').subscribe(result => { this.deviceNameHeader$ = result; });
    this.translateService.get('XR2_EXCEPTIONS_COMPLETED_DATE').subscribe(result => { this.completedDateHeader$ = result; });
  }


  ngOnInit() {
    var localcopy = [];
    this.displayExceptionDetailsList = localcopy;
    this.trayID = "C00005";
    this.trayType = "Oral Large Solid";
    this.deviceName = "XR2DY1";
    this.completedDate="2020-05-19 16:47:54.293";
    this.displayExceptionDetail = (new Xr2ExceptionDetailsItem ({ 
      TrayID : "C00005",
      TrayDescription: "Oral Large Solid",
      DeviceName: "XR2DY1",
      CompletedDateTime : "",
      Reason:"Missing Data",
      Column:"1",
      Row:"A",
      ItemDescription: "sample",
      ItemID:"12123",
      BarCodeNDC:"1111111111"

    }));
    this.displayExceptionDetailsList.push(this.displayExceptionDetail);
    this.displayExceptionDetail=  (new Xr2ExceptionDetailsItem ({ 
      TrayID : "C00005",
      TrayDescription: "Oral Solid",
      DeviceName: "XR2DY1",
      CompletedDateTime : "",
      Reason:"Invalid Data",
      Column:"1",
      Row:"B",
      ItemDescription: "sample",
      ItemID:"12123",
      BarCodeNDC:"1111111111"

    }));
    this.displayExceptionDetailsList.push(this.displayExceptionDetail);
    this.displayExceptionDetail=  (new Xr2ExceptionDetailsItem ({ 
      TrayID : "C00005",
      TrayDescription: "Oral Large Solid",
      DeviceName: "XR2DY1",
      CompletedDateTime : "",
      Reason:"No Expiration",
      Column:"1",
      Row:"C",
      ItemDescription: "sample",
      ItemID:"12123",
      BarCodeNDC:"1111111111"

    }));

    this.displayExceptionDetailsList.push(this.displayExceptionDetail);
    this.displayExceptionDetail= (new Xr2ExceptionDetailsItem ({ 
      TrayID : "C00005",
      TrayDescription: "Oral Solid",
      DeviceName: "XR2DY1",
      CompletedDateTime : "",
      Reason:"Un Scannable Data",
      Column:"1",
      Row:"D",
      ItemDescription: "sample",
      ItemID:"12123",
      BarCodeNDC:"1111111111"

    }));
    this.displayExceptionDetailsList.push(this.displayExceptionDetail);

  }


  ngAfterViewInit() {
  }

  ngOnDestroy(): void {

  }

  returnAlphaRowValue(currentRow:string)
  {
    
  }
}
