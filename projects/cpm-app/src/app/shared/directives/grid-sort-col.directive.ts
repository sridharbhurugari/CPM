import { Directive, QueryList, ContentChildren, Input, Output, EventEmitter, ViewChildren, AfterViewInit } from '@angular/core';
import { ColHeaderSortableComponent } from '../components/col-header-sortable/col-header-sortable.component';
import { Subscription } from 'rxjs';
import { IColHeaderSortChanged } from '../events/i-col-header-sort-changed';
import * as _ from 'lodash';
import { SortDirection } from '../constants/sort-direction';
import { CollectionUtility } from '../utilities/collection-utility';

@Directive({
  selector: '[appGridSortCol]',
})
export class GridSortColDirective {
  private _columnHeaders: QueryList<ColHeaderSortableComponent>;
  private _subscriptions: Subscription[] = [];
  private _currentSortPropertyName: string;
  private _currentSortDirection: 'asc' | 'desc' = SortDirection.ascending;
  private _orderableValues: any[];

  @Input()
  set initialSortPropertyName(value: string) {
    this._currentSortPropertyName = value;
  }

  @Input()
  set initialSortDirection(value: 'asc' | 'desc') {
    this._currentSortDirection = value;
  }

  @Input()
  set orderableValues(values: any[]) {
    if (CollectionUtility.areEquivalent(values, this._orderableValues)){
      return;
    }

    this._orderableValues = values;
    if(this._currentSortPropertyName && this._columnHeaders){
      this.columnSelected({ ColumnPropertyName: this._currentSortPropertyName, SortDirection: this._currentSortDirection })
    }
  }

  @Output()
  valuesReordered: EventEmitter<any[]> = new EventEmitter<any[]>();

  @ContentChildren(ColHeaderSortableComponent)
  set columns(columnHeaders: QueryList<ColHeaderSortableComponent>) {
    if(this._subscriptions.length){
      this._subscriptions.forEach(x => x.unsubscribe());
      this._subscriptions = [];
    }

    columnHeaders.forEach(x => {
      var subscription = x.columnSelected.subscribe(x => this.columnSelected(x));
      this._subscriptions.push(subscription);
    });

    this._columnHeaders = columnHeaders;
    if(this._currentSortPropertyName && this._columnHeaders){
      this.columnSelected({ ColumnPropertyName: this._currentSortPropertyName, SortDirection: this._currentSortDirection })
    }
  }

  constructor() {
  }

  columnSelected(event: IColHeaderSortChanged) {
    if(!this._orderableValues || !this._orderableValues.length){
      return;
    }

    this._currentSortPropertyName = event.ColumnPropertyName;
    this._currentSortDirection = event.SortDirection;
    this._columnHeaders.forEach(x => x.currentSortPropertyName = event.ColumnPropertyName);

    if(typeof this._orderableValues[0][event.ColumnPropertyName] === 'string'){
      this.valuesReordered.emit(_.orderBy(this._orderableValues, x => x[event.ColumnPropertyName].toLowerCase(), event.SortDirection));
    } else {
      this.valuesReordered.emit(_.orderBy(this._orderableValues, x => x[event.ColumnPropertyName], event.SortDirection));
    }
  }
}
