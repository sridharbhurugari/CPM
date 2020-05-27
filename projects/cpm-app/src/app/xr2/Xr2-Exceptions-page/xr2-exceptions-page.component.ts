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
  currentSortPropertyName: string = this.completedDatePropertyName;
  sortOrder: SortDirection = SortDirection.descending;
  searchTextFilter: string;
  searchFields = [ this.trayIDPropertyName,this.exceptionPocketsPropertyName,this.trayTypePropertyName, this.deviceNamePropertyName];

  constructor(
    private exceptionsListService: Xr2ExceptionsService,
    private wpfActionControllerService: WpfActionControllerService,

    ) { }

  ngOnInit() {
    this.displayExceptionsList$ = this.exceptionsListService.get().pipe(map(guidedDeviceListItems => {
       return this.sort(guidedDeviceListItems.map(p => new Xr2ExceptionsItem(p)), SortDirection.descending);
    }), shareReplay(1));

    
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

  navigatedetailspage()
  {
    this.wpfActionControllerService.ExecuteContinueNavigationAction(`stocking/exceptiondetails`);
  }
}
