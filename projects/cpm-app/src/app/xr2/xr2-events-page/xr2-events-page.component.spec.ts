import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, EventEmitter } from "@angular/core";
import { Xr2EventsPageComponent } from './xr2-events-page.component';
import { MockTranslatePipe } from '../../core/testing/mock-translate-pipe.spec';
import { GridModule, FooterModule, LayoutModule, SvgIconModule, SearchModule, ButtonActionModule, SingleselectComponent } from '@omnicell/webcorecomponents';
import { of, never, Observable, Subject } from 'rxjs';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { MockColHeaderSortable } from '../../shared/testing/mock-col-header-sortable.spec';
import { MockAppHeaderContainer } from '../../core/testing/mock-app-header.spec';
import { MockSearchPipe } from '../../core/testing/mock-search-pipe.spec';
import { Xr2ExceptionsService } from '../../api-xr2/services/xr2-exceptions.service';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import { Xr2EventsItem } from '../model/xr2-events-item';
import { ActivatedRoute, Router, Params, NavigationExtras, RouterModule } from '@angular/router';
import { map } from 'rxjs/operators';
import { Location } from '@angular/common';
import { ColHeaderSortableComponent } from '../../shared/components/col-header-sortable/col-header-sortable.component';
import { IXr2EventsItem } from '../../api-xr2/data-contracts/i-xr2-events-item';
import { Xr2EventsService } from '../../api-xr2/services/xr2-events.service';
import { SystemConfigurationService } from '../../shared/services/system-configuration.service';
import { TranslateService } from '@ngx-translate/core';
import { IConfigurationValue } from '../../shared/interfaces/i-configuration-value';
import { WpfInteropService } from '../../shared/services/wpf-interop.service';
import { WindowService } from '../../shared/services/window-service';

describe('Xr2EventsPageComponent', () => {
  let component: Xr2EventsPageComponent;
  let fixture: ComponentFixture<Xr2EventsPageComponent>;
  let event: IColHeaderSortChanged = { ColumnPropertyName: "EventDateTime", SortDirection: "asc" };
  let eventSelected: IXr2EventsItem[] = [{
    EventLevel: "c00004", EventDescription: "5", EventDateTime: "2020-06-01 07:41:19.763", EventDeviceName: "", RobotEventDetails:
      "{'RobotEventDetailId':10002,'EventValue':'2','eventname':'PARAMETER_TYPE_CTRLMODE_CURR_PROCESS','EventDefinition':'PARAMETER_TYPE_CTRLMODE_CURR_PROCESS'},{'RobotEventDetailId':10003,'EventValue':'0','eventname':'PARAMETER_TYPE_SYSCTRL_DISPENSE_DEVICE','EventDefinition':'PARAMETER_TYPE_SYSCTRL_DISPENSE_DEVICE'},{'RobotEventDetailId':10004,'EventValue':'Bagger disabled.','eventname':'PARAMETER_TYPE_DESCRIPTION','EventDefinition':'PARAMETER_TYPE_DESCRIPTION'},{'RobotEventDetailId':10005,'EventValue':'Robot Control','eventname':'PARAMETER_TYPE_CONTROL_SYSTEM_NAME','EventDefinition':'Control System Name'},{'RobotEventDetailId':10006,'EventValue':'Bagger Disable','eventname':'PARAMETER_TYPE_CONTROL_PROCESS_NAME','EventDefinition':'Control Process Name'},{'RobotEventDetailId':10007,'EventValue':'3.7104999992152443','eventname':'PARAMETER_TYPE_TIME_ELAPSED','EventDefinition':'Time Elapsed'}",
    EventSeverity: 3,Active:false,RobotEventId:10010
  },
  {
    EventLevel: "c00004", EventDescription: "5", EventDateTime: "2020-06-01 07:41:19.763", EventDeviceName: "", RobotEventDetails:
      "{'RobotEventDetailId':10002,'EventValue':'2','eventname':'PARAMETER_TYPE_CTRLMODE_CURR_PROCESS','EventDefinition':'PARAMETER_TYPE_CTRLMODE_CURR_PROCESS'},{'RobotEventDetailId':10003,'EventValue':'0','eventname':'PARAMETER_TYPE_SYSCTRL_DISPENSE_DEVICE','EventDefinition':'PARAMETER_TYPE_SYSCTRL_DISPENSE_DEVICE'},{'RobotEventDetailId':10004,'EventValue':'Bagger disabled.','eventname':'PARAMETER_TYPE_DESCRIPTION','EventDefinition':'PARAMETER_TYPE_DESCRIPTION'},{'RobotEventDetailId':10005,'EventValue':'Robot Control','eventname':'PARAMETER_TYPE_CONTROL_SYSTEM_NAME','EventDefinition':'Control System Name'},{'RobotEventDetailId':10006,'EventValue':'Bagger Disable','eventname':'PARAMETER_TYPE_CONTROL_PROCESS_NAME','EventDefinition':'Control Process Name'},{'RobotEventDetailId':10007,'EventValue':'3.7104999992152443','eventname':'PARAMETER_TYPE_TIME_ELAPSED','EventDefinition':'Time Elapsed'}",
    EventSeverity: 2,Active:false,RobotEventId:10009
  },
  {
    EventLevel: "c00004", EventDescription: "5", EventDateTime: "2020-06-01 07:41:19.763", EventDeviceName: "", RobotEventDetails:
      "{'RobotEventDetailId':10002,'EventValue':'2','eventname':'PARAMETER_TYPE_CTRLMODE_CURR_PROCESS','EventDefinition':'PARAMETER_TYPE_CTRLMODE_CURR_PROCESS'},{'RobotEventDetailId':10003,'EventValue':'0','eventname':'PARAMETER_TYPE_SYSCTRL_DISPENSE_DEVICE','EventDefinition':'PARAMETER_TYPE_SYSCTRL_DISPENSE_DEVICE'},{'RobotEventDetailId':10004,'EventValue':'Bagger disabled.','eventname':'PARAMETER_TYPE_DESCRIPTION','EventDefinition':'PARAMETER_TYPE_DESCRIPTION'},{'RobotEventDetailId':10005,'EventValue':'Robot Control','eventname':'PARAMETER_TYPE_CONTROL_SYSTEM_NAME','EventDefinition':'Control System Name'},{'RobotEventDetailId':10006,'EventValue':'Bagger Disable','eventname':'PARAMETER_TYPE_CONTROL_PROCESS_NAME','EventDefinition':'Control Process Name'},{'RobotEventDetailId':10007,'EventValue':'3.7104999992152443','eventname':'PARAMETER_TYPE_TIME_ELAPSED','EventDefinition':'Time Elapsed'}",
    EventSeverity: 4,Active:false,RobotEventId:10008
  },
  {
    EventLevel: "c00004", EventDescription: "5", EventDateTime: "2020-06-01 07:41:19.763", EventDeviceName: "", RobotEventDetails:
      "{'RobotEventDetailId':10002,'EventValue':'2','eventname':'PARAMETER_TYPE_CTRLMODE_CURR_PROCESS','EventDefinition':'PARAMETER_TYPE_CTRLMODE_CURR_PROCESS'},{'RobotEventDetailId':10003,'EventValue':'0','eventname':'PARAMETER_TYPE_SYSCTRL_DISPENSE_DEVICE','EventDefinition':'PARAMETER_TYPE_SYSCTRL_DISPENSE_DEVICE'},{'RobotEventDetailId':10004,'EventValue':'Bagger disabled.','eventname':'PARAMETER_TYPE_DESCRIPTION','EventDefinition':'PARAMETER_TYPE_DESCRIPTION'},{'RobotEventDetailId':10005,'EventValue':'Robot Control','eventname':'PARAMETER_TYPE_CONTROL_SYSTEM_NAME','EventDefinition':'Control System Name'},{'RobotEventDetailId':10006,'EventValue':'Bagger Disable','eventname':'PARAMETER_TYPE_CONTROL_PROCESS_NAME','EventDefinition':'Control Process Name'},{'RobotEventDetailId':10007,'EventValue':'3.7104999992152443','eventname':'PARAMETER_TYPE_TIME_ELAPSED','EventDefinition':'Time Elapsed'}",
    EventSeverity: 3,Active:false,RobotEventId:10007
  },
  {
    EventLevel: "c00004", EventDescription: "5", EventDateTime: "2020-06-01 07:41:19.763", EventDeviceName: "", RobotEventDetails:
      "{'RobotEventDetailId':10002,'EventValue':'2','eventname':'PARAMETER_TYPE_CTRLMODE_CURR_PROCESS','EventDefinition':'PARAMETER_TYPE_CTRLMODE_CURR_PROCESS'},{'RobotEventDetailId':10003,'EventValue':'0','eventname':'PARAMETER_TYPE_SYSCTRL_DISPENSE_DEVICE','EventDefinition':'PARAMETER_TYPE_SYSCTRL_DISPENSE_DEVICE'},{'RobotEventDetailId':10004,'EventValue':'Bagger disabled.','eventname':'PARAMETER_TYPE_DESCRIPTION','EventDefinition':'PARAMETER_TYPE_DESCRIPTION'},{'RobotEventDetailId':10005,'EventValue':'Robot Control','eventname':'PARAMETER_TYPE_CONTROL_SYSTEM_NAME','EventDefinition':'Control System Name'},{'RobotEventDetailId':10006,'EventValue':'Bagger Disable','eventname':'PARAMETER_TYPE_CONTROL_PROCESS_NAME','EventDefinition':'Control Process Name'},{'RobotEventDetailId':10007,'EventValue':'3.7104999992152443','eventname':'PARAMETER_TYPE_TIME_ELAPSED','EventDefinition':'Time Elapsed'}",
    EventSeverity: 2,Active:false,RobotEventId:10006
  },
  {
    EventLevel: "c00004", EventDescription: "5", EventDateTime: "2020-06-01 07:41:19.763", EventDeviceName: "", RobotEventDetails:
    "{'RobotEventDetailId':10002,'EventValue':'2','eventname':'PARAMETER_TYPE_CTRLMODE_CURR_PROCESS','EventDefinition':'PARAMETER_TYPE_CTRLMODE_CURR_PROCESS'},{'RobotEventDetailId':10003,'EventValue':'0','eventname':'PARAMETER_TYPE_SYSCTRL_DISPENSE_DEVICE','EventDefinition':'PARAMETER_TYPE_SYSCTRL_DISPENSE_DEVICE'},{'RobotEventDetailId':10004,'EventValue':'Bagger disabled.','eventname':'PARAMETER_TYPE_DESCRIPTION','EventDefinition':'PARAMETER_TYPE_DESCRIPTION'},{'RobotEventDetailId':10005,'EventValue':'Robot Control','eventname':'PARAMETER_TYPE_CONTROL_SYSTEM_NAME','EventDefinition':'Control System Name'},{'RobotEventDetailId':10006,'EventValue':'Bagger Disable','eventname':'PARAMETER_TYPE_CONTROL_PROCESS_NAME','EventDefinition':'Control Process Name'},{'RobotEventDetailId':10007,'EventValue':'3.7104999992152443','eventname':'PARAMETER_TYPE_TIME_ELAPSED','EventDefinition':'Time Elapsed'}",
    EventSeverity: 4,Active:false,RobotEventId:10005
  },
  {
    EventLevel: "c00004", EventDescription: "5", EventDateTime: "2020-06-01 07:41:19.763", EventDeviceName: "", RobotEventDetails:
      "{'RobotEventDetailId':10002,'EventValue':'2','eventname':'PARAMETER_TYPE_CTRLMODE_CURR_PROCESS','EventDefinition':'PARAMETER_TYPE_CTRLMODE_CURR_PROCESS'},{'RobotEventDetailId':10003,'EventValue':'0','eventname':'PARAMETER_TYPE_SYSCTRL_DISPENSE_DEVICE','EventDefinition':'PARAMETER_TYPE_SYSCTRL_DISPENSE_DEVICE'},{'RobotEventDetailId':10004,'EventValue':'Bagger disabled.','eventname':'PARAMETER_TYPE_DESCRIPTION','EventDefinition':'PARAMETER_TYPE_DESCRIPTION'},{'RobotEventDetailId':10005,'EventValue':'Robot Control','eventname':'PARAMETER_TYPE_CONTROL_SYSTEM_NAME','EventDefinition':'Control System Name'},{'RobotEventDetailId':10006,'EventValue':'Bagger Disable','eventname':'PARAMETER_TYPE_CONTROL_PROCESS_NAME','EventDefinition':'Control Process Name'},{'RobotEventDetailId':10007,'EventValue':'3.7104999992152443','eventname':'PARAMETER_TYPE_TIME_ELAPSED','EventDefinition':'Time Elapsed'}",
    EventSeverity: 3,Active:false,RobotEventId:10002
  },
  {
    EventLevel: "c00004", EventDescription: "5", EventDateTime: "2020-06-01 07:41:19.763", EventDeviceName: "", RobotEventDetails:
      "{'RobotEventDetailId':10002,'EventValue':'2','eventname':'PARAMETER_TYPE_CTRLMODE_CURR_PROCESS','EventDefinition':'PARAMETER_TYPE_CTRLMODE_CURR_PROCESS'},{'RobotEventDetailId':10003,'EventValue':'0','eventname':'PARAMETER_TYPE_SYSCTRL_DISPENSE_DEVICE','EventDefinition':'PARAMETER_TYPE_SYSCTRL_DISPENSE_DEVICE'},{'RobotEventDetailId':10004,'EventValue':'Bagger disabled.','eventname':'PARAMETER_TYPE_DESCRIPTION','EventDefinition':'PARAMETER_TYPE_DESCRIPTION'},{'RobotEventDetailId':10005,'EventValue':'Robot Control','eventname':'PARAMETER_TYPE_CONTROL_SYSTEM_NAME','EventDefinition':'Control System Name'},{'RobotEventDetailId':10006,'EventValue':'Bagger Disable','eventname':'PARAMETER_TYPE_CONTROL_PROCESS_NAME','EventDefinition':'Control Process Name'},{'RobotEventDetailId':10007,'EventValue':'3.7104999992152443','eventname':'PARAMETER_TYPE_TIME_ELAPSED','EventDefinition':'Time Elapsed'}",
    EventSeverity: 2,Active:false,RobotEventId:10003
  },
  {
    EventLevel: "c00004", EventDescription: "5", EventDateTime: "2020-06-01 07:41:19.763", EventDeviceName: "", RobotEventDetails:
      "{'RobotEventDetailId':10002,'EventValue':'2','eventname':'PARAMETER_TYPE_CTRLMODE_CURR_PROCESS','EventDefinition':'PARAMETER_TYPE_CTRLMODE_CURR_PROCESS'},{'RobotEventDetailId':10003,'EventValue':'0','eventname':'PARAMETER_TYPE_SYSCTRL_DISPENSE_DEVICE','EventDefinition':'PARAMETER_TYPE_SYSCTRL_DISPENSE_DEVICE'},{'RobotEventDetailId':10004,'EventValue':'Bagger disabled.','eventname':'PARAMETER_TYPE_DESCRIPTION','EventDefinition':'PARAMETER_TYPE_DESCRIPTION'},{'RobotEventDetailId':10005,'EventValue':'Robot Control','eventname':'PARAMETER_TYPE_CONTROL_SYSTEM_NAME','EventDefinition':'Control System Name'},{'RobotEventDetailId':10006,'EventValue':'Bagger Disable','eventname':'PARAMETER_TYPE_CONTROL_PROCESS_NAME','EventDefinition':'Control Process Name'},{'RobotEventDetailId':10007,'EventValue':'3.7104999992152443','eventname':'PARAMETER_TYPE_TIME_ELAPSED','EventDefinition':'Time Elapsed'}",
    EventSeverity: 4,Active:false,RobotEventId:10004
  },

];
  //let eventSelected: IXr2EventsItem = {};
  let router: Partial<Router>;
  let xr2EventsService: Partial<Xr2EventsService>;
  let wpfActionControllerService: Partial<WpfActionControllerService>;
  let systemConfigurationService: Partial<SystemConfigurationService>;
  let translateService: Partial<TranslateService>;
  beforeEach(async(() => {
    xr2EventsService = {
      getEvents: () => of([]),
      getxr2devices: () => of([])
    };

    wpfActionControllerService = {
      ExecuteWpfContinueNavigationAction: jasmine.createSpy('ExecuteWpfContinueNavigationAction'),
      ExecuteContinueNavigationAction: jasmine.createSpy('ExecuteContinueNavigationAction')
    };

    systemConfigurationService = { GetConfigurationValues: () => of() };


    TestBed.configureTestingModule({
      declarations: [Xr2EventsPageComponent, MockTranslatePipe,
        MockColHeaderSortable, MockAppHeaderContainer, MockSearchPipe],
      imports: [GridModule, FooterModule, LayoutModule, SearchModule, ButtonActionModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: Xr2EventsService, useValue: xr2EventsService },
        { provide: WpfActionControllerService, useValue: wpfActionControllerService },
        { provide: SystemConfigurationService, useValue: systemConfigurationService },
        {
          provide: TranslateService,
          useValue: { get: (x: string) => of(`{x}_TRANSLATED`) },
        },
        { provide: WpfInteropService, useValue: { wpfViewModelActivated: new Subject() } },
        { provide: WindowService, useValue: { getHash: () => '' } },
      ]
    })
      .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Xr2EventsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.displayFullEventsList$ = of(eventSelected);
    component.displayFilteredList$ = component.displayFullEventsList$ ;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should clear details view', () => {
    component.clearDetailsData();
  });
  it('should reset check boxes', () => {
    component.resetCheckBoxes();
  });
  it('should reset search control', () => {
    component.resetSearchControl();
  });
  it('should display the data', () => {
    component.displayData();
  });
  it('column selected ', () => {
    component.displayFilteredList$ && component.displayFilteredList$.source;
    component.displayFilteredList$ = component.displayFilteredList$ && component.displayFilteredList$.pipe(map(events => {
      return this.sort(events, "desc");
    }));
    expect(component.columnSelected(event));
  });

  it('should display the selected event details', () =>{
    component.displayFilteredList$ && component.displayFilteredList$.source;
    component.currentEvents = eventSelected;
    component.searchTextFilter = 'abc';
    component.preventSearchData(component.searchTextFilter);
  });

  it('should display the selected record event details', () =>{
    component.displayFilteredList$ && component.displayFilteredList$.source;
    component.currentEvents = eventSelected;
    component.displaySelectedRecordDetails();
  });

  it('should Clear the selected event description and details', () =>{
    component.displayFilteredList$ && component.displayFilteredList$.source;
    component.currentEvents = eventSelected;
    component.clearFocus();
  });

  it('should display the selected event details', () =>{
    component.displayFilteredList$ && component.displayFilteredList$.source;
    component.currentEvents = eventSelected;
    component.stopclearingdetailsofactiveitem();
  });

  it('should not clear the selected event details', () =>{
    component.displayFilteredList$ && component.displayFilteredList$.source;
    component.currentEvents = eventSelected;
    const keyEvent = new KeyboardEvent('keydown', { code: 'KeyA' });
    component.enterKeyed(keyEvent);
  });

  it('should display the details of errors check box checked', () => {
    let errorEvent: any = { selectedState: true };
    component.onErrorsSelect(errorEvent);

  });
  it('should display the details of warnings check box checked', () => {
    let errorEvent: any = { selectedState: true };
    component.onWarningsSelect(errorEvent);

  });
  it('should display the details of information check box checked', () => {
    let errorEvent: any = { selectedState: true };
    component.onInformationsSelect(errorEvent);

  });
  it('should display the list with dates being selcted', () => {
    component.dateRangeControlFillup();

  });
  it('should display the list with device being changed', () => {
    let errorEvent: any = { value: 9 };
    component.onOutputDeviceSelectionChanged(errorEvent);

  });
  
  it('should parse date string to expected format', () => {
    let date: string = "07/22/2020";
    component.parseDateFormat(date);
  });
  it('should parse date string to expected format', () => {
    let date;
    component.parseDateFormat(date);
  });
  it('should assign start date to the components start date', () => {
    let date = "07/22/2020 12:00:00 AM";
    component.onStartDateChange(date);
  });
  it('should parse date string to expected format', () => {
    let date = "07/31/2020 12:00:00 AM";
    component.onEndDateChange(date);
  });
  it('should parse date string to expected format', () => {
    let date = "07/31/2020 12:00:00 AM";
    component.onEndDateChange(date);
  });
  it('should display list with no filters applied', () => {
    component.errorsCheckBoxElement.selected = true;
    component.warningsCheckBoxElement.selected = true;
    component.informationsCheckBoxElement.selected = true;
    component.displayData();
  });
  it('should parse date string to expected format', () => {
    component.displayFilteredList$ = component.displayFullEventsList$ ;
    spyOn(xr2EventsService,'getEvents').and.callThrough();
    component.errorsCheckBoxElement.selected = true;
    component.warningsCheckBoxElement.selected = false;
    component.informationsCheckBoxElement.selected = false;
    component.displayData();
  });
  it('should parse date string to expected format', () => {
    component.errorsCheckBoxElement.selected = true;
    component.warningsCheckBoxElement.selected = true;
    component.informationsCheckBoxElement.selected = false;
    component.displayData();
  });
  it('should parse date string to expected format', () => {
    component.errorsCheckBoxElement.selected = false;
    component.warningsCheckBoxElement.selected = false;
    component.informationsCheckBoxElement.selected = true;
    component.displayData();
  });
  it('should parse date string to expected format', () => {
    component.errorsCheckBoxElement.selected = true;
    component.warningsCheckBoxElement.selected = true;
    component.informationsCheckBoxElement.selected = false;
    component.displayData();
  });
  it('should parse date string to expected format', () => {
    component.errorsCheckBoxElement.selected = false;
    component.warningsCheckBoxElement.selected = true;
    component.informationsCheckBoxElement.selected = true;
    component.displayData();
  });
  it('should parse date string to expected format', () => {
    component.errorsCheckBoxElement.selected = true;
    component.warningsCheckBoxElement.selected = false;
    component.informationsCheckBoxElement.selected = true;
    component.displayData();
  });
  it('should parse date string to expected format', () => {
    component.errorsCheckBoxElement.selected = false;
    component.warningsCheckBoxElement.selected = true;
    component.informationsCheckBoxElement.selected = false;
    component.displayData();
  });
});
