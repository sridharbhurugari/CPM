import { Component, OnInit,  ViewChild, Output, EventEmitter,AfterViewInit} from '@angular/core';
import { Xr2ExceptionsItem } from '../model/xr2-exceptions-item';
import { Observable, of,Subscription } from 'rxjs';
import { map, switchMap, shareReplay } from 'rxjs/operators';
import { SearchBoxComponent,DaterangeModule, DaterangeComponent, SingleselectRowItem } from '@omnicell/webcorecomponents';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import * as _ from 'lodash';
import { nameof } from '../../shared/functions/nameof';
import { SortDirection } from '../../shared/constants/sort-direction';
import { Many } from 'lodash';
import { Xr2ExceptionsService } from '../../api-xr2/services/xr2-exceptions.service';
import { ColHeaderSortableComponent } from '../../shared/components/col-header-sortable/col-header-sortable.component';
import { IXr2ExceptionsItem } from '../../api-xr2/data-contracts/i-xr2-exception-item';
import { IXr2EventsItem } from '../../api-xr2/data-contracts/i-xr2-events-item';
import { Xr2EventsItem } from '../model/xr2-events-item';
@Component({
  selector: 'app-xr2-exceptions-page',
  templateUrl: './xr2-events-page.component.html',
  styleUrls: ['./xr2-events-page.component.scss']
})

export class Xr2EventsPageComponent implements OnInit, AfterViewInit {
  readonly eventLevelPropertyName = nameof<Xr2EventsItem>("EventLevel");
  readonly eventDescriptionPropertyName = nameof<Xr2EventsItem>("EventDescription");
  readonly eventDateTimePropertyName = nameof<Xr2EventsItem>("EventDateTime");
  readonly eventDeviceNamePropertyName = nameof<Xr2EventsItem>("EventDeviceName");
  searchSub: Subscription;
  eventDetails:string="";
  @ViewChild('searchBox', null) searchElement: SearchBoxComponent;
  @ViewChild('DaterangeComponent',null) daterange: DaterangeComponent;
  displayEventsList$: IXr2EventsItem[] = 
  [{"EventLevel":"Warning","EventDescription":"Medication Dropped by Robot","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Dropped by Robot","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Dropped by Robot","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Dropped by Robot","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Dropped by Robot","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Dropped by Robot","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Dropped by Robot","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Dropped by Robot","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Dropped by Robot","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Dropped by Robot","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Dropped by Robot","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Dropped by Robot","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Dropped by Robot","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Dropped by Robot","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Dropped by Robot","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Dropped by Robot","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Dropped by Robot","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Dropped by Robot","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Dropped by Robot","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Dropped by Robot","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Dropped by Robot","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Dropped by Robot","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Dropped by Robot","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Dropped by Robot","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Dropped by Robot","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Dropped by Robot","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Dropped by Robot","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Dropped by Robot","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Dropped by Robot","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Dropped by Robot","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Dropped by Robot","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Dropped by Robot","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Dropped by Robot","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Dropped by Robot","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Dropped by Robot","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Dropped by Robot","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Dropped by Robot","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Dropped by Robot","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Dropped by Robot","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Dropped by Robot","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Dropped by Robot","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Dropped by Robot","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Dropped by Robot","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Dropped by Robot","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Dropped by Robot","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Dropped by Robot","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Dropped by Robot","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Dropped by Robot","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Dropped by Robot","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Dropped by Robot","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Could Not Be Picked","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Could Not Be Picked","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Could Not Be Picked","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Could Not Be Picked","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Could Not Be Picked","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Could Not Be Picked","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Could Not Be Picked","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Could Not Be Picked","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Could Not Be Picked","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Could Not Be Picked","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Could Not Be Picked","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Could Not Be Picked","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Could Not Be Picked","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Could Not Be Picked","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Could Not Be Picked","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Could Not Be Picked","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Could Not Be Picked","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Could Not Be Picked","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Could Not Be Picked","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Could Not Be Picked","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Could Not Be Picked","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Could Not Be Picked","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Could Not Be Picked","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Could Not Be Picked","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Could Not Be Picked","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Could Not Be Picked","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Could Not Be Picked","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Could Not Be Picked","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Could Not Be Picked","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Could Not Be Picked","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Could Not Be Picked","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Could Not Be Picked","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Could Not Be Picked","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Could Not Be Picked","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Could Not Be Picked","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Could Not Be Picked","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Could Not Be Picked","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Could Not Be Picked","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Could Not Be Picked","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Could Not Be Picked","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Could Not Be Picked","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Could Not Be Picked","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Could Not Be Picked","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Could Not Be Picked","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Could Not Be Picked","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Could Not Be Picked","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Could Not Be Picked","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Could Not Be Picked","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Could Not Be Picked","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Warning","EventDescription":"Medication Dropped by Robot","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Med Unpickable Event - Med Lost"},
  {"EventLevel":"Information","EventDescription":"Old Full Database backups deleted successfully","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"Full Database backup completed successfully","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"File maintenance task cleanup completed successfully","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"File maintenance job not enabled \ configured","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"sample","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"sample","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"sample","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"sample","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"sample","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"sample","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"Old Full Database backups deleted successfully","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"Full Database backup completed successfully","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"File maintenance task cleanup completed successfully","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"File maintenance job not enabled \ configured","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"sample","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"sample","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"sample","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"sample","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"sample","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"sample","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"Old Full Database backups deleted successfully","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"Full Database backup completed successfully","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"File maintenance task cleanup completed successfully","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"File maintenance job not enabled \ configured","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"sample","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"sample","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"sample","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"sample","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"sample","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"sample","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"Old Full Database backups deleted successfully","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"Full Database backup completed successfully","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"File maintenance task cleanup completed successfully","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"File maintenance job not enabled \ configured","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"sample","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"sample","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"sample","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"sample","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"sample","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"sample","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"Old Full Database backups deleted successfully","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"Full Database backup completed successfully","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"File maintenance task cleanup completed successfully","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"File maintenance job not enabled \ configured","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"sample","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"sample","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"sample","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"sample","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"sample","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"sample","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},{"EventLevel":"Information","EventDescription":"Old Full Database backups deleted successfully","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"Full Database backup completed successfully","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"File maintenance task cleanup completed successfully","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"File maintenance job not enabled \ configured","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"sample","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"sample","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"sample","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"sample","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"sample","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"sample","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},{"EventLevel":"Information","EventDescription":"Old Full Database backups deleted successfully","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"Full Database backup completed successfully","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"File maintenance task cleanup completed successfully","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"File maintenance job not enabled \ configured","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"sample","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"sample","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"sample","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"sample","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"sample","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"sample","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},{"EventLevel":"Information","EventDescription":"Old Full Database backups deleted successfully","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"Full Database backup completed successfully","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"File maintenance task cleanup completed successfully","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"File maintenance job not enabled \ configured","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"sample","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"sample","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"sample","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"sample","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"sample","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"sample","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},{"EventLevel":"Information","EventDescription":"Old Full Database backups deleted successfully","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"Full Database backup completed successfully","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"File maintenance task cleanup completed successfully","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"File maintenance job not enabled \ configured","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"sample","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"sample","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"sample","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"sample","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"sample","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"sample","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},{"EventLevel":"Information","EventDescription":"Old Full Database backups deleted successfully","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"Full Database backup completed successfully","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"File maintenance task cleanup completed successfully","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"File maintenance job not enabled \ configured","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"sample","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"sample","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"sample","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"sample","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"sample","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"sample","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},{"EventLevel":"Information","EventDescription":"Old Full Database backups deleted successfully","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"Full Database backup completed successfully","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"File maintenance task cleanup completed successfully","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"File maintenance job not enabled \ configured","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"sample","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"sample","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"sample","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"sample","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"sample","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"sample","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},{"EventLevel":"Information","EventDescription":"Old Full Database backups deleted successfully","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"Full Database backup completed successfully","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"File maintenance task cleanup completed successfully","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"File maintenance job not enabled \ configured","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"sample","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"sample","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"sample","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"sample","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"sample","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"Information","EventDescription":"sample","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Database successfully backed up to C:\Program Files (x86)\Aesynt\Red Rock\Application\DBBackups"},
  {"EventLevel":"ERROR","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"ERROR","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"ERROR","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"ERROR","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"ERROR","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"ERROR","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"ERROR","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"ERROR","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"ERROR","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"ERROR","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"ERROR","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"ERROR","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"ERROR","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"},
  {"EventLevel":"Error","EventDescription":"Hardware Error","EventDateTime":"2020-06-15T13:15:55.333","EventDeviceName":"XR2Development","EventDetails":"Unknown"}
];

  currentSortPropertyName: string = this.eventLevelPropertyName;
  sortOrder: SortDirection = SortDirection.descending;
  searchTextFilter: string;
  startDate = new Date();
  endDate = new Date(this.startDate);
  _selectionBounds = ["", ""];
  selectionBounds = [null, null];
  blacklisteddates = [];
  _blacklisteddates = [];
  searchFields = [ this.eventLevelPropertyName,this.eventDescriptionPropertyName,this.eventDateTimePropertyName, this.eventDeviceNamePropertyName];
  
multiLocations: SingleselectRowItem[];


  constructor(
    private exceptionsListService: Xr2ExceptionsService,
    private wpfActionControllerService: WpfActionControllerService,

    ) {
      this.multiLocations = [{"text":"XR2 Mac1", "value":"XR2 Mac1","visible":true},
      {"text":"XR2 Mac2", "value":"XR2 Mac2","visible":true},
    {"text":"XR2 Mac3", "value":"XR2 Mac3","visible":true},
    {"text":"XR2 Mac4", "value":"XR2 Mac4","visible":true}];
     }

  ngOnInit() {
    // this.displayExceptionsList$ = this.exceptionsListService.get().pipe(map(guidedDeviceListItems => {
    //    return this.sort(guidedDeviceListItems.map(p => new Xr2ExceptionsItem(p)), SortDirection.descending);
    // }), shareReplay(1));

    
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
    // this.displayExceptionsList$ = this.displayExceptionsList$.pipe(map(exceptions => {
    //   return this.sort(exceptions, event.SortDirection);
    // }));
  }

  sort(devices: Xr2ExceptionsItem[], sortDirection: Many<boolean|"desc"|"asc">): Xr2ExceptionsItem[]{
      return _.orderBy(devices, x => x[this.currentSortPropertyName], sortDirection);
  }

  ngOnDestroy(): void {
    if (this.searchSub) { this.searchSub.unsubscribe(); }
  }

  navigatedetailspage(exceptions: IXr2EventsItem)
  {
    this.eventDetails = exceptions.EventDetails;
   // this.wpfActionControllerService.ExecuteContinueNavigationAction(`stocking/exceptiondetails`,{TrayID:exceptions.TrayID.toString(),DeviceID: exceptions.DeviceID,CompletedDateTime:exceptions.CompletedDateTime, DeviceName:exceptions.DeviceName, TrayDescription: exceptions.TrayDescription});
  }

  navigatesidepaneldemo()
  {
    this.wpfActionControllerService.ExecuteContinueNavigationAction(`events/sidebarpanellist`);
  }
  navigatequickpickpaneldemo()
  {
    this.wpfActionControllerService.ExecuteContinueNavigationAction(`events/sidebarpanellist`);
  }
  MyPage(){
    this.wpfActionControllerService.ExecuteContinueNavigationAction('setting/xr2eventfullpage');  
  }
}
