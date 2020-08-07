import { Component, OnInit, ViewChild, Output, EventEmitter, AfterViewInit, Pipe, PipeTransform } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { map, switchMap, shareReplay } from 'rxjs/operators';
import { SearchBoxComponent, DaterangeComponent, SingleselectDropdownModule, SingleselectComponent, CheckboxComponent } from '@omnicell/webcorecomponents';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import { SystemConfigurationService } from '../../shared/services/system-configuration.service';
import * as _ from 'lodash';
import { nameof } from '../../shared/functions/nameof';
import { SortDirection } from '../../shared/constants/sort-direction';
import { Many} from 'lodash';
import { Xr2EventsService } from '../../api-xr2/services/xr2-events.service';
import { IXr2EventsItem } from '../../api-xr2/data-contracts/i-xr2-events-item';
import { Xr2EventsItem } from '../model/xr2-events-item';
import { TranslateService } from '@ngx-translate/core';
import { Xr2DevicesList } from '../model/xr2-devices-list';
import { SingleselectRowItem } from '../../core/model/SingleselectRowItem';

@Component({
  selector: 'app-xr2-events-page',
  templateUrl: './xr2-events-page.component.html',
  styleUrls: ['./xr2-events-page.component.scss']
})

export class Xr2EventsPageComponent implements OnInit, AfterViewInit {
  readonly eventLevelPropertyName = nameof<Xr2EventsItem>("EventLevel");
  readonly eventDescriptionPropertyName = nameof<Xr2EventsItem>("EventDescription");
  readonly eventDateTimePropertyName = nameof<Xr2EventsItem>("EventDateTime");
  readonly eventDetailsPropertyName = nameof<Xr2EventsItem>("RobotEventDetails");
  readonly eventActiveName = nameof<Xr2EventsItem>("Active");
  readonly robotEventId = nameof<Xr2EventsItem>("RobotEventId");
  Object = Object;
  searchSub: Subscription;
  eventDetails;
  @ViewChild('searchBox', null) searchElement: SearchBoxComponent;
  @ViewChild('errorsCheckBox', null) errorsCheckBoxElement: CheckboxComponent;
  @ViewChild('warningsCheckBox', null) warningsCheckBoxElement: CheckboxComponent;
  @ViewChild('informationsCheckBox', null) informationsCheckBoxElement: CheckboxComponent;
  @ViewChild('dateRange', null) dateRange: DaterangeComponent;
  @ViewChild('devicesList', null) devicesList: SingleselectComponent;


  displayFullEventsList$: Observable<Xr2EventsItem[]>;
  displayFilteredList$: Observable<Xr2EventsItem[]>;

  currentSortPropertyName: string = this.eventDateTimePropertyName;
  sortOrder: SortDirection = SortDirection.descending;
  searchTextFilter: string;
  indStartDate = null;
  indEndDate = null;
  searchFields = [this.eventDescriptionPropertyName, this.eventDetailsPropertyName];
  deviceList$: Observable<Xr2DevicesList[]>;
  deviceList: SingleselectRowItem[];
  currentEvents: IXr2EventsItem[];
  selectedDeviceId: number;
  startDate: Date = new Date();
  endDate: Date = new Date();
  dateRangeHeader$;
  startDateHeader$;
  endDateHeader$;
  errorsHeader$;
  warningsHeader$;
  informationHeader$;
  selectDeviceHeader$;
  searchDescription$;
  eventListDescriptionHeader$;
  eventListDateHeader$;
  eventDetailDefinition$;
  eventDetailsValue$;
  warningIconDisplay = false;
  criticalIconDisplay = false;
  informationIconDisplay = false;
  selectedStatus: any;
  robotEventLatencyPeriod: number;
  warningsSelected = true;
  errorsSelected = true;
  informationSelected = false;
  selectionDates: any = [];
  HighlightRow: any;
  ClickedRow: any;
  firstTime = true;
  constructor(
    private eventsListService: Xr2EventsService,
    private wpfActionControllerService: WpfActionControllerService,
    private translateService: TranslateService,
    private systemConfigurationService: SystemConfigurationService
  ) {
    this.initalizeHeaders();
    this.ClickedRow = function (index) {
      this.HighlightRow = index;
    }
  }

  ngOnInit() {
    this.deviceList$ = this.eventsListService.getxr2devices().pipe(map(traytypelistitems => {
      return traytypelistitems.map<Xr2DevicesList>(p => new Xr2DevicesList(p));
    }), shareReplay(1));
    this.deviceList$ && this.deviceList$.subscribe(x => {
      this.dateRangeControlFillup();
      this.fillDevices(x);
      this.getData();
    });
  }

  fillDevices(x: Xr2DevicesList[]) {
    this.deviceList = [];
    for (let i = 0; i < x.length; i++) {
      let location = new SingleselectRowItem();
      location.text = x[i].DeviceDescription;
      location.value = x[i].DeviceId.toString();
      location.Visible = true;
      this.deviceList && this.deviceList.push(location && location);
    }
  }

  getData() {
    if (this.deviceList && this.deviceList.length === 1) {
      this.selectedStatus = {
        text: this.deviceList[0].text,
        value: this.deviceList[0].value
      }
      this.selectedDeviceId = parseInt(this.deviceList[0].value);
      this.getEventsData();
    }
  }

  getEventsData() {
    if (this.selectedDeviceId) {
      this.displayFullEventsList$ = this.eventsListService.getEvents(this.selectedDeviceId && this.selectedDeviceId, this.parseDateFormat(this.indStartDate), this.parseDateFormat(this.indEndDate)).pipe(map(eventsListItems => {
        return this.sort(eventsListItems.map(p => new Xr2EventsItem(p)), SortDirection.descending);
      }), shareReplay(1));
    }
    this.displayFullEventsList$ && this.displayFullEventsList$.subscribe(x => {
      this.displayData();
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
        if(this.searchTextFilter !== ''){
          this.preventSearchData(this.searchTextFilter);
        }
      });
  }

  initalizeHeaders() {
    this.translateService.get('XR2_EVENTS_DATERANGE_HEADER').subscribe(result => { this.dateRangeHeader$ = result; });
    this.translateService.get('XR2_EVENTS_START_DATE').subscribe(result => { this.startDateHeader$ = result; });
    this.translateService.get('XR2_EVENTS_END_DATE').subscribe(result => { this.endDateHeader$ = result; });
    this.translateService.get('XR2_EVENTS_ERRORS').subscribe(result => { this.errorsHeader$ = result; });
    this.translateService.get('XR2_EVENTS_WARNINGS').subscribe(result => { this.warningsHeader$ = result; });
    this.translateService.get('XR2_EVENTS_INFORMATION').subscribe(result => { this.informationHeader$ = result; });
    this.translateService.get('DEVICE_SELECTION_TEXT').subscribe(result => { this.selectDeviceHeader$ = result; });
    this.translateService.get('XR2_EVENT_SEARCH_DESCRIPTION').subscribe(result => { this.searchDescription$ = result; });
    this.translateService.get('XR2_EVENTS_LIST_DESCRIPTION').subscribe(result => { this.eventDetailDefinition$ = result; });
    this.translateService.get('XR2_EVENTS_LIST_DATETIME').subscribe(result => { this.eventDetailsValue$ = result; });

  }

  columnSelected(event: IColHeaderSortChanged) {
    this.currentSortPropertyName = event.ColumnPropertyName;
    this.sortOrder = event.SortDirection;
    if (this.displayFilteredList$) {
      this.displayFilteredList$ = this.displayFilteredList$.pipe(map(events => {
        return this.sort(events, event.SortDirection);
      }));
    }
  }

  sort(devices: Xr2EventsItem[], sortDirection: Many<boolean | "desc" | "asc">): Xr2EventsItem[] {
    this.addactiveflag(devices);
    return _.orderBy(devices, x => x[this.currentSortPropertyName], sortDirection);
  }

  addactiveflag(items: Xr2EventsItem[]) {
    if (this.firstTime) {
      for (let item of items) {
        item.Active = false;
      }
      this.firstTime = false;
    }
  }

  ngOnDestroy(): void {
    if (this.searchSub) { this.searchSub.unsubscribe(); }
  }

  navigatedetailspage(events: IXr2EventsItem, clickevent: any) {
    let xr2events: IXr2EventsItem[];
    this.displayFilteredList$.subscribe((data) => { xr2events = data });
    if (xr2events.length > 0) {
      this.currentEvents = xr2events;
      xr2events.forEach(function (element) {
        if (element.RobotEventId !== events.RobotEventId) {
           element.Active = false;
        }
        if (element.RobotEventId === events.RobotEventId) {
           element.Active = true;
        }
      });
      this.displayFilteredList$ = of(xr2events);
    }
    this.eventDetails = JSON.parse(events.RobotEventDetails);
  }

  stopclearingdetailsofactiveitem(): boolean {
    return true;
  }
  onOutputDeviceSelectionChanged($event) {
    this.selectedDeviceId = $event.value;
    this.firstTime = true;
    this.clearDetailsData();
    this.resetSearchControl();
    this.resetCheckBoxes();
    this.dateRangeControlFillup();
  }

  clearDetailsData() {
    this.eventDetails = null;
  }

  preventSearchData(searchData:string){
    let filterEvents: IXr2EventsItem[] = [];
    let searchString = searchData;
    if(this.currentEvents !== undefined && this.currentEvents.length > 0){
      for (let index = 0; index < this.currentEvents.length; index++) {
        const element = this.currentEvents[index];
        let eventDescription = element.EventDescription.toLowerCase();
        let eventDetails = JSON.parse(JSON.stringify(element.RobotEventDetails, function(a, b) {
          return typeof b === "string" ? b.toLowerCase() : b
        }));
        if(eventDescription.includes(searchString)|| eventDetails.includes(searchString)){
          filterEvents.push(element);
        }
      }
      for (let index = 0; index < filterEvents.length; index++) {
        const element = filterEvents[index];
        if(element.Active === true){
          this.eventDetails = JSON.parse(element.RobotEventDetails);
        }
      }
    }
  }

  resetCheckBoxes() {
    this.warningsSelected = true;
    this.errorsSelected = true;
    this.informationSelected = false;
    this.errorsCheckBoxElement.selected = true;
    this.warningsCheckBoxElement.selected = true;
    this.informationsCheckBoxElement.selected = false;
  }

  resetSearchControl() {
    if (this.searchElement) {
      this.searchElement.placeHolderText = this.searchDescription$;
      this.searchElement.data = "";
      this.searchTextFilter = "";
      this.searchElement.clearSearch(event);
    }

  }

  dateRangeControlFillup() {
    var enddate = new Date();
    var startdate = new Date();
    this.indStartDate = startdate;
    this.indEndDate = enddate;
    this.getEventsData();
  }

  onErrorsSelect($event) {
    this.errorsSelected = $event.selectedState;
    this.displayData();
  }

  onWarningsSelect($event) {
    this.warningsSelected = $event.selectedState;
    this.displayData();
  }

  onInformationsSelect($event) {
    this.informationSelected = $event.selectedState;
    this.displayData();
  }

  onStartDateChange(date) {
    this.startDate = date;
  }

  onEndDateChange(date) {
    this.endDate = date;
    this.firstTime = true;
    this.getEventsData();
  }

  enterKeyed(event) {
    event.preventDefault();
    this.clearDetailsData();
  }
  
  parseDateFormat(param): string {
    var date = new Date(param);
    var strDate;
    if (param) {
      strDate = (date.getFullYear() === 1) ? '' : ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + ((date.getFullYear() == 1) ? 1900 : date.getFullYear());
    }
    else {
      strDate = "Date Not Selected";
    }
    return strDate;
  }
  displayData() {
    this.clearDetailsData();
    if (this.displayFullEventsList$) {
      this.displayFilteredList$ = this.displayFullEventsList$;
      if (this.errorsCheckBoxElement.selected && this.warningsCheckBoxElement.selected && this.informationsCheckBoxElement.selected) {
        this.displayFilteredList$ = this.displayFullEventsList$;
      }
      else if (this.errorsCheckBoxElement.selected && !(this.warningsCheckBoxElement.selected) && !(this.informationsCheckBoxElement.selected)) {
        this.displayFilteredList$ = this.displayFilteredList$.pipe(map(eventsListItems => {
          return this.sort(eventsListItems.filter(item => item.EventSeverity === 2).map(p => new Xr2EventsItem(p)), SortDirection.descending);
        }), shareReplay(1));
      }
      else if (!(this.errorsCheckBoxElement.selected) && this.warningsCheckBoxElement.selected && !(this.informationsCheckBoxElement.selected)) {
        this.displayFilteredList$ = this.displayFilteredList$.pipe(map(eventsListItems => {
          return this.sort(eventsListItems.filter(item => item.EventSeverity === 4).map(p => new Xr2EventsItem(p)), SortDirection.descending);
        }), shareReplay(1));
      }
      else if (!(this.errorsCheckBoxElement.selected) && !(this.warningsCheckBoxElement.selected) && (this.informationsCheckBoxElement.selected)) {
        this.displayFilteredList$ = this.displayFilteredList$.pipe(map(eventsListItems => {
          return this.sort(eventsListItems.filter(item => item.EventSeverity === 3).map(p => new Xr2EventsItem(p)), SortDirection.descending);
        }), shareReplay(1));
      }
      else if ((this.errorsCheckBoxElement.selected) && this.warningsCheckBoxElement.selected && !(this.informationsCheckBoxElement.selected)) {
        this.displayFilteredList$ = this.displayFilteredList$.pipe(map(eventsListItems => {
          return this.sort(eventsListItems.filter(item => item.EventSeverity === 2 || item.EventSeverity === 4).map(p => new Xr2EventsItem(p)), SortDirection.descending);
        }), shareReplay(1));
      }
      else if (!(this.errorsCheckBoxElement.selected) && (this.warningsCheckBoxElement.selected) && (this.informationsCheckBoxElement.selected)) {
        this.displayFilteredList$ = this.displayFilteredList$.pipe(map(eventsListItems => {
          return this.sort(eventsListItems.filter(item => item.EventSeverity === 3 || item.EventSeverity === 4).map(p => new Xr2EventsItem(p)), SortDirection.descending);
        }), shareReplay(1));
      }
      else if ((this.errorsCheckBoxElement.selected) && !(this.warningsCheckBoxElement.selected) && (this.informationsCheckBoxElement.selected)) {
        this.displayFilteredList$ = this.displayFilteredList$.pipe(map(eventsListItems => {
          return this.sort(eventsListItems.filter(item => item.EventSeverity === 2 || item.EventSeverity === 3).map(p => new Xr2EventsItem(p)), SortDirection.descending);
        }), shareReplay(1));
      }
      else {
        this.displayFilteredList$ = this.displayFilteredList$.pipe(map(eventsListItems => {
          return this.sort(eventsListItems.filter(item => item.EventSeverity !== 2 && item.EventSeverity !== 3 && item.EventSeverity !== 4).map(p => new Xr2EventsItem(p)), SortDirection.descending);
        }), shareReplay(1));
      }
    }
  }

}
