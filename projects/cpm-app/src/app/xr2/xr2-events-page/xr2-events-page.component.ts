import { Component, OnInit, ViewChild, Output, EventEmitter, AfterViewInit, Pipe, PipeTransform } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { map, switchMap, shareReplay } from 'rxjs/operators';
import { SearchBoxComponent, DaterangeComponent, SingleselectComponent, CheckboxComponent } from '@omnicell/webcorecomponents';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import { SystemConfigurationService } from '../../shared/services/system-configuration.service';
import * as _ from 'lodash';
import { nameof } from '../../shared/functions/nameof';
import { SortDirection } from '../../shared/constants/sort-direction';
import { Many } from 'lodash';
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
  Object = Object;
  searchSub: Subscription;
  eventDetails;
  @ViewChild('searchBox', null) searchElement: SearchBoxComponent;
  @ViewChild('errorsCheckBox', null) errorsCheckBoxElement: CheckboxComponent;
  @ViewChild('warningsCheckBox', null) warningsCheckBoxElement: CheckboxComponent;
  @ViewChild('informationsCheckBox', null) informationsCheckBoxElement: CheckboxComponent;
  @ViewChild('DaterangeComponent', null) dateRange: DaterangeComponent;
  @ViewChild('devicesList', null) devicesList: SingleselectComponent;


  displayFullEventsList$: Observable<Xr2EventsItem[]>;
  displayFilteredList$: Observable<Xr2EventsItem[]>;

  currentSortPropertyName: string = this.eventDateTimePropertyName;
  sortOrder: SortDirection = SortDirection.descending;
  searchTextFilter: string;
  indStartDate = null;
  indEndDate = null;
  searchFields = [this.eventDescriptionPropertyName, this.eventDateTimePropertyName, this.eventDetailsPropertyName];
  deviceList$: Observable<Xr2DevicesList[]>;
  deviceList: SingleselectRowItem[];
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
  informationSelected = true;
  selectionDates: any = [];
  constructor(
    private eventsListService: Xr2EventsService,
    private wpfActionControllerService: WpfActionControllerService,
    private translateService: TranslateService,
    private systemConfigurationService: SystemConfigurationService
  ) {
    this.initalizeHeaders();
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
    this.displayData();
  }

  getEventsData() {
    if (this.selectedDeviceId) {
      this.displayFullEventsList$ = this.eventsListService.getEvents(this.selectedDeviceId && this.selectedDeviceId, this.parseDateFormat(this.indStartDate), this.parseDateFormat(this.indEndDate)).pipe(map(eventsListItems => {
        return this.sort(eventsListItems.map(p => new Xr2EventsItem(p)), SortDirection.descending);
      }), shareReplay(1));
    }
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
    //this.dateRangeControlFillup();
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
    this.displayFilteredList$ = this.displayFilteredList$.pipe(map(events => {
      return this.sort(events, event.SortDirection);
    }));
  }

  sort(devices: Xr2EventsItem[], sortDirection: Many<boolean | "desc" | "asc">): Xr2EventsItem[] {
    return _.orderBy(devices, x => x[this.currentSortPropertyName], sortDirection);
  }

  ngOnDestroy(): void {
    if (this.searchSub) { this.searchSub.unsubscribe(); }
  }

  navigatedetailspage(events: IXr2EventsItem, clickevent: any) {
    this.eventDetails = JSON.parse(events.RobotEventDetails);
  }

  navigateBack() {
    this.wpfActionControllerService.ExecuteBackAction();
  }

  onOutputDeviceSelectionChanged($event) {
    this.clearDetailsData();
    this.resetSearchControl();
    this.resetCheckBoxes();
    this.dateRangeControlFillup();
    this.selectedDeviceId = $event.value;
    this.getEventsData();
    this.displayData();
  }

  clearDetailsData() {
    this.eventDetails = null;
  }

  resetCheckBoxes() {
    this.warningsSelected = true;
    this.errorsSelected = true;
    this.informationSelected = true;
    this.errorsCheckBoxElement.selected = true;
    this.warningsCheckBoxElement.selected = true;
    this.informationsCheckBoxElement.selected = true;
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
    this.systemConfigurationService.GetConfigurationValues('MISC_OPTIONS', 'ROBOTEVENTS').subscribe(result => {
      this.robotEventLatencyPeriod = Number(result.Value);
      if (result) {
        var enddate = new Date();
        this.indStartDate = new Date().setDate(enddate.getDate() - this.robotEventLatencyPeriod);
        this.indEndDate = enddate;
        if (this.dateRange) {
          this.dateRange.startDate = new Date(this.indStartDate);
          this.dateRange.endDate = this.indEndDate;
          //this.selectionDates = [this.dateRange.startDate, this.dateRange.endDate];
        }
      }
    });
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
    this.getEventsData();
    this.displayData();
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
