import { Component, OnInit,  ViewChild, Output, EventEmitter,AfterViewInit} from '@angular/core';
import { Xr2ExceptionsItem } from '../model/xr2-exceptions-item';
import { Observable, of,Subscription } from 'rxjs';
import { map, switchMap, shareReplay } from 'rxjs/operators';
import { SearchBoxComponent } from '@omnicell/webcorecomponents';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import * as _ from 'lodash';
import { nameof } from '../../shared/functions/nameof';
import { SortDirection } from '../../shared/constants/sort-direction';
import { Many } from 'lodash';
import { Xr2ExceptionsService } from '../../api-xr2/services/xr2-exceptions.service';
import { ColHeaderSortableComponent } from '../../shared/components/col-header-sortable/col-header-sortable.component';
import { IXr2ExceptionsItem } from '../../api-xr2/data-contracts/i-xr2-exception-item';
import { BarcodeScanService } from 'oal-core';
@Component({
  selector: 'app-xr2-exceptions-page',
  templateUrl: './xr2-exceptions-page.component.html',
  styleUrls: ['./xr2-exceptions-page.component.scss']
})

export class Xr2ExceptionsPageComponent implements OnInit, AfterViewInit {
  readonly trayIDPropertyName = nameof<Xr2ExceptionsItem>("TrayID");
  readonly trayTypePropertyName = nameof<Xr2ExceptionsItem>("TrayDescription");
  readonly exceptionPocketsPropertyName = nameof<Xr2ExceptionsItem>("ExceptionPockets");
  readonly deviceNamePropertyName = nameof<Xr2ExceptionsItem>("DeviceName");
  readonly completedDatePropertyName = nameof<Xr2ExceptionsItem>("CompletedDateTime");
  searchSub: Subscription;
  @ViewChild('searchBox', null) searchElement: SearchBoxComponent;

  displayExceptionsList$: Observable<Xr2ExceptionsItem[]>;
  traytypesList$: Observable<string[]>;
  currentSortPropertyName: string = this.completedDatePropertyName;
  sortOrder: SortDirection = SortDirection.descending;
  searchTextFilter: string;
  nonBarCodekeyboardInput: string = '';
  nonBarcodeInputFocus: boolean = false;
  rawBarcodeMessage: string = '';
  searchFields = [ this.trayIDPropertyName,this.exceptionPocketsPropertyName,this.trayTypePropertyName, this.deviceNamePropertyName];

  constructor(
    private exceptionsListService: Xr2ExceptionsService,
    private wpfActionControllerService: WpfActionControllerService,
    private _barcodeScanService: BarcodeScanService

    ) { }

  ngOnInit() {
    //this.traytypesList$ = this.exceptionsListService.gettraytypes().pipe(map(obj => obj, shareReplay(1)));

    this.traytypesList$ = this.exceptionsListService.gettraytypes().pipe(map(guidedDeviceListItems => {
      return guidedDeviceListItems.map(p => p.toString());
   }), shareReplay(1));

    this.displayExceptionsList$ = this.exceptionsListService.get().pipe(map(guidedDeviceListItems => {
       return this.sort(guidedDeviceListItems.map(p => new Xr2ExceptionsItem(p)), SortDirection.descending);
    }), shareReplay(1));

    

    //this.traytypesList$ = this.exceptionsListService.gettraytypes();
  }


  ngAfterViewInit() {
    this.searchSub = this.searchElement.searchOutput$
      .pipe(
        switchMap((searchData: string) => {
          return of(searchData);
        })
      )
      .subscribe(data => {
        this.searchTextFilter = data;
      });
  }

  columnSelected(event: IColHeaderSortChanged){
    this.currentSortPropertyName = event.ColumnPropertyName;
    this.sortOrder = event.SortDirection;
    this.displayExceptionsList$ = this.displayExceptionsList$.pipe(map(exceptions => {
      return this.sort(exceptions, event.SortDirection);
    }));
  }

  sort(devices: Xr2ExceptionsItem[], sortDirection: Many<boolean|"desc"|"asc">): Xr2ExceptionsItem[]{
      return _.orderBy(devices, x => x[this.currentSortPropertyName], sortDirection);
  }

  ngOnDestroy(): void {
    if (this.searchSub) { this.searchSub.unsubscribe(); }
  }

  navigatedetailspage(exceptions: IXr2ExceptionsItem)
  {
    this.wpfActionControllerService.ExecuteContinueNavigationAction(`stocking/exceptiondetails`,{TrayID:exceptions.TrayID.toString(),DeviceID: exceptions.DeviceID,CompletedDateTime:exceptions.CompletedDateTime, DeviceName:exceptions.DeviceName, TrayDescription: exceptions.TrayDescription});
  }

  onBarcodeScanExcludedKeyPressEvent(event: KeyboardEvent) {
    var isInputComplete = this._barcodeScanService.handleKeyInput(event);
    var isScannerInput = this._barcodeScanService.isScannerInput();
   // check if the character is a barcode scan
    if (isScannerInput) {
        //Since the first character always returns true, ignore it.
       if (this._barcodeScanService.BarcodeInputCharacters.length != 1) {
            //ignore if it is a barcodescan
           event.preventDefault();
        }
    } else {
       this._barcodeScanService.reset();
    }
    if (isInputComplete) {
        //remove the last character.
        this.nonBarCodekeyboardInput = this.nonBarCodekeyboardInput.slice(0, -1);
        this.rawBarcodeMessage = this._barcodeScanService.BarcodeInputCharacters;
        console.log(`Barcode Scan from NonBarcode Enabled Text box:  ${this._barcodeScanService.BarcodeInputCharacters}`);
        this._barcodeScanService.reset();
        var value = this.traytypesList$;
        var exceptionData: IXr2ExceptionsItem;
        this.displayExceptionsList$.subscribe((exceptions : IXr2ExceptionsItem[])  => exceptionData = exceptions.find(p => p.TrayID === this.rawBarcodeMessage));  
        this.navigatedetailspage(exceptionData);
      }
}
}
