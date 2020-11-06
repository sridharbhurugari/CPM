import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { UnderfilledPicklist } from '../model/underfilled-picklist';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { WindowService } from '../../shared/services/window-service';
import { SearchBoxComponent } from '@omnicell/webcorecomponents';
import { nameof } from '../../shared/functions/nameof';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import * as _ from 'lodash';
import { SortDirection } from '../../shared/constants/sort-direction';
import { PickingEventConnectionService } from '../../api-core/services/picking-event-connection.service';
import { IUnfilledPicklistCreatedEvent } from '../../api-core/events/i-unfilled-picklist-created-event';
import { IUnfilledPicklistRemovedEvent } from '../../api-core/events/i-unfilled-picklist-removed-event';

@Component({
  selector: 'app-underfilled-picklists',
  templateUrl: './underfilled-picklists.component.html',
  styleUrls: ['./underfilled-picklists.component.scss']
})
export class UnderfilledPicklistsComponent implements AfterViewInit{
  private _picklists: UnderfilledPicklist[];

  @ViewChild('searchBox', {
    static: true
  })
  searchElement: SearchBoxComponent;

  searchTextFilter: string;

  searchFields = [ 
    nameof<UnderfilledPicklist>('DescriptionSearchValue'),
    nameof<UnderfilledPicklist>('DesintationSearchValue'),
    nameof<UnderfilledPicklist>('DateSearchValue'),
    nameof<UnderfilledPicklist>('PriorityDescription'),
    nameof<UnderfilledPicklist>('OrderId'),
  ];

  sequencePropertyName = nameof<UnderfilledPicklist>('SequenceOrder');
  orderPropertyName = nameof<UnderfilledPicklist>('OrderId');
  typePropertyName =  nameof<UnderfilledPicklist>('PriorityDescription');
  descriptionPropertyName =  nameof<UnderfilledPicklist>('DescriptionSearchValue');
  destinationPropertyName = nameof<UnderfilledPicklist>('DesintationSearchValue');
  datePropertyName = nameof<UnderfilledPicklist>('CompletedDate');

  currentSortPropertyName : string = this.datePropertyName;
  sortOrder: SortDirection = SortDirection.descending;

  @Input()
  set picklists(value: UnderfilledPicklist[]){
    this._picklists = value;
    if(this.windowService.nativeWindow){
      this.windowService.nativeWindow.dispatchEvent(new Event('resize'));
    }
  }
  
  get picklists(): UnderfilledPicklist[]{
    return this._picklists;
  }

  constructor(
    private windowService: WindowService,
    private wpfActionControllerService: WpfActionControllerService,
    private pickingEventConnectionService: PickingEventConnectionService,
  ) {    
      this.configureEventHandlers();    
  }

  ngAfterViewInit(): void {
    this.searchElement.searchOutput$
      .pipe(
        switchMap((searchData: string) => {
          return of(searchData);
        })
      )
      .subscribe(data => {
        this.searchTextFilter = data;
        if (this.windowService.nativeWindow) {
          this.windowService.nativeWindow.dispatchEvent(new Event('resize'));
        }
      });
  }

  private configureEventHandlers(): void {
    if (!this.pickingEventConnectionService) {
      return;
    }

    this.pickingEventConnectionService.newUnfilledPicklistSubject
      .subscribe(message => this.onAddUnfilledPicklist(message));
    this.pickingEventConnectionService.removedUnfilledPicklistSubject
      .subscribe(message => this.onRemoveUnfilledPicklist(message));
  }

  private onAddUnfilledPicklist(unfilledPicklistCreatedEvent: IUnfilledPicklistCreatedEvent): void {
    try {
      const newUnfilledPicklist = unfilledPicklistCreatedEvent.NewUnfilledPicklist;
      
      this.picklists.push(newUnfilledPicklist);
      this.windowService.nativeWindow.dispatchEvent(new Event('resize'));
      return;
            
    } catch (e) {
      console.log('PicklistsQueueComponent.onAddOrUpdatePicklistQueueItem ERROR');
      console.log(e);
    }
  }

  private onRemoveUnfilledPicklist(unfilledPicklistRemovedEvent: IUnfilledPicklistRemovedEvent): void {
    try {
      const orderId = unfilledPicklistRemovedEvent.RemovedUnfilledPicklistId;
      _.remove(this.picklists, (x) => {
        return x.OrderId === orderId;
      });
      this.windowService.nativeWindow.dispatchEvent(new Event('resize'));
    } catch (e) {
      console.log('UnderfilledPicklistsComponent.onRemoveUnfilledPicklist ERROR');
      console.log(e);
    }
  }

  navigate(orderId: string){
    this.wpfActionControllerService.ExecuteContinueNavigationAction(`core/picklists/underfilled/picklistLines`, {orderId: orderId});
  }

  columnSelected(event: IColHeaderSortChanged){
    this.currentSortPropertyName = event.ColumnPropertyName;
    this.picklists = _.orderBy(this._picklists, x => x[this.currentSortPropertyName], event.SortDirection)
  }
}
