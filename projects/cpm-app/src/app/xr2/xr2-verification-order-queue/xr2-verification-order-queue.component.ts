import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { GridComponent, SearchBoxComponent } from '@omnicell/webcorecomponents';
import { Guid } from 'guid-typescript';
import * as _ from 'lodash';
import { Many } from 'lodash';
import { Observable } from 'rxjs';
import { SortDirection } from '../../shared/constants/sort-direction';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import { nameof } from '../../shared/functions/nameof';
import { Xr2VerificationOrder } from '../model/xr2-verification-order';

@Component({
  selector: 'app-xr2-verification-order-queue',
  templateUrl: './xr2-verification-order-queue.component.html',
  styleUrls: ['./xr2-verification-order-queue.component.scss']
})
export class Xr2VerificationOrderQueueComponent implements OnInit {

  _verficationOrderItems: Xr2VerificationOrder[];

  @Input()
  set searchTextFilter(value: string) {
    if (!this.verificationOrderItems) {
      return;
    }
    this._searchTextFilter = value;
  }
  get searchTextFilter(): string {
    return this._searchTextFilter;
  }

  @Input()
  verificationOrderItems: Xr2VerificationOrder[];

  @Input()
  set verficationOrderItems(value: Xr2VerificationOrder[]) {
    this._verficationOrderItems = value;
    this.resizeGrid();
  }
  get verficationOrderItems(): Xr2VerificationOrder[] {
    return this._verficationOrderItems;
  }

  @ViewChild('ocgrid', { static: false }) ocGrid: GridComponent;

  readonly sequenceOrderPropertyName = nameof<any>('SequenceOrder');
  readonly typePropertyName = nameof<any>('PriorityCodeDescription');
  readonly orderIdPropertyName = nameof<any>('OrderId');
  readonly completePropertyName = nameof<any>('Complete');
  readonly requiredPropertyName = nameof<any>('Required');
  readonly exceptionsPropertyName = nameof<any>('Exceptions');
  readonly datePropertyName = nameof<any>('Date');
  firstTime = true;

  currentSortPropertyName: string;
  sortOrder: SortDirection = SortDirection.ascending;
  _searchTextFilter;
  searchFields = [];

  translatables = [];
  translations$: Observable<any>;


  constructor() { }

  ngOnInit() {
  }

  columnSelected(event: IColHeaderSortChanged): void {
    this.currentSortPropertyName = event.ColumnPropertyName;
    this.sortOrder = event.SortDirection;
    this.verificationOrderItems = this.sort(this.verificationOrderItems, event.SortDirection);
  }

  sort(xr2VerificationOrderItems: Xr2VerificationOrder[], sortDirection: Many<boolean | 'asc' | 'desc'>): Xr2VerificationOrder[] {
    return _.orderBy(xr2VerificationOrderItems, x => x[this.currentSortPropertyName], sortDirection);
  }

  /* istanbul ignore next */
  trackByItemId(index: number, verificationOrderItem: any): Guid {
    if (!verificationOrderItem) {
      return null;
    }

    return verificationOrderItem.Id;
  }

  private resizeGrid() {
    setTimeout(() => {
      if (this.ocGrid) {
        this.ocGrid.checkTableBodyOverflown();
      }
    }, 250);
  }
}
