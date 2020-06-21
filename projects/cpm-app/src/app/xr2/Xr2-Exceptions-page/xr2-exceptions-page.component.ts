import { Component, OnInit, ViewChild, Output, EventEmitter, AfterViewInit, HostListener } from '@angular/core';
import { Xr2ExceptionsItem } from '../model/xr2-exceptions-item';
import { Observable, of, Subscription } from 'rxjs';
import { map, switchMap, shareReplay } from 'rxjs/operators';
import { SearchBoxComponent, PopupDialogService, PopupDialogComponent, PopupDialogProperties, PopupDialogType } from '@omnicell/webcorecomponents';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import * as _ from 'lodash';
import { nameof } from '../../shared/functions/nameof';
import { SortDirection } from '../../shared/constants/sort-direction';
import { TranslateService } from '@ngx-translate/core';
import { Many } from 'lodash';
import { SystemConfigurationService } from '../../shared/services/system-configuration.service';
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
  pagelevelInput: string;
  @ViewChild('searchBox', null) searchElement: SearchBoxComponent;

  displayExceptionsList$: Observable<Xr2ExceptionsItem[]>;
  traytypesList$: Observable<string[]>;
  currentSortPropertyName: string = this.completedDatePropertyName;
  sortOrder: SortDirection = SortDirection.descending;
  searchTextFilter: string;
  nonBarCodekeyboardInput: string = '';
  nonBarcodeInputFocus: boolean = false;
  rawBarcodeMessage: string = '';
  popupTimeoutSeconds: number;
  searchFields = [this.trayIDPropertyName, this.exceptionPocketsPropertyName, this.trayTypePropertyName, this.deviceNamePropertyName];

  constructor(
    private translateService: TranslateService,
    private systemConfigurationService: SystemConfigurationService,
    private exceptionsListService: Xr2ExceptionsService,
    private dialogService: PopupDialogService,
    private wpfActionControllerService: WpfActionControllerService,
    private _barcodeScanService: BarcodeScanService

  ) { }

  ngOnInit() {
    this.traytypesList$ = this.exceptionsListService.gettraytypes().pipe(map(guidedDeviceListItems => {
      return guidedDeviceListItems.map(p => p.toString());
    }), shareReplay(1));
    this.traytypesList$.subscribe();
    this.displayExceptionsList$ = this.exceptionsListService.get().pipe(map(guidedDeviceListItems => {
      return this.sort(guidedDeviceListItems.map(p => new Xr2ExceptionsItem(p)), SortDirection.descending);
    }), shareReplay(1));
    this.systemConfigurationService.GetConfigurationValues('TIMEOUTS', 'POP_UP_MESSAGE_TIMEOUT').subscribe(result => {
      console.log('popup message timeout : ' + result);
      this.popupTimeoutSeconds = (Number(result.Value));
    });
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

  columnSelected(event: IColHeaderSortChanged) {
    this.currentSortPropertyName = event.ColumnPropertyName;
    this.sortOrder = event.SortDirection;
    this.displayExceptionsList$ = this.displayExceptionsList$.pipe(map(exceptions => {
      return this.sort(exceptions, event.SortDirection);
    }));
  }

  sort(devices: Xr2ExceptionsItem[], sortDirection: Many<boolean | "desc" | "asc">): Xr2ExceptionsItem[] {
    return _.orderBy(devices, x => x[this.currentSortPropertyName], sortDirection);
  }

  ngOnDestroy(): void {
    if (this.searchSub) { this.searchSub.unsubscribe(); }
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
      this.displayExceptionsList$.subscribe((exceptions: IXr2ExceptionsItem[]) =>
        exceptionData = exceptions.find(p => p.TrayID.toString().toUpperCase() === this.rawBarcodeMessage.toString().toUpperCase())
      );
      if (exceptionData)
        this.navigatedetailspage(exceptionData);
      else
        this.displayWrongBarCodeDialog();
    }
  }

  @HostListener("document:keypress", ['$event']) onKeypressHandler(event: KeyboardEvent) {
    console.log(event);
    if (!this.nonBarcodeInputFocus) {
      var isInputComplete = this._barcodeScanService.handleKeyInput(event);
      //If not from barcode scanner ignore the character
      if (!this._barcodeScanService.isScannerInput()) {
        this._barcodeScanService.reset();
      }
      if (isInputComplete) {
        //populating the page level input into text box.
        this.pagelevelInput = this._barcodeScanService.BarcodeInputCharacters;
        this.rawBarcodeMessage = this._barcodeScanService.BarcodeInputCharacters;
        this._barcodeScanService.reset();
        var value = this.traytypesList$;
        var exceptionData: IXr2ExceptionsItem;
        this.displayExceptionsList$.subscribe((exceptions: IXr2ExceptionsItem[]) =>
          exceptionData = exceptions.find(p => p.TrayID.toString().toUpperCase() === this.rawBarcodeMessage.toString().toUpperCase())
        );
        if (exceptionData)
          this.navigatedetailspage(exceptionData);
        else
          this.displayWrongBarCodeDialog();
      }
    }
  }

  navigatedetailspage(exceptions: IXr2ExceptionsItem) {
    if (this.traytypesList$.forEach(
      val => val.toString().toUpperCase() === exceptions.TrayID.toString().substring(1, 2).toUpperCase())) {
      this.wpfActionControllerService.ExecuteContinueNavigationAction(`stocking/exceptiondetails`, { TrayID: exceptions.TrayID.toString(), DeviceID: exceptions.DeviceID, CompletedDateTime: exceptions.CompletedDateTime, DeviceName: exceptions.DeviceName, TrayDescription: exceptions.TrayDescription });
    }
    else {
      this.displayWrongBarCodeDialog();
    }
  }
  displayWrongBarCodeDialog(): void {
    const properties = new PopupDialogProperties('INVALID_SCAN_BARCODE');
    this.translateService.get('INVALID_SCAN_BARCODE_HEADER').subscribe(result => { properties.titleElementText = result; });
    this.translateService.get('INVALID_SCAN_BARCODE').subscribe(result => { properties.messageElementText = result; });
    properties.showPrimaryButton = true;
    properties.showSecondaryButton = false;
    properties.primaryButtonText = 'CANCEL';
    properties.dialogDisplayType = PopupDialogType.Warning;
    properties.timeoutLength = this.popupTimeoutSeconds;
    this.dialogService.showOnce(properties);
  }
}
