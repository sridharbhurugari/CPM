import { Component, OnInit, AfterViewInit, ViewChild,AfterViewChecked } from '@angular/core';
import * as _ from 'lodash';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, forkJoin, merge, from } from 'rxjs';
import { NumericComponent, DatepickerComponent, ButtonActionComponent, DateFormat, Util, PopupDialogService, PopupDialogComponent, PopupDialogProperties, PopupDialogType } from '@omnicell/webcorecomponents';
import { SearchDropdownInputData,SearchDropdownOutputData,SearchBoxAlign,SearchDropdownComponent,SearchDropDownColumnTemplate } from '@omnicell/webcorecomponents';
import { IGuidedManualCycleCountItems } from '../../api-core/data-contracts/i-guided-manual-cycle-count-items';
import { GuidedManualCycleCountItems } from '../../api-core/data-contracts/guided-manual-cycle-count-items';
import { IGuidedManualCycleCountItemid } from '../../api-core/data-contracts/i-guided-manual-cycle-count-itemid';
import { GuidedManualCycleCountItemid } from '../../api-core/data-contracts/guided-manual-cycle-count-itemid';
import { map, switchMap, shareReplay,filter } from 'rxjs/operators';
import {GuidedManualCycleCountServiceService } from  '../../api-core/services/guided-manual-cycle-count-service.service'
import { DeviceLocationAccessResult } from '../../shared/enums/device-location-access-result';
import { CarouselLocationAccessService } from '../../shared/services/devices/carousel-location-access.service';
import { CoreEventConnectionService } from '../../api-core/services/core-event-connection.service';
import { DeviceLocationTypeId } from '../../shared/constants/device-location-type-id';
import { TranslateService } from '@ngx-translate/core';
import { SpinnerPopupComponent } from '../../shared/components/spinner-popup/spinner-popup.component';
import { deviceCycleCountItemUpdate } from '../../api-core/data-contracts/guided-cycle-count-update';
import { SingleselectRowItem } from '../model/SingleselectRowItem';


@Component({
  selector: 'app-guidedinvmgmt-manualcyclecount-page',
  templateUrl: './guidedinvmgmt-manualcyclecount-page.component.html',
  styleUrls: ['./guidedinvmgmt-manualcyclecount-page.component.scss']
})
export class GuidedinvmgmtManualcyclecountPageComponent implements OnInit,AfterViewInit,AfterViewChecked {
  private _leaseDeniedTitle$: Observable<string>;

  @ViewChild(NumericComponent, null) numericElement: NumericComponent;
  @ViewChild(DatepickerComponent, null) datepicker: DatepickerComponent;
  @ViewChild(ButtonActionComponent, null) cancelbutton: ButtonActionComponent;
  @ViewChild(ButtonActionComponent, null) donebutton: ButtonActionComponent;

  leaseBusyTitle$: Observable<any>;
  leaseBusyMessage$: Observable<any>;
  carouselFaulted: boolean = false;
  deviceLocationAccessBusy: boolean;
  displayCycleCountItem: IGuidedManualCycleCountItemid;
  cycleCountItems: Observable<IGuidedManualCycleCountItemid[]>;

 
  //isLastItem: boolean;
  doneButtonDisable: boolean;
  daterequired: boolean;
  disablethedate: boolean;
  todaydate: string;
  numericfocus: boolean;
  isMultiLocation :boolean;
  isSingleSelectEnable:boolean;
  locationCount :number;
  unassignedItem:boolean;
  numericindexes = ['', 1, ''];
  datepickerindexes = [2, 3, 4, ''];
  public time: Date = new Date();
  leaseBusyPopup$: Observable<PopupDialogComponent>;
  

// Parent component variables
selectedItem: any;
searchKey = '';
searchData:Observable<GuidedManualCycleCountItems[]>;
startCounter = 0;
endCounter: number;
fetchCount = 100;
searchRequestorText =  '';
  @ViewChild('dropdownSearchUser', {static: true}) userSearchDropdownElement: SearchDropdownComponent;
  placeHolderText = '';
  columnTemplate =  SearchDropDownColumnTemplate;
  noResultsFoundText = '';
  gridHeight = '';
  gridWidth = '';
  columnsConfig: Array<any>;
  searchBoxAlign = SearchBoxAlign;

  constructor(
    private activatedRoute: ActivatedRoute,
    private guidedManualCycleCountServiceService : GuidedManualCycleCountServiceService,
    private carouselLocationAccessService: CarouselLocationAccessService,
    private coreEventConnectionService: CoreEventConnectionService,
    private dialogService: PopupDialogService,
    private translateService: TranslateService,
    private wpfActionController: WpfActionControllerService,
  ) { 
    setInterval(() => {
      this.time = new Date();
    }, 1);
    this.daterequired = false;
    this.disablethedate = false;
    this.numericfocus = false;
    this.todaydate = this.time.getMonth() + "/" + this.time.getDate() + "/" + this.time.getFullYear();
    this.leaseBusyTitle$ = translateService.get('LEASE_BUSY_TITLE');
    this.leaseBusyMessage$ = translateService.get('LEASE_BUSY_MESSAGE');
    this._leaseDeniedTitle$ = translateService.get('DEVICE_ACCESS');
  }

  ngOnInit() {
    var deviceId = this.activatedRoute.snapshot.queryParamMap.get('deviceId');
    this.coreEventConnectionService.carouselReadySubject.pipe(filter(x => x.DeviceId.toString() == deviceId)).subscribe(x => this.carouselFaulted = false);
    this.coreEventConnectionService.carouselFaultedSubject.pipe(filter(x => x.DeviceId.toString() == deviceId)).subscribe(x => this.carouselFaulted = true);
    this.noResultsFoundText = 'No results found';
    this.placeHolderText = 'localized search text';
    this.gridHeight = '500px';
    this.gridWidth = '800px';
    this.columnsConfig = [
      {
        displayText: '',
        displayField: '',
      },
      {
        displayText: 'Item ID',
        displayField: 'ID',
      },
      {
        displayText: 'Item Description',
        displayField: 'GenericNameFormatted',
      },
     ];
  this.guidedManualCycleCountServiceService.getSearchItems("");


  this.doneButtonDisable=true;
  }
  multiLocations: SingleselectRowItem[];
  selectedItemLocattion: SingleselectRowItem;
  

  ngAfterViewChecked() {
    this.toggleredborderforfirstitem();

  }
  // Output from the Dropdown Search Item Click
  itemSelected(item: any) {
    this.selectedItem = JSON.stringify(item); 
    this.isSingleSelectEnable = false;
    this.getCycleCountData(item.item.ID);
    
  }
  private getSearchData(searchKey): Observable<GuidedManualCycleCountItems[]> {

    // Make api call to get data as an observable
    return this.guidedManualCycleCountServiceService.getSearchItems(searchKey);
    //return this.searchData ;
  }

  ngAfterViewInit() {
    this.userSearchDropdownElement.searchDropdownTextOutput$
      .pipe(
        switchMap((searchData: SearchDropdownOutputData) => {
          if (searchData.reset) {
            this.endCounter = this.fetchCount;
          }
          return this.getSearchData(searchData.searchKey);
        })
      )
      .subscribe((data: any) => {
        this.searchData = data.slice(this.startCounter, this.endCounter);
        this.endCounter = this.endCounter + this.fetchCount;
        let loadMore = true;
        if (this.endCounter >= data.length) {
          // By setting this value to False,
          // search dropdown component will not make a call back on Scroll
          loadMore = false;
        }

        const searchDataResult = new SearchDropdownInputData(
          this.searchData,
          loadMore
        );
        this.userSearchDropdownElement.searchDropdownService.pushData(searchDataResult);
      });
    }


    getCycleCountData(itemid:string) {
      this.cycleCountItems = this.guidedManualCycleCountServiceService.get(itemid).pipe(map(guidedCycleCountItems => {
        return guidedCycleCountItems.map(p => new GuidedManualCycleCountItemid(p));
      }));
      this.cycleCountItems.subscribe(x => {
        if (x.length > 0 && x[0].ExpirationDate) {
          this.displayCycleCountItem = x[0];
          var date = new Date(x[0].ExpirationDate);
          this.displayCycleCountItem.InStockQuantity = x[0].QuantityOnHand;
           this.locationCount=0;
           
          if(x.length > 1){
            this.displayCycleCountItem.QuantityOnHand = 0;
            this.isSingleSelectEnable = true;
            this.isMultiLocation = true;
            this.multiLocations = [];

            for(let i=0; i<x.length; i++){
              this.locationCount++;
              let location = new SingleselectRowItem();
              location.text = x[i].LocationDescription +'                     '+x[i].PackageFormName;
              location.value = x[i].LocationDescription;
              location.Visible = true;
              this.multiLocations.push(location);
            }
          }
          else{
            this.isSingleSelectEnable = false;
            this.isMultiLocation = false;
          }
       
          this.toggleredborderfornonfirstitem(true);
          this.displayCycleCountItem.ItemDateFormat = DateFormat.mmddyyyy_withslashes;
          this.displayCycleCountItem.ExpirationDateFormatted = (date.getFullYear() == 1) ? '' : ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + ((date.getFullYear() == 1) ? 1900 : date.getFullYear());
          if (this.displayCycleCountItem.ExpirationDateFormatted === "" && this.displayCycleCountItem.QuantityOnHand !== 0)
            this.DisableActionButtons(false);

        }
        else{
           this.unassignedItem = true;
            this.displayUnknownItemDialog();
         }
 
      },
        () => { this.toggleredborderforfirstitem(); Util.setByTabIndex(this.numericindexes[1]); },
        () => { this.toggleredborderforfirstitem(); Util.setByTabIndex(this.numericindexes[1]); }
      )
    }



    DisableActionButtons(value: boolean) {
     this.doneButtonDisable = value;
    }

    toggleredborderfornonfirstitem(nextrecordonly: boolean) {
      var element = document.getElementById("datepicker");
      if (element) {
        if (!nextrecordonly) {
          if ((element.classList.contains("ng-touched"))
            || (element.classList.contains("ng-untouched"))) {
            element.classList.contains("ng-valid") ? element.classList.remove("ng-valid") : null;
            element.classList.contains("ng-invalid") ? null : element.classList.add("ng-invalid");
          }
        }
        else {
          element.classList.contains("ng-invalid") ? element.classList.remove("ng-invalid") : null;
          element.classList.contains("ng-dirty") ? element.classList.remove("ng-dirty") : null;
          element.classList.contains("ng-pristine") ? element.classList.remove("ng-pristine") : null;
        }
      }
    }
  
    disabledatecomponent(value: boolean) {
      this.disablethedate = value;
    }
  
    isdateexpired(input: string) {
      var todayDate = new Date();
      var todayDateText = (todayDate.getMonth() + 1) + "/" + todayDate.getDate() + "/" + todayDate.getFullYear();
      var inputToDate = Date.parse(input);
      var todayToDate = Date.parse(todayDateText);
      return (inputToDate < todayToDate);
    }

    toggleredborderforfirstitem() {
      if (this.displayCycleCountItem && this.displayCycleCountItem.QuantityOnHand === 0) {
        this.disabledatecomponent(true);
        this.toggleredborderfornonfirstitem(true);
      }
      else if (this.isdateexpired(this.displayCycleCountItem && this.displayCycleCountItem.ExpirationDateFormatted)
        || (this.displayCycleCountItem && this.displayCycleCountItem.ExpirationDateFormatted === "")) {
        if (!(this.datepicker && this.datepicker.isDisabled))
          this.toggleredborderfornonfirstitem(false);
      }
    }
    FormatExpireDate(date: Date) {
      if (date) {
        var date = new Date(date);
        return ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + ((date.getFullYear() == 1) ? 1900 : date.getFullYear());
      }
    }
    CheckItemExpGranularity() {
      return this.displayCycleCountItem && this.displayCycleCountItem.ItmExpDateGranularity != "None" ? false : true;
    }
    onQuantityChange($event) {
      if ($event == "0") {
        this.daterequired = false;
        this.disabledatecomponent(true);
        this.toggleredborderfornonfirstitem(true);
        this.DisableActionButtons(false);
      }
      else {
        this.disabledatecomponent(false);
        var eventdate = new Date(this.datepicker && this.datepicker.selectedDate);
        if (this.datepicker && (this.datepicker.selectedDate === null || this.datepicker.selectedDate === "//" || this.datepicker.selectedDate === "")) {
          this.DisableActionButtons(true);
          this.toggleredborderfornonfirstitem(false);
        }
        else if (this.isdateexpired(this.datepicker && this.datepicker.selectedDate)) {
          this.toggleredborderfornonfirstitem(false);
        }
        else if (isNaN(eventdate.getTime()) && this.displayCycleCountItem.ItmExpDateGranularity !== 'None') {
          this.DisableActionButtons(true);
          this.toggleredborderfornonfirstitem(false);
        }
      }
    }

    onDateChange($event) {
      if ($event === '' || $event === null) {
        this.daterequired = true;
      } else {
        var dateReg = /^\d{2}([./-])\d{2}\1\d{4}$/;
        if ($event.match(dateReg)) {
          var eventdate = new Date($event);
          if (this.isdateexpired($event)) {
            this.daterequired = true;
            this.toggleredborderfornonfirstitem(false);
            this.DisableActionButtons(false);
          }
          else if (isNaN(eventdate.getTime())) {
            this.DisableActionButtons(true);
          }
          else {
            this.daterequired = false;
            this.DisableActionButtons(false);
            this.toggleredborderfornonfirstitem(true);
          }
        }
        else {
          this.daterequired = true;
          this.DisableActionButtons(true);
        }
      }
    }

  
    navigateContinue() {
      if (this.displayCycleCountItem != null) {
      var expireddate = null, actualexpiradationdate = null;
      expireddate = new Date(this.displayCycleCountItem.ExpirationDateFormatted);
      if (this.displayCycleCountItem.ItmExpDateGranularity === "Month") {
        actualexpiradationdate = this.displayCycleCountItem.QuantityOnHand !== 0 ? new Date(expireddate.getFullYear(), expireddate.getMonth() + 1, 0) : null;
      }
      else {
        actualexpiradationdate = this.displayCycleCountItem.QuantityOnHand !== 0 ? new Date(expireddate) : null;
      }
      let update = new deviceCycleCountItemUpdate({
        DeviceLocationId: this.displayCycleCountItem.DeviceLocationId,
        ItemId: this.displayCycleCountItem.ItemId,
        ExpirationDate: actualexpiradationdate,
        QuantityOnHand: this.displayCycleCountItem.QuantityOnHand
      });

      var deviceId = this.activatedRoute.snapshot.queryParamMap.get('deviceId');

      this.guidedManualCycleCountServiceService.post(deviceId, update).subscribe(
        res => {
          console.log(res);
        },err =>{
          console.error(err);
        }
      );
    }
       this.wpfActionController.ExecuteBackAction();
  }

  navigateBack() {
    if(this.displayCycleCountItem!=undefined)
    {
    if (this.displayCycleCountItem.DeviceLocationTypeId === DeviceLocationTypeId.Carousel) {
      this.carouselLocationAccessService.clearLightbar(this.displayCycleCountItem.DeviceId).subscribe();
    }
  }
    this.wpfActionController.ExecuteBackAction();
  }

   handleDeviceLocationAccessResult(deviceLocaitonAccessResult: DeviceLocationAccessResult) {
    if (deviceLocaitonAccessResult == DeviceLocationAccessResult.LeaseNotAvailable) {
      let leaseDeniedMessage$ = this.translateService.get('LEASE_DENIED_MESSAGE', { deviceDescription: this.displayCycleCountItem.DeviceDescription });
      forkJoin(this._leaseDeniedTitle$, leaseDeniedMessage$).subscribe(r => {
        let leaseDeniedPopup = this.displayError('Lease-Denied', r[0], r[1])
        merge(leaseDeniedPopup.didClickCloseButton, leaseDeniedPopup.didClickPrimaryButton).subscribe(() => this.navigateBack());
      });
    }

    if (deviceLocaitonAccessResult == DeviceLocationAccessResult.LeaseNotRequested) {
      this.navigateBack();
    }

    if (deviceLocaitonAccessResult == DeviceLocationAccessResult.Failed) {
      this.carouselFaulted = true;
    } else {
      this.carouselFaulted = false;
    }
  }

  handleLeaseBusyChanged(isBusy: boolean) {
    if (isBusy) {
      this.leaseBusyPopup$ = this.leaseBusyTitle$.pipe(map(x => this.showLeaseDialog(x)), shareReplay(1));
      this.leaseBusyPopup$.subscribe();
    } else {
      this.leaseBusyPopup$.subscribe(x => x.onCloseClicked());
    }
  }

  private showLeaseDialog(title: string): PopupDialogComponent {
    const properties = new PopupDialogProperties('Lease-Busy');
    properties.titleElementText = title;
    properties.showPrimaryButton = false;
    properties.showSecondaryButton = false;
    properties.showCloseIcon = false;
    properties.dialogDisplayType = PopupDialogType.Info;
    properties.timeoutLength = 0;
    properties.component = SpinnerPopupComponent;
    return this.dialogService.showOnce(properties);
  }

  private displayError(uniqueId, title, message): PopupDialogComponent {
    const properties = new PopupDialogProperties(uniqueId);
    properties.titleElementText = title;
    properties.messageElementText = message;
    properties.showPrimaryButton = true;
    properties.primaryButtonText = 'Ok';
    properties.showSecondaryButton = false;
    properties.dialogDisplayType = PopupDialogType.Error;
    properties.timeoutLength = 0;
    return this.dialogService.showOnce(properties);
  } 
  
  // showValidComponent() {
  //   return this.displayCycleCountItem;
  // }

  onSelectionChanged($event){
    if($event != '' && $event != null){
    var eventData = $event.value;
    if(this.cycleCountItems != undefined){
      this.cycleCountItems.subscribe(x =>{
        if(x.length >0){
          for(let i= 0 ; i< x.length ; i++){
            if(x[i].LocationDescription === eventData){
              this.isMultiLocation = false;
              this.displayCycleCountItem = x[i];
              var date = new Date(x[i].ExpirationDate);
              this.displayCycleCountItem.InStockQuantity = x[i].QuantityOnHand;
              this.toggleredborderfornonfirstitem(true);
              this.displayCycleCountItem.ItemDateFormat = DateFormat.mmddyyyy_withslashes;
              this.displayCycleCountItem.ExpirationDateFormatted = (date.getFullYear() == 1) ? '' : ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + ((date.getFullYear() == 1) ? 1900 : date.getFullYear());
              if (this.displayCycleCountItem.ExpirationDateFormatted === "" && this.displayCycleCountItem.QuantityOnHand !== 0)
                this.DisableActionButtons(false);
            }
          }
        }
      },
      () => { this.toggleredborderforfirstitem(); Util.setByTabIndex(this.numericindexes[1]); },
      () => { this.toggleredborderforfirstitem(); Util.setByTabIndex(this.numericindexes[1]); }
      );
    }
  }
}  
private displayUnknownItemDialog(): void {
  const properties = new PopupDialogProperties('Role-Status-Warning');
  this.translateService.get('UNKNOWNITEM_HEADER_TEXT').subscribe(result => { properties.titleElementText = result; });
  this.translateService.get('UNKNOWNITEM_BODY_TEXT').subscribe(result => { properties.messageElementText = result; });
  properties.showPrimaryButton = true;
  properties.showSecondaryButton = false;
  properties.primaryButtonText = 'Ok';
  properties.dialogDisplayType = PopupDialogType.Error;
  properties.timeoutLength = 60;
  this.dialogService.showOnce(properties);
}
  
}
