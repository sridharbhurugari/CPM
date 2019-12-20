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

  currentSortPropertyName: string;

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
  ) {
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

  navigate(orderId: string){
    this.wpfActionControllerService.ExecuteContinueNavigationAction(`picklists/underfilled/picklistLines`, {orderId: orderId});
  }

  columnSelected(event: IColHeaderSortChanged){
    this.currentSortPropertyName = event.ColumnPropertyName;
    this.picklists = _.orderBy(this._picklists, x => x[this.currentSortPropertyName], event.SortDirection)
  }
}
