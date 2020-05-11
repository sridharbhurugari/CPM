import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { ActivatedRoute } from '@angular/router';
import { Observable, forkJoin, merge, from } from 'rxjs';
import { NumericComponent, DatepickerComponent, ButtonActionComponent, DateFormat, Util, PopupDialogService, PopupDialogComponent, PopupDialogProperties, PopupDialogType } from '@omnicell/webcorecomponents';
import { SearchBoxComponent,SearchDropdownInputData,SearchDropdownOutputData,SearchBoxAlign,SearchDropdownComponent,SearchDropDownColumnTemplate } from '@omnicell/webcorecomponents';
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

@Component({
  selector: 'app-guidedinvmgmt-manualcyclecount-page',
  templateUrl: './guidedinvmgmt-manualcyclecount-page.component.html',
  styleUrls: ['./guidedinvmgmt-manualcyclecount-page.component.scss']
})
export class GuidedinvmgmtManualcyclecountPageComponent implements OnInit,AfterViewInit {
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
  //cycleCountItemsCopy: IGuidedCycleCount[];
  isLastItem: boolean;
  doneButtonDisable: boolean;
  daterequired: boolean;
  disablethedate: boolean;
  todaydate: string;
  numericfocus: boolean;
  numericindexes = ['', 1, ''];
  datepickerindexes = [2, 3, 4, ''];
  public time: Date = new Date();
  route: any;
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
  ) { 
    setInterval(() => {
      this.time = new Date();
    }, 1);
   // this.itemCount = 0;
   // this.currentItemCount = 0;
    this.doneButtonDisable = false;
    this.daterequired = false;
    this.disablethedate = false;
    this.numericfocus = false;
    this.todaydate = this.time.getMonth() + "/" + this.time.getDate() + "/" + this.time.getFullYear();
    this.leaseBusyTitle$ = translateService.get('LEASE_BUSY_TITLE');
    this.leaseBusyMessage$ = translateService.get('LEASE_BUSY_MESSAGE');
    this._leaseDeniedTitle$ = translateService.get('DEVICE_ACCESS');
  }

  ngOnInit() {
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
  }
  ngAfterViewChecked() {
    this.toggleredborderforfirstitem();

  }
  // Output from the Dropdown Search Item Click
  itemSelected(item: any) {
    console.log(item);
    this.selectedItem = JSON.stringify(item); 
    this.getCycleCountData("8939");
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
  
          this.toggleredborderfornonfirstitem(true);
          this.displayCycleCountItem.ItemDateFormat = DateFormat.mmddyyyy_withslashes;
          this.displayCycleCountItem.ExpirationDateFormatted = (date.getFullYear() == 1) ? '' : ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + ((date.getFullYear() == 1) ? 1900 : date.getFullYear());
          if (this.displayCycleCountItem.ExpirationDateFormatted === "" && this.displayCycleCountItem.QuantityOnHand !== 0)
            this.DisableActionButtons(true);
         // this.cycleCountItemsCopy = x;
         // x.splice(0, 1);
         // this.itemCount = x.length + 1;
        }
       // this.IsLastItem();
       // this.currentItemCount++;
      },
        () => { this.toggleredborderforfirstitem(); Util.setByTabIndex(this.numericindexes[1]); },
        () => { this.toggleredborderforfirstitem(); Util.setByTabIndex(this.numericindexes[1]); }
      )
    }

    DisableActionButtons(value: boolean) {
      if (this.isLastItem === true) this.doneButtonDisable = value;
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

    
  
}
